/**
 * Подгружает `.env` и `.env.local` до старта Vite в `sanity dev` / `sanity deploy`.
 * В бандл студии попадают только `SANITY_STUDIO_*`, поэтому дублируем сюда `NEXT_PUBLIC_*`.
 */
import { config as loadEnv } from 'dotenv'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'

function bootstrapSanityCliEnv(): void {
  const root = process.cwd()
  const envFile = resolve(root, '.env')
  const localFile = resolve(root, '.env.local')
  if (existsSync(envFile)) loadEnv({ path: envFile })
  if (existsSync(localFile)) loadEnv({ path: localFile, override: true })

  const pubId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.replace(/^["']|["']$/g, '').trim()
  const pubDs = process.env.NEXT_PUBLIC_SANITY_DATASET?.replace(/^["']|["']$/g, '').trim()

  if (!process.env.SANITY_STUDIO_PROJECT_ID?.trim() && pubId) {
    process.env.SANITY_STUDIO_PROJECT_ID = pubId
  }
  if (!process.env.SANITY_STUDIO_DATASET?.trim() && pubDs) {
    process.env.SANITY_STUDIO_DATASET = pubDs
  }
  if (!process.env.SANITY_PROJECT_ID?.trim() && pubId) {
    process.env.SANITY_PROJECT_ID = pubId
  }
  if (!process.env.SANITY_DATASET?.trim() && pubDs) {
    process.env.SANITY_DATASET = pubDs
  }
}

bootstrapSanityCliEnv()
