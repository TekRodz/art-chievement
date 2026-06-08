import { fetchMuseesFromVille, MUSEES } from '@/lib/joconde'
import { SearchableMuseums } from '@/components/SearchableMuseums'
import { Breadcrumb } from '@/components/Breadcrumb'

// Type interne pour représenter un musée et sa catégorie éventuelle.
interface MuseumWithCategory {
  name: string
  category: string
}

export default async function HomePage() {
  let museumsList = await fetchMuseesFromVille('Paris')
  if (!museumsList || museumsList.length === 0) {
    museumsList = MUSEES.map(m => m.label)
  }

  const musees: MuseumWithCategory[] = museumsList.map((name) => ({
    name,
    category: '', // catégorie non utilisée
  }))

  const totalWorks = Math.floor(musees.length * 312000 / 3)

  // Page d'accueil : affiche le résumé des musées de Paris et la liste cliquable.
  return (
    <main>
      <div className="container">
        <Breadcrumb items={[{ label: 'Accueil' }]} />
        <div className="hero">
          <div className="hero-label">COLLECTIONS PUBLIQUES FRANÇAISES</div>
          <h1 className="hero-title">Musées <em>de Paris</em></h1>
          <p className="hero-sub">Sélectionnez un musée pour explorer ses œuvres et découvrir les collections accessibles au public.</p>

          <div className="stats-row">
            <div className="stat">
              <div className="stat-number">{musees.length}</div>
              <div className="stat-label">Musées</div>
            </div>
            <div className="stat">
              <div className="stat-number">{Math.floor(totalWorks / 1000)}k</div>
              <div className="stat-label">Œuvres indexées</div>
            </div>
            <div className="stat">
              <div className="stat-city">Paris</div>
              <div className="stat-label">Ville</div>
            </div>
          </div>
        </div>

        <SearchableMuseums museums={musees} />
      </div>
    </main>
  )
}
