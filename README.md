# CynoIA — High-Performance Immersive Frontend

> Landing page futuriste pour la startup SaaS **CynoIA**, exploitant des géométries paramétriques 3D et une infrastructure Serverless sur Oracle Cloud.  
> Réalisé dans le cadre d'un projet de Master 2 en ingénierie logicielle.

---

## Stack Technique

| Couche | Technologie | Version |
|---|---|---|
| Framework | **Next.js** (App Router, SSR/SSG) | 15.x |
| Rendu 3D | **React Three Fiber** + Three.js | 8.x / 0.169 |
| Post-processing | **@react-three/postprocessing** (Bloom, EffectComposer) | 2.x |
| Animation | **GSAP** + ScrollTrigger | 3.x |
| Styles | **Tailwind CSS** v4 | 4.x |
| Thème | **next-themes** (Dark / Light adaptatif) | 0.4 |
| Typo | Syne (display) + Space Grotesk (body) — Google Fonts | — |
| Langage | TypeScript strict | 5.x |
| Runtime | Node.js 20 LTS | — |

---

## Architecture

### Scène 3D — Bruit de Perlin & Géométrie Paramétrique

Le background immersif est rendu via un **WebGL Canvas** (`react-three-fiber`) positionné en `fixed` avec `z-index: -10`, invisible à la couche DOM mais visible derrière tout le contenu.

**Pipeline géométrique :**
```
THREE.Shape (contour africain, ~40 sommets lat/lon normalisés)
  → ExtrudeGeometry (depth: 0.28, bevel: 3 segments)
  → EdgesGeometry (threshold 12°)
  → LineSegments + ShaderMaterial custom
```

**Vertex Shader — déformation cinétique :**  
Chaque sommet est déplacé selon la formule :
```glsl
pos += normal * (cnoise(pos * 0.75 + uTime * 0.18) + cnoise(pos * 1.60 + uTime * 0.10) * 0.35) * amplitude;
```
Le **Bruit de Perlin classique 3D** (`cnoise`) génère un champ de déplacement continu et différentiable, garantissant une déformation organique sans discontinuités visuelles. L'`amplitude` est modulée par `uScrollProgress` pour intensifier l'effet au scroll.

**Fragment Shader — gradient dynamique :**  
Gradient violet (sud) → electric blue (équateur) → cyan (nord), calqué sur la latitude du continent africain. Pulsation par `sin(uTime)` pour un effet lumineux vivant.

**Post-processing :**  
`Bloom` HDR (`intensity: 1.8`, `luminanceThreshold: 0.05`) via `EffectComposer` pour le halo lumineux sur les arêtes du wireframe.

**Optimisation GPU :**  
- `powerPreference: 'high-performance'` sur le contexte WebGL → force le GPU dédié sur les machines hybrides
- `dpr={[1, 2]}` → Device Pixel Ratio adaptatif (1x mobile, 2x Retina)
- `frameloop="always"` → boucle RAF continue pour 60 FPS stables

---

### Animations UI — GSAP ScrollTrigger

Toutes les animations de sections (titres, cartes, compteurs) sont pilotées par **GSAP ScrollTrigger** avec `scrub` pour un défilement fluide. Chaque composant isole son contexte GSAP dans `gsap.context()` pour éviter les fuites mémoire lors des remontages React (changement de langue, HMR).

---

### Infrastructure Cloud — Oracle Cloud Infrastructure (OCI)

Le déploiement cible **Oracle Cloud Infrastructure** en mode Serverless :

| Composant | Service OCI |
|---|---|
| Hébergement front | **OCI Compute** (VM.Standard.E4.Flex) ou **Container Instances** |
| CDN / Edge | **OCI Web Application Firewall** + **FastConnect** |
| Stockage assets | **Object Storage** (bucket public, tier Standard) |
| CI/CD | **OCI DevOps** → Build Pipeline → Artifact → Deploy Pipeline |
| SSL/TLS | **Certificate Manager** OCI (Let's Encrypt automatique) |

Le build Next.js produit un bundle statique optimisé (`next export` ou `standalone`) déployé sur un container Docker minimal (node:20-alpine).

---

## SEO & Accessibilité

- **Title :** `CynoIA : Expérience Immersive WebGL & Architecture Cloud`
- **Description :** `Landing page futuriste pour la startup SaaS CynoIA, exploitant des géométries paramétriques 3D et une infrastructure Serverless sur Oracle Cloud.`
- **OpenGraph** + **Twitter Card** configurés dans `app/layout.tsx`
- **WCAG 2.1 AA/AAA :** `#1A1A1A` sur `#FFFFFF` → ratio 21:1 ✅ | `#374151` sur `#FFFFFF` → ratio 11:1 ✅
- `aria-hidden="true"` sur le canvas 3D (élément décoratif)
- `alt` descriptif sur tous les éléments `<Image>`

---

## Lancer le projet

```bash
# Installation
npm install

# Développement (hot reload)
npm run dev

# Build de production
npm run build

# Serveur de production
npm start
```

Ouvrir [http://localhost:3000](http://localhost:3000).

---

## Structure du projet

```
cynoai-landing/
├── app/
│   ├── layout.tsx          # Métadonnées SEO, providers thème/langue
│   ├── page.tsx            # Composition des sections
│   └── globals.css         # Variables CSS, animations, WCAG light mode
├── components/
│   ├── HeroScene.tsx       # Canvas WebGL — continent africain + Perlin noise
│   ├── HeroSceneLoader.tsx # Lazy-loading SSR-safe de HeroScene
│   ├── Navbar.tsx          # Navigation sticky avec toggle thème/langue
│   ├── HeroSection.tsx     # Section hero avec GSAP animations
│   ├── StatsSection.tsx    # Compteurs animés
│   ├── FeaturesSection.tsx # Grille de fonctionnalités
│   ├── ValueSection.tsx    # Cartes valeur proposition
│   ├── CTASection.tsx      # Call-to-action final
│   └── Footer.tsx          # Footer avec liens et copyright
├── context/
│   └── LanguageContext.tsx # i18n FR/EN (React Context)
└── public/
    └── logo.png
```

---

## Auteur

Développé par **The IT Architect** — Ingrid

---

*© 2026 CynoIA. Tous droits réservés.*
