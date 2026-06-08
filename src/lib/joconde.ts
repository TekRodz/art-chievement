import { JocondeOeuvre } from './types'
 
// URL de l'API Joconde utilisée pour interroger les œuvres publiques.
const BASE_URL = 'https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/base-joconde-extrait/records'
 
// Récupère une page d'œuvres depuis l'API en fonction des filtres fournis.
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

export async function fetchMuseesFromVille(ville = 'Paris', limit = 1000): Promise<string[]> {
  // Récupère les musées d'une ville et retourne une liste de noms.
  const url = new URL(BASE_URL)
  url.searchParams.set('where', `ville like "%${ville}%"`)
  url.searchParams.set('group_by', 'nom_officiel_musee')
  url.searchParams.set('order_by', 'nom_officiel_musee')
  url.searchParams.set('limit', String(limit))

  const res = await fetch(url.toString(), { next: { revalidate: 3600 } })
  if (!res.ok) return []

  const data = await res.json()
  const museums = new Set<string>()
  ;(data.results ?? []).forEach((r: any) => {
    const name = r.nom_officiel_musee || r.nom_musee || r.musee || null
    if (name) museums.add(name)
  })

  return Array.from(museums).sort()
}

 
export async function fetchOeuvre(reference: string): Promise<JocondeOeuvre | null> {
  // Récupère une œuvre unique à partir de sa référence.
  const url = new URL(BASE_URL)
  url.searchParams.set('where', `reference="${reference}"`)
  url.searchParams.set('limit', '1')
 
  const res = await fetch(url.toString(), { next: { revalidate: 3600 } })
  if (!res.ok) return null
 
  const data = await res.json()
  return data.results?.[0] ?? null
}
 
export function getImageUrl(reference: string): string {
  // Génère l'URL de la fiche Joconde pour une référence.
  return `https://www.pop.culture.gouv.fr/notice/joconde/${reference}`
}
 
// Liste des domaines disponible pour le filtrage.
export const DOMAINES = [
  'peinture',
  'sculpture',
  'dessin',
  'estampe',
  'archéologie',
  'arts décoratifs',
  'photographie',
]

export const MUSEES = [
  { slug: 'louvre', label: 'Louvre', query: 'Louvre' },
  { slug: 'orsay', label: "Musée d'Orsay", query: "Musée d'Orsay" },
  { slug: 'pompidou', label: 'Centre Pompidou', query: 'Centre Pompidou' },
]
