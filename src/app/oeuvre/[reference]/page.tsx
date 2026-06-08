import { fetchOeuvre, getImageUrl } from '@/lib/joconde'
import { Breadcrumb } from '@/components/Breadcrumb'
import { notFound } from 'next/navigation'

// Petite ligne de métadonnée pour la page de détail d'œuvre.
function MetaRow({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null
  return (
    <div className="meta-row">
      <div className="meta-key">{label}</div>
      <div className="meta-val">{value}</div>
    </div>
  )
}

export default async function OeuvrePage({ params }: { params: Promise<{ reference: string }> }) {
  const { reference } = await params
  const oeuvre = await fetchOeuvre(reference)
  if (!oeuvre) notFound()

  // Récupération de l'œuvre et préparation des champs pour l'affichage.

  const titre = oeuvre.titre || oeuvre.denomination || 'Sans titre'
  const auteur = oeuvre.auteur || 'Auteur inconnu'
  const domaine = oeuvre.domaine?.join(', ') || ''
  const periode = oeuvre.periode_de_creation?.split(';').join(' – ') || ''
  const materiaux = oeuvre.materiaux_techniques?.join(', ') || ''
  const museumLabel = oeuvre.nom_officiel_musee || ''

  return (
    <main>
      <div className="container">
        <Breadcrumb items={[
          { label: 'Accueil', href: '/' },
          museumLabel ? { label: museumLabel, href: `/musee/${encodeURIComponent(museumLabel)}` } : { label: 'Œuvres' },
          { label: titre },
        ]} />

        <a href={museumLabel ? `/musee/${encodeURIComponent(museumLabel)}` : '/'} className="detail-back">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Retour à la galerie
        </a>

        <div className="detail-layout">
          <aside className="detail-sidebar">
            <div className="detail-pop-link-wrap">
              <a
                href={getImageUrl(oeuvre.reference)}
                target="_blank"
                rel="noreferrer"
                className="detail-pop-link"
              >
                Voir sur POP
              </a>
            </div>

            <div className="sidebar-section">
              <div className="sidebar-label">Référence</div>
              <div className="sidebar-value">{oeuvre.reference}</div>
            </div>

            <div className="sidebar-section">
              <div className="sidebar-label">Numéro d'inventaire</div>
              <div className="sidebar-value">{oeuvre.numero_inventaire || '—'}</div>
            </div>

            <div className="sidebar-section">
              <div className="sidebar-label">Localisation</div>
              <div className="sidebar-value">{oeuvre.localisation || oeuvre.ville || '—'}</div>
            </div>

            <div className="sidebar-section">
              <div className="sidebar-label">Musée</div>
              <div className="sidebar-value">{oeuvre.nom_officiel_musee || '—'}</div>
            </div>

            <div className="sidebar-divider" />

            <div className="sidebar-section">
              <div className="sidebar-label">Dimensions</div>
              <div className="sidebar-value">{oeuvre.mesures || '—'}</div>
            </div>

            <div className="sidebar-section">
              <div className="sidebar-label">Statut juridique</div>
              <div className="sidebar-value">{oeuvre.statut_juridique || '—'}</div>
            </div>
          </aside>

          <section className="detail-main">
            {domaine && <div className="detail-domain">{domaine}</div>}
            <h1 className="oeuvre-title">{titre}</h1>
            <p className="oeuvre-auteur">
              {auteur}
            </p>

            {materiaux && oeuvre.materiaux_techniques.length > 0 && (
              <div className="tags">
                {oeuvre.materiaux_techniques.map((m) => (
                  <span key={m} className="tag">{m}</span>
                ))}
              </div>
            )}

            {periode && (
              <div className="periode-badge">
                <span>{periode}</span>
              </div>
            )}

            <div className="divider" />

            <div className="section-label">Description</div>
            {oeuvre.commentaires ? (
              <p className="description-text">{oeuvre.commentaires}</p>
            ) : (
              <p className="description-text description-empty">
                Aucune description disponible depuis l'API.
              </p>
            )}

            <div className="divider" />

            <div className="section-label">Métadonnées complémentaires</div>
            <div className="meta-grid">
              {oeuvre.bibliographie ? (
                <div className="meta-item">
                  <div className="meta-key">Bibliographie</div>
                  <div className="meta-val">{oeuvre.bibliographie}</div>
                </div>
              ) : null}

              <div className="meta-item">
                <div className="meta-key">Découverte / collecte</div>
                <div className="meta-val">{oeuvre.decouverte_collecte || '—'}</div>
              </div>

              <div className="meta-item">
                <div className="meta-key">École / pays</div>
                <div className="meta-val">{oeuvre.ecole_pays || '—'}</div>
              </div>

              <div className="meta-item">
                <div className="meta-key">Technique</div>
                <div className="meta-val">{materiaux || '—'}</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
