import sharp from 'sharp'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = join(root, 'public')

const jobs = [
  { input: 'mockups.png', output: 'mockups.webp', width: 900, quality: 82 },
  { input: 'mockup.png', output: 'mockup.webp', width: 480, quality: 82 },
  { input: 'dark.png', output: 'dark.webp', width: 520, quality: 82 },
  { input: 'light.png', output: 'light.webp', width: 520, quality: 82 },
]

for (const { input, output, width, quality } of jobs) {
  const inPath = join(publicDir, input)
  const outPath = join(publicDir, output)
  await sharp(inPath)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, effort: 6 })
    .toFile(outPath)
  console.log('wrote', output)
}
