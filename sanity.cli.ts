import './sanity/bootstrapEnv'
import { defineCliConfig } from 'sanity/cli'
import { mergeConfig } from 'vite'

function stripEnv(v: string | undefined): string {
  return (v ?? '').replace(/^["']|["']$/g, '').trim()
}

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
