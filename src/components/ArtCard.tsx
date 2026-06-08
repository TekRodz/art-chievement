'use client'

import Link from 'next/link'
import { JocondeOeuvre } from '@/lib/types'

// Carte d'œuvre affichée dans la galerie du musée.
// Chaque carte redirige vers la page de détail de l'œuvre.
export function ArtCard({ oeuvre }: { oeuvre: JocondeOeuvre }) {
  const titre = oeuvre.titre || oeuvre.denomination || 'Sans titre'
  const auteur = oeuvre.auteur || 'Auteur inconnu'
  const domaine = oeuvre.domaine?.[0] || ''
  const periode = oeuvre.periode_de_creation?.split(';')[0] || oeuvre.epoque || ''

  return (
    <Link href={`/oeuvre/${oeuvre.reference}`} className="art-card">
      <div className="art-card-body">
        {domaine && <div className="art-card-domain">{domaine}</div>}
        <div className="art-card-title">{titre}</div>
        <div className="art-card-meta">{auteur}{periode ? ` · ${periode}` : ''}</div>
      </div>
    </Link>
  )
}
