'use client'

import Link from 'next/link'
import { useState } from 'react'
import { DOMAINES } from '@/lib/joconde'

interface MuseumWithCategory {
  name: string
  category: string
}

export function SearchableMuseums({ museums }: { museums: MuseumWithCategory[] }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('TOUS')

  const categories = ['TOUS', ...DOMAINES.map(d => d.toUpperCase())]

  let filtered = museums

  if (selectedFilter !== 'TOUS') {
    filtered = filtered.filter(m => m.category.toUpperCase() === selectedFilter)
  }

  if (searchTerm) {
    filtered = filtered.filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }

  return (
    <>
      <div className="toolbar">
        <div className="search-wrap">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor">
            <circle cx="6" cy="6" r="5" />
            <path d="M11 11L15 15" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Rechercher un musée..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filters">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-pill ${selectedFilter === category ? 'active' : ''}`}
              onClick={() => setSelectedFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="state-empty"><p>Aucun musée trouvé.</p></div>
      ) : (
        <div className="museums-grid">
          {filtered.map((museum) => (
            <Link
              key={museum.name}
              href={`/musee/${encodeURIComponent(museum.name)}`}
              className="museum-card"
            >
              <div className="museum-card-category">{museum.category.toUpperCase()}</div>
              <div className="museum-card-body">
                <div className="museum-card-title">{museum.name}</div>
                <div className="museum-card-link">Voir les œuvres →</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
