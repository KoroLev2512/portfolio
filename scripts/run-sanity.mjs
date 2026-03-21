#!/usr/bin/env node
/**
 * Загружает .env / .env.local и зеркалит NEXT_PUBLIC_* → SANITY_STUDIO_*,
 * затем запускает CLI `sanity` с теми же аргументами.
 * Нужен для `sanity dev`: иначе Vite не видит SANITY_STUDIO_* до сборки студии.
 */
import { spawn } from 'node:child_process'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { config as loadEnv } from 'dotenv'

const root = process.cwd()
const envFile = resolve(root, '.env')
const localFile = resolve(root, '.env.local')
if (existsSync(envFile)) loadEnv({ path: envFile })
if (existsSync(localFile)) loadEnv({ path: localFile, override: true })

const strip = (v) => (v ?? '').replace(/^["']|["']$/g, '').trim()
const pubId = strip(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
const pubDs = strip(process.env.NEXT_PUBLIC_SANITY_DATASET)

if (!strip(process.env.SANITY_STUDIO_PROJECT_ID) && pubId) {
  process.env.SANITY_STUDIO_PROJECT_ID = pubId
}
if (!strip(process.env.SANITY_STUDIO_DATASET) && pubDs) {
  process.env.SANITY_STUDIO_DATASET = pubDs
}
if (!strip(process.env.SANITY_PROJECT_ID) && pubId) {
  process.env.SANITY_PROJECT_ID = pubId
}
if (!strip(process.env.SANITY_DATASET) && pubDs) {
  process.env.SANITY_DATASET = pubDs
}

const args = process.argv.slice(2)
const child = spawn('npx', ['sanity', ...args], {
  stdio: 'inherit',
  shell: true,
  env: process.env,
  cwd: root,
})

child.on('exit', (code, signal) => {
  if (signal) process.exit(1)
  process.exit(code ?? 0)
})
