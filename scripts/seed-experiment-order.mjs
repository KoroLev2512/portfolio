// One-off: give every experiment an orderRank that matches the order the site
// shows today (Homepage → "Experiments order" first, then the rest newest
// first), so switching to drag-and-drop sorting does not reshuffle anything.
//
//   node scripts/seed-experiment-order.mjs          # dry run, prints the plan
//   node scripts/seed-experiment-order.mjs --write  # patches the dataset
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { createClient } from '@sanity/client'
import { config as loadEnv } from 'dotenv'
import { LexoRank } from 'lexorank'

const root = process.cwd()
for (const [file, override] of [['.env', false], ['.env.local', true]]) {
  const path = resolve(root, file)
  if (existsSync(path)) loadEnv({ path, override, quiet: true })
}

const strip = (v) => (v ?? '').replace(/^["']|["']$/g, '').trim()
const projectId = strip(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) || strip(process.env.SANITY_PROJECT_ID)
const dataset = strip(process.env.NEXT_PUBLIC_SANITY_DATASET) || strip(process.env.SANITY_DATASET)
if (!projectId || !dataset) throw new Error('Sanity projectId/dataset are not set')

const token = strip(process.env.SANITY_API_WRITE_TOKEN)
const write = process.argv.includes('--write')
if (write && !token) throw new Error('SANITY_API_WRITE_TOKEN is required for --write')

// Published content is public, so the dry run reads without a token. Sending
// a token from another project fails with SIO-401-AWH even for reads.
const client = createClient({
  projectId,
  dataset,
  ...(write && { token }),
  apiVersion: '2026-03-19',
  useCdn: false,
})

const { ordered, all } = await client.fetch(`{
  "ordered": *[_type == "homepage"] | order(_updatedAt desc)[0].homepageExperiments[]._ref,
  "all": *[_type == "experiment" && !(_id in path("drafts.**"))] | order(_createdAt desc){ _id, orderRank, "title": coalesce(title.en, title.ru, _id) }
}`)

const byId = new Map(all.map((doc) => [doc._id, doc]))
const listed = (ordered ?? []).filter((id) => byId.has(id))
const rest = all.map((doc) => doc._id).filter((id) => !listed.includes(id))
const sequence = [...listed, ...rest]

const plan = []
for (let i = 0, rank = LexoRank.min(); i < sequence.length; i++) {
  rank = rank.genNext().genNext()
  const doc = byId.get(sequence[i])
  plan.push({ id: doc._id, title: doc.title, current: doc.orderRank ?? null, next: rank.toString() })
}

console.log(`${dataset}: ${listed.length} from Homepage order, ${rest.length} more by creation date\n`)
for (const [i, row] of plan.entries()) {
  console.log(`${String(i + 1).padStart(2)}. ${row.title.padEnd(16)} ${row.current ?? '—'} → ${row.next}`)
}

if (!write) {
  console.log('\nDry run. Re-run with --write to apply.')
} else {
  const tx = client.transaction()
  for (const row of plan) tx.patch(row.id, (p) => p.set({ orderRank: row.next }))
  await tx.commit()
  console.log(`\nPatched ${plan.length} experiments.`)
}
