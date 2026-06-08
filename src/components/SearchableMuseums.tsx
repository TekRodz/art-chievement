'use client'

import Link from 'next/link'

// Liste de musées affichée sur la page d'accueil.
interface MuseumWithCategory {
  name: string
  category: string
}

export function SearchableMuseums({ museums }: { museums: MuseumWithCategory[] }) {
  return (
    <>
      <div className="museums-grid">
        {museums.map((museum) => (
          <Link
            key={museum.name}
            href={`/musee/${encodeURIComponent(museum.name)}`}
            className="museum-card"
          >
            <div className="museum-card-body">
              <div className="museum-card-title">{museum.name}</div>
              <div className="museum-card-link">Voir les œuvres →</div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
