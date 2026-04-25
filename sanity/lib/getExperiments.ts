import { cache } from "react";
import { unstable_cache } from "next/cache";

import type { Image } from "sanity";

import { dataset, isSanityConfigured, projectId } from "../env";
import { client } from "./client";
import {
  experimentsFallbackQuery,
  homepageExperimentsOrderQuery,
} from "./queries";
import { sanityImageUrl } from "./imagePublic";

const REVALIDATE_SEC = (() => {
  const raw = process.env.SANITY_FETCH_REVALIDATE_SECONDS;
  const n = raw != null && raw !== "" ? Number.parseInt(raw, 10) : Number.NaN;
  return Number.isFinite(n) && n >= 0 ? n : 300;
})();

export type ExperimentFromSanity = {
  _id: string;
  title?: { ru?: string; en?: string } | null;
  image?: Image;
  href: string;
};

export type ExperimentForUi = {
  id: string;
  href: string;
  imageUrl: string | null;
  titleRu: string | null;
  titleEn: string | null;
};

const IMAGE_WIDTH = 900;

async function fetchExperiments(): Promise<ExperimentFromSanity[]> {
  const hp = await client.fetch<{ ordered: ExperimentFromSanity[] } | null>(
    homepageExperimentsOrderQuery,
  );
  const ordered = hp?.ordered;
  if (Array.isArray(ordered) && ordered.length > 0) {
    return ordered.filter((row): row is ExperimentFromSanity => Boolean(row?._id));
  }

  const rows = await client.fetch<ExperimentFromSanity[]>(experimentsFallbackQuery);
  return Array.isArray(rows) ? rows : [];
}

const getCachedExperiments = unstable_cache(
  fetchExperiments,
  ["sanity-experiments", projectId, dataset],
  {
    revalidate: REVALIDATE_SEC,
    tags: ["sanity:experiments", "sanity:portfolio-home"],
  },
);

function mapExperiment(row: ExperimentFromSanity): ExperimentForUi {
  return {
    id: row._id,
    href: row.href?.trim() || "#",
    imageUrl: sanityImageUrl(row.image, IMAGE_WIDTH, { format: "webp", quality: 85 }),
    titleRu: row.title?.ru?.trim() || null,
    titleEn: row.title?.en?.trim() || null,
  };
}

async function getExperimentsImpl(): Promise<ExperimentForUi[]> {
  if (!isSanityConfigured) {
    return [];
  }

  try {
    const rows = await getCachedExperiments();
    return rows.map((row) => mapExperiment(row)).filter((item) => item.imageUrl);
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error("[getExperiments] Sanity fetch failed:", err);
    }
    return [];
  }
}

export const getExperiments = cache(getExperimentsImpl);
