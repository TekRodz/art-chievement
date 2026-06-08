import { fetchOeuvre } from '@/lib/joconde'
import { ExplicationEditor } from '@/components/ExplicationEditor'
import { OeuvreImage } from '@/components/OeuvreImage'
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
        <a href="/" className="detail-back">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Retour à la galerie
        </a>

        <div className="detail-layout">
          {/* Colonne gauche — image */}
          <div>
            <OeuvreImage oeuvre={oeuvre} />

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
