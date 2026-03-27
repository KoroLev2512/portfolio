function stripEnv(v: string | undefined): string {
  return (v ?? '').replace(/^["']|["']$/g, '').trim()
}

export const apiVersion =
  process.env.SANITY_STUDIO_API_VERSION ??
  process.env.SANITY_API_VERSION ??
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ??
  '2026-03-19'

export const projectId = stripEnv(
  process.env.SANITY_STUDIO_PROJECT_ID ??
    process.env.SANITY_PROJECT_ID ??
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
)

export const dataset = stripEnv(
  process.env.SANITY_STUDIO_DATASET ??
    process.env.SANITY_DATASET ??
    process.env.NEXT_PUBLIC_SANITY_DATASET,
)

export const isSanityConfigured = projectId.length > 0 && dataset.length > 0

export const sanityReadToken = process.env.SANITY_API_READ_TOKEN
export const sanityWriteToken = process.env.SANITY_API_WRITE_TOKEN
