// Modèle de données de l'API Joconde pour une œuvre.
export interface JocondeOeuvre {
  reference: string
  titre: string | null
  auteur: string | null
  denomination: string | null
  description: string | null
  commentaires: string | null
  periode_de_creation: string | null
  domaine: string[]
  materiaux_techniques: string[]
  mesures: string | null
  localisation: string | null
  ville: string | null
  nom_officiel_musee: string | null
  numero_inventaire: string | null
  statut_juridique: string | null
  presence_image: string | null
  date_de_mise_a_jour: string | null
  decouverte_collecte: string | null
  bibliographie: string | null
  ecole_pays: string | null
  epoque: string | null
  coordonnees: { lon: number; lat: number } | null
  image_url?: string
}

export interface OeuvreAvecExplication extends JocondeOeuvre {
  // Champ local pour stocker une explication utilisateur.
  explication?: string
}
