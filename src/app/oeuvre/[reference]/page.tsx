import { fetchOeuvre } from '@/lib/joconde'
import { ExplicationEditor } from '@/components/ExplicationEditor'
import { notFound } from 'next/navigation'

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

  const titre = oeuvre.titre || oeuvre.denomination || 'Sans titre'
  const auteur = oeuvre.auteur || 'Auteur inconnu'
  const domaine = oeuvre.domaine?.join(', ') || ''
  const periode = oeuvre.periode_de_creation?.split(';').join(' – ') || ''
  const materiaux = oeuvre.materiaux_techniques?.join(', ') || ''

  return (
    <main>
      <div className="container">
        <a href="/" className="detail-back">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Retour à la galerie
        </a>

        <div className="detail-layout">
          {/* Colonne gauche — image */}
          <div>
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

            <div style={{ marginTop: '1.5rem' }}>
              <div className="detail-section-label">Métadonnées</div>
              <div className="meta-list" style={{ marginTop: '0.75rem' }}>
                <MetaRow label="Référence" value={oeuvre.reference} />
                <MetaRow label="Numéro d'inventaire" value={oeuvre.numero_inventaire} />
                <MetaRow label="Localisation" value={oeuvre.localisation || oeuvre.ville} />
                <MetaRow label="Musée" value={oeuvre.nom_officiel_musee} />
                <MetaRow label="Dimensions" value={oeuvre.mesures} />
                <MetaRow label="Statut juridique" value={oeuvre.statut_juridique} />
              </div>
            </div>
          </div>

          {/* Colonne droite — infos */}
          <div>
            {domaine && <div className="detail-domain">{domaine}</div>}
            <h1 className="detail-title">{titre}</h1>
            <p className="detail-auteur">
              {auteur}{periode ? ` · ${periode}` : ''}
            </p>

            {materiaux && (
              <div className="tags">
                {oeuvre.materiaux_techniques?.map((m) => (
                  <span key={m} className="tag">{m}</span>
                ))}
              </div>
            )}

            <div className="detail-divider" />

            {oeuvre.description && (
              <>
                <div className="detail-section-label">Description (Joconde)</div>
                <p className="detail-explication" style={{ marginBottom: '1.5rem', color: 'var(--ink-muted)' }}>
                  {oeuvre.description}
                </p>
                <div className="detail-divider" />
              </>
            )}

            <ExplicationEditor reference={oeuvre.reference} initial="" />

            {oeuvre.bibliographie && (
              <>
                <div className="detail-divider" />
                <div className="detail-section-label">Bibliographie</div>
                <p style={{ fontSize: '0.82rem', color: 'var(--ink-muted)', lineHeight: '1.7', marginTop: '0.5rem' }}>
                  {oeuvre.bibliographie}
                </p>
              </>
            )}

            {oeuvre.decouverte_collecte && (
              <>
                <div className="detail-divider" />
                <div className="detail-section-label">Découverte / collecte</div>
                <p style={{ fontSize: '0.82rem', color: 'var(--ink-muted)', lineHeight: '1.7', marginTop: '0.5rem' }}>
                  {oeuvre.decouverte_collecte}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
