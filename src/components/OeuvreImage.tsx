'use client'

import { JocondeOeuvre } from '@/lib/types'
import { getImageUrl } from '@/lib/joconde'

export function OeuvreImage({ oeuvre }: { oeuvre: JocondeOeuvre }) {
  return (
    <>
      <div className="detail-img-wrap">
        <div className="detail-img-placeholder">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <rect x="3" y="3" width="18" height="18" rx="1"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
          </svg>
          <span>Image non disponible</span>
        </div>
      </div>
      <a
        href={getImageUrl(oeuvre.reference)}
        target="_blank"
        rel="noreferrer"
        className="detail-image-link"
      >
        Voir sur POP →
      </a>
    </>
  )
}
