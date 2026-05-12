function stripEnv(v: string | undefined): string {
  return (v ?? '').replace(/^["']|["']$/g, '').trim()
}

function envFlagTrue(v: string | undefined): boolean {
  const s = stripEnv(v).toLowerCase()
  return s === '1' || s === 'true' || s === 'yes' || s === 'on'
}

/** When true, the Next.js site skips Sanity fetches and uses local fallbacks (stubs). Studio CLI still uses env as usual. */
export const isSanityContentDisabled =
  envFlagTrue(process.env.NEXT_PUBLIC_SANITY_DISABLE) || envFlagTrue(process.env.SANITY_DISABLE)

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

export const isSanityConfigured =
  !isSanityContentDisabled && projectId.length > 0 && dataset.length > 0

export const sanityReadToken = process.env.SANITY_API_READ_TOKEN
export const sanityWriteToken = process.env.SANITY_API_WRITE_TOKEN
