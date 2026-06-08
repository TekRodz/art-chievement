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
      <div className="art-card-img">
        <div className="art-card-img-placeholder">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <rect x="3" y="3" width="18" height="18" rx="1"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
          </svg>
          <span>{domaine}</span>
        </div>
      </div>
      <div className="art-card-body">
        {domaine && <div className="art-card-domain">{domaine}</div>}
        <div className="art-card-title">{titre}</div>
        <div className="art-card-meta">{auteur}{periode ? ` · ${periode}` : ''}</div>
      </div>
    </Link>
  )
}
