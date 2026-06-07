# Vestibule

Explorez les collections du musée du Louvre, issues de la base Joconde du ministère de la Culture.

## Lancer en local

```bash
npm install
npm run dev
```

Ouvre http://localhost:3000

## Déployer sur Vercel

1. Crée un compte sur [vercel.com](https://vercel.com)
2. Installe la CLI : `npm i -g vercel`
3. Dans le dossier du projet : `vercel`
4. Suis les instructions — framework détecté automatiquement (Next.js)

Ou depuis l'interface Vercel : importe le repo GitHub directement.

## Structure

```
src/
  app/
    page.tsx              # Galerie (page d'accueil)
    oeuvre/[reference]/   # Fiche détail d'une œuvre
    layout.tsx            # Nav + layout global
    globals.css           # Styles
  components/
    ExplicationEditor.tsx # Éditeur d'explication (client)
  lib/
    joconde.ts            # Client API Joconde
    types.ts              # Types TypeScript
```

## API utilisée

[Base Joconde](https://data.culture.gouv.fr/explore/dataset/joconde/) — données ouvertes du ministère de la Culture (Licence Ouverte v2.0).

## À venir

- [ ] Stockage des explications en base de données (Supabase)
- [ ] Système de favoris
- [ ] Filtre par salle / localisation
- [ ] Images via la base POP
