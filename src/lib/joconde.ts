import { JocondeOeuvre } from './types'
 
const BASE_URL = 'https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/base-joconde-extrait/records'
 
export async function fetchOeuvres(params: {
  musee?: string
  domaine?: string
  limit?: number
  offset?: number
  search?: string
} = {}): Promise<{ results: JocondeOeuvre[]; total: number }> {
  const {
    musee = 'Louvre',
    domaine,
    limit = 24,
    offset = 0,
    search,
  } = params
 
  const where: string[] = [`nom_officiel_musee like "%${musee}%"`]
  if (domaine) where.push(`domaine like "%${domaine}%"`)
  if (search) where.push(`(titre like "%${search}%" or auteur like "%${search}%" or denomination like "%${search}%")`)
 
  const url = new URL(BASE_URL)
  url.searchParams.set('where', where.join(' AND '))
  url.searchParams.set('limit', String(limit))
  url.searchParams.set('offset', String(offset))
  url.searchParams.set('order_by', 'date_de_mise_a_jour DESC')
 
  const res = await fetch(url.toString(), { next: { revalidate: 3600 } })
  if (!res.ok) throw new Error(`Joconde API error: ${res.status}`)
 
  const data = await res.json()
  return {
    results: data.results ?? [],
    total: data.total_count ?? 0,
  }
}
 
export async function fetchOeuvre(reference: string): Promise<JocondeOeuvre | null> {
  const url = new URL(BASE_URL)
  url.searchParams.set('where', `reference="${reference}"`)
  url.searchParams.set('limit', '1')
 
  const res = await fetch(url.toString(), { next: { revalidate: 3600 } })
  if (!res.ok) return null
 
  const data = await res.json()
  return data.results?.[0] ?? null
}
 
export function getImageUrl(reference: string): string {
  return `https://www.pop.culture.gouv.fr/notice/joconde/${reference}`
}
 
export const DOMAINES = [
  'peinture',
  'sculpture',
  'dessin',
  'estampe',
  'archéologie',
  'arts décoratifs',
  'photographie',
]