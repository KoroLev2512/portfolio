/**
 * Next.js: NEXT_PUBLIC_* · Sanity CLI: SANITY_STUDIO_* · общие: SANITY_*
 * @see https://www.sanity.io/docs/environment-variables
 */
export const apiVersion =
  process.env.SANITY_STUDIO_API_VERSION ??
  process.env.SANITY_API_VERSION ??
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ??
  '2026-03-19'

export const dataset = assertValue(
  process.env.SANITY_STUDIO_DATASET ??
    process.env.SANITY_DATASET ??
    process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing dataset: SANITY_DATASET or NEXT_PUBLIC_SANITY_DATASET (+ SANITY_STUDIO_* for sanity dev)',
)

export const projectId = assertValue(
  process.env.SANITY_STUDIO_PROJECT_ID ??
    process.env.SANITY_PROJECT_ID ??
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing project id: SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_PROJECT_ID (+ SANITY_STUDIO_* for sanity dev)',
)

export const sanityReadToken = process.env.SANITY_API_READ_TOKEN
export const sanityWriteToken = process.env.SANITY_API_WRITE_TOKEN

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined || v === '') {
    throw new Error(errorMessage)
  }
  return v
}
