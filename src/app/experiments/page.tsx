import { getExperiments } from '@/sanity/lib/getExperiments'
import ExperimentsPageClient from './ExperimentsPageClient'

export default async function ExperimentsPage() {
  const experiments = await getExperiments()
  return <ExperimentsPageClient experiments={experiments} />
}
