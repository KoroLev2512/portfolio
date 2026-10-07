/**
 * Decide what a failed Sanity request means for the caller.
 *
 * In development the page falls back to placeholder content, which is the
 * friendlier behaviour while working offline. A production build must not do
 * that: the static export would bake pages without CMS content and the deploy
 * script would publish them. So outside development this throws and fails the
 * build instead.
 *
 * Callers must not catch inside an `unstable_cache` callback: an empty result
 * returned from there is cached on disk and survives the next build.
 */
export function handleSanityFetchError(scope: string, err: unknown): void {
  if (process.env.NODE_ENV !== 'development') {
    throw new Error(
      `[${scope}] Sanity request failed, refusing to build pages without CMS content. ` +
        'Check the network or VPN and rebuild.',
      { cause: err },
    )
  }
  console.error(`[${scope}] Sanity fetch failed, using placeholder content:`, err)
}
