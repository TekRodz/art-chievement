'use client'
import { useState } from 'react'

// Composant client pour enregistrer une explication utilisateur en local.
export function ExplicationEditor({
  reference,
  initial,
}: {
  reference: string
  initial: string
}) {
  const key = `explication_${reference}`
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(initial || (typeof window !== 'undefined' ? localStorage.getItem(key) ?? '' : ''))
  const [saved, setSaved] = useState(false)

  // Enregistre l'explication dans localStorage et affiche une confirmation.
  function handleSave() {
    localStorage.setItem(key, value)
    setSaved(true)
    setEditing(false)
    setTimeout(() => setSaved(false), 3000)
  }

  if (editing) {
    return (
      <div>
        <div className="detail-section-label">Mon explication</div>
        <textarea
          className="explication-textarea"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Écris ton explication ici — contexte historique, anecdote, ce qui te touche dans cette œuvre…"
          autoFocus
        />
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginTop: '0.75rem' }}>
          <button className="btn-save" onClick={handleSave} disabled={!value.trim()}>
            Enregistrer
          </button>
          <button className="btn-edit" onClick={() => setEditing(false)}>
            Annuler
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <div className="detail-section-label">Mon explication</div>
        <button className="btn-edit" onClick={() => setEditing(true)}>
          {value ? 'Modifier' : '+ Ajouter'}
        </button>
      </div>
      {value ? (
        <p className="detail-explication">{value}</p>
      ) : (
        <p className="detail-explication-empty">
          Aucune explication pour le moment. Clique sur "+ Ajouter" pour en rédiger une.
        </p>
      )}
      {saved && (
        <div className="saved-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          Enregistré
        </div>
      )}
    </div>
  )
}
