import Link from 'next/link'
import { fetchOeuvres, DOMAINES } from '@/lib/joconde'
import { JocondeOeuvre } from '@/lib/types'

const LIMIT = 24

function ArtCard({ oeuvre }: { oeuvre: JocondeOeuvre }) {
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

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ domaine?: string; q?: string; page?: string }>
}) {
  const { domaine, q, page } = await searchParams
  const currentPage = Number.isInteger(Number(page)) && Number(page) > 0
    ? Number(page)
    : 1
  const offset = (currentPage - 1) * LIMIT

  const buildPageQuery = (pageNumber: number) => {
    const params = new URLSearchParams()
    if (domaine) params.set('domaine', domaine)
    if (q) params.set('q', q)
    params.set('page', String(pageNumber))
    return params.toString()
  }

  let oeuvres: JocondeOeuvre[] = []
  let total = 0
  let error = false

  try {
    const data = await fetchOeuvres({
      domaine,
      search: q,
      limit: LIMIT,
      offset,
    })
    oeuvres = data.results
    total = data.total
  } catch {
    error = true
  }

  const totalPages = Math.ceil(total / LIMIT)
  const activeFilter = domaine ?? 'tout'
  const prevPage = Math.max(currentPage - 1, 1)
  const nextPage = Math.min(currentPage + 1, totalPages || currentPage + 1)

  return (
    <main>
      <div className="container">
        <div className="hero">
          <h1 className="hero-title">
            Les collections<br />du <em>Louvre</em>
          </h1>
          <p className="hero-sub">
            Explorez les œuvres du musée du Louvre issues de la base Joconde,
            enrichies d'explications humaines.
          </p>
        </div>

        <div className="toolbar">
          <form method="get">
              {domaine && (
                <input type="hidden" name="domaine" value={domaine} />
              )}
              <div className="search-wrap">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                <input
                  name="q"
                  defaultValue={q}
                autoComplete="off"
              />
            </div>
          </form>

          <div className="filters">
            <a href="/" className={`filter-pill ${activeFilter === 'tout' ? 'active' : ''}`}>
              Tout
            </a>
            {DOMAINES.map((d) => (
              <a
                key={d}
                href={`/?domaine=${encodeURIComponent(d)}`}
                className={`filter-pill ${activeFilter === d ? 'active' : ''}`}
              >
                {d}
              </a>
            ))}
          </div>
        </div>
      </div>

      {error ? (
        <div className="container">
          <div className="state-empty">
            <p>Impossible de contacter l'API Joconde. Réessaie dans quelques instants.</p>
          </div>
        </div>
      ) : (
        <>
          <div className="gallery">
            {oeuvres.length === 0 ? (
              <div className="state-empty">
                <p>Aucune œuvre trouvée pour cette recherche.</p>
              </div>
            ) : (
              oeuvres.map((o) => <ArtCard key={o.reference} oeuvre={o} />)
            )}
          </div>

          {totalPages > 1 && (
            <div className="container">
              <div className="pagination">
                {currentPage > 1 ? (
                  <Link
                    href={`/?${buildPageQuery(prevPage)}`}
                    className="btn-page"
                  >
                    ← Précédent
                  </Link>
                ) : (
                  <span className="btn-page disabled" aria-disabled="true">
                    ← Précédent
                  </span>
                )}

                <span className="pagination-info">
                  Page {currentPage} sur {totalPages} · {total.toLocaleString('fr')} œuvres
                </span>

                {currentPage < totalPages ? (
                  <Link
                    href={`/?${buildPageQuery(nextPage)}`}
                    className="btn-page"
                  >
                    Suivant →
                  </Link>
                ) : (
                  <span className="btn-page disabled" aria-disabled="true">
                    Suivant →
                  </span>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </main>
  )
}
