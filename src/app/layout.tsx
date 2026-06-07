import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Vestibule — Les œuvres du Louvre',
  description: 'Explorez les collections du musée du Louvre avec des explications humaines.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <nav className="nav">
          <div className="container nav-inner">
            <a href="/" className="nav-logo">
              Art-chievment<span>.</span>
            </a>
            <ul className="nav-links">
              <li><a href="/?domaine=peinture">Peintures</a></li>
              <li><a href="/?domaine=sculpture">Sculptures</a></li>
              <li><a href="/?domaine=arch%C3%A9ologie">Archéologie</a></li>
            </ul>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}
