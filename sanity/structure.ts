import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.documentTypeListItem("siteSettings"),
      S.documentTypeListItem("homepage"),
      S.documentTypeListItem("project"),
      S.documentTypeListItem("experiment"),
    ]);
