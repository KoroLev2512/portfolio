/**
 * This configuration file lets you run `$ sanity [command]` in this folder
 * Go to https://www.sanity.io/docs/cli to learn more.
 **/
import './sanity/bootstrapEnv'
import { defineCliConfig } from 'sanity/cli'
import { mergeConfig } from 'vite'

function stripEnv(v: string | undefined): string {
  return (v ?? '').replace(/^["']|["']$/g, '').trim()
}

/** Те же приоритеты, что в `sanity/env.ts` — для CLI и для Vite `define` студии */
function resolveStudioProjectId(): string {
  return (
    stripEnv(process.env.SANITY_STUDIO_PROJECT_ID) ||
    stripEnv(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) ||
    stripEnv(process.env.SANITY_PROJECT_ID) ||
    ''
  )
}

function resolveStudioDataset(): string {
  return (
    stripEnv(process.env.SANITY_STUDIO_DATASET) ||
    stripEnv(process.env.NEXT_PUBLIC_SANITY_DATASET) ||
    stripEnv(process.env.SANITY_DATASET) ||
    ''
  )
}

function resolveStudioApiVersion(): string {
  return (
    stripEnv(process.env.SANITY_STUDIO_API_VERSION) ||
    stripEnv(process.env.NEXT_PUBLIC_SANITY_API_VERSION) ||
    stripEnv(process.env.SANITY_API_VERSION) ||
    '2026-03-19'
  )
}

const projectId = resolveStudioProjectId()
const dataset = resolveStudioDataset()

/**
 * Без этого Vite вшивает только те `SANITY_STUDIO_*`, что уже есть в `process.env`.
 * Если в `.env.local` только `NEXT_PUBLIC_*`, подстановка в бандл студии могла остаться пустой.
 * Здесь явно переопределяем `define` после bootstrap/run-sanity.
 */
export default defineCliConfig({
  api: { projectId, dataset },
  vite: async (config) => {
    const pid = resolveStudioProjectId()
    const ds = resolveStudioDataset()
    const apiVer = resolveStudioApiVersion()
    return mergeConfig(config, {
      define: {
        'process.env.SANITY_STUDIO_PROJECT_ID': JSON.stringify(pid),
        'process.env.SANITY_STUDIO_DATASET': JSON.stringify(ds),
        'process.env.SANITY_STUDIO_API_VERSION': JSON.stringify(apiVer),
      },
    })
  },
})
