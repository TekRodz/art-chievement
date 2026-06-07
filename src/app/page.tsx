import Link from 'next/link'
import { fetchMuseesFromVille, MUSEES } from '@/lib/joconde'

export default async function HomePage() {
  let musees = await fetchMuseesFromVille('Paris')
  if (!musees || musees.length === 0) {
    // fallback to curated list when dynamic fetch fails or returns empty
    musees = MUSEES.map(m => m.label)
  }

  return (
    <main>
      <div className="container">
        <div className="hero">
          <h1 className="hero-title">Musées de Paris</h1>
          <p className="hero-sub">Sélectionnez un musée pour explorer ses œuvres (Paris uniquement pour le moment).</p>
        </div>

        <div className="museums-grid">
          {musees.length === 0 ? (
            <div className="state-empty"><p>Aucun musée trouvé.</p></div>
          ) : (
            musees.map((name) => (
              <Link key={name} href={`/musee/${encodeURIComponent(name)}`} className="museum-card">
                <div className="museum-card-body">
                  <div className="museum-card-title">{name}</div>
                  <div className="museum-card-sub">Voir les œuvres</div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </main>
  )
}
