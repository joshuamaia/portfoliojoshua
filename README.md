# Joshua Maia Rodrigues · Interactive Portfolio

Personal portfolio and online resume of **Joshua Maia Rodrigues**, Senior Full Stack Developer with 16+ years of experience in Java, Spring Boot, Angular and software architecture.

Besides the classic resume sections, the site includes an **Explore** area with interactive, educational tools that show how I approach architecture, engineering trade-offs and technology choices.

**Live site:** [joshuamr.com.br](https://joshuamr.com.br)

---

## Features

### Resume
- **Home**: professional summary, skills grouped by area, location, languages and links.
- **Work Experience**: roles, clients, periods (with automatic duration) and technologies.
- **Education and Courses**: degrees, postgraduate programs in progress and bootcamps.
- **Certificates**: grouped certificates displayed in modals.
- **Resume PDF**: the original resume can be viewed in a modal or downloaded.
- **Light and dark themes**: the theme follows the system preference and the visitor's choice is remembered.

### Explore (`/explore`)
| Section | What it does |
|---|---|
| **Architecture Explorer** | Interactive SVG diagrams of four patterns: Modern Monolith, Microservices, Event-Driven (Kafka and RabbitMQ) and BPMN with Flowable. Select a component to see its responsibility, technologies, benefits, trade-offs and common challenges. A **Compare Architectures** mode compares two patterns on six qualitative criteria. |
| **Engineering Challenges** | Six real-world scenarios (high-volume messaging, database performance, resilience, legacy modernization, concurrency, workflow automation). For each one, the visitor can choose between two or three approaches, see a diagram, compare advantages, limitations and risks, and read a reference solution. |
| **Interactive Skills Map** | Radial map (or cards) of eight areas of expertise. It shows the technologies, practical applications, roles where they were used and related certificates. No arbitrary proficiency percentages: every number is a verifiable count. |
| **Career Timeline** | Year-by-year chart and expandable list of every experience, with a technology filter. |
| **Tailored Resume** | Generates a resume focused on *Backend Java*, *Frontend Angular* or *Full Stack Engineering*. It reorders and highlights skills and experiences, shows a live preview and exports a separate, text-based PDF. The original PDF stays available and unchanged. |

All Explore views keep their state in the URL (for example `?pattern=bpmn` or `?approach=kafka`), so any view can be shared through a link.

---

## Tech stack

| Area | Technologies |
|---|---|
| Framework | Angular 22 (signals, standalone components, built-in control flow, lazy-loaded routes) |
| Language | TypeScript 6 |
| UI | Bootstrap 5 (CSS), ng-bootstrap (modals), Font Awesome 7, custom design tokens |
| Diagrams and charts | Hand-written SVG and CSS, no charting library |
| PDF | ng2-pdf-viewer (viewing), jsPDF (generation, loaded on demand) |
| Tests | Jasmine + Karma (ChromeHeadless) |
| Hosting | GitHub Pages, custom domain |

There is no backend: all content is static data compiled into the application.

---

## Project structure

```
src/
├── app/
│   ├── data/                 # Single source of truth for all content
│   │   ├── profile.ts        # Name, headline, summary, skills, links
│   │   ├── experience.ts     # Work experience (+ period/duration helpers)
│   │   ├── education.ts      # Degrees and courses
│   │   ├── certificates.ts   # Certificates by group
│   │   ├── architectures.ts  # Architecture Explorer content
│   │   ├── challenges.ts     # Engineering Challenges scenarios
│   │   ├── skills-map.ts     # Skills map areas (+ derived counts)
│   │   └── resume-profiles.ts# Tailored Resume profiles
│   ├── shared/
│   │   ├── diagram/          # Reusable SVG diagram (model, geometry, grid builder, component)
│   │   └── ...               # Page header, reveal animation, resume and certificate modals
│   ├── explore/              # Explore area (standalone, lazy-loaded)
│   │   ├── architecture/
│   │   ├── challenges/
│   │   ├── skills/
│   │   ├── timeline/
│   │   └── resume/
│   ├── home/ trabalho/ escolaridades/ certificados/   # Resume pages (NgModules)
│   ├── menu/ topo/ rodape/   # Navigation, header, footer, theme service
│   └── config/               # Font Awesome icon registry
├── assets/                   # Images and the original resume PDF
└── styles.css                # Design tokens (light/dark) and global styles
```

### Design decisions
- **Data-driven content.** Every page reads from `src/app/data`. Updating the resume means editing one data file, without touching the components.
- **No invented information.** The Skills Map, the Timeline and the Tailored Resume only reuse existing data. Unit tests check that every technology shown in the Skills Map is declared in the portfolio, and that the Tailored Resume never changes companies, roles, periods or activities.
- **One diagram component.** The Architecture Explorer and the Engineering Challenges share the same SVG diagram component. Each diagram is a typed list of nodes and edges, and the challenge diagrams are laid out with a small grid builder.
- **Performance.** Each section is lazy-loaded. jsPDF (about 110 kB gzipped) is only downloaded when a visitor generates a tailored PDF.
- **Accessibility.**
  - Keyboard navigation in tabs, radio groups and diagrams.
  - Visible focus states and `aria-*` attributes on interactive elements.
  - A text description is available for every diagram.
  - Animations are disabled when the visitor prefers reduced motion.

---

## Getting started

**Requirements:** Node.js `^22.22.3`, `^24.15.0` or `>=26` (as required by Angular 22) and npm.

```bash
npm install
npm start            # http://localhost:4200
```

| Script | Description |
|---|---|
| `npm start` | Development server with live reload |
| `npm run build` | Production build into `docs/` |
| `npm test` | Unit tests in watch mode |
| `npx ng test --watch=false --browsers=ChromeHeadless` | Single test run (CI style) |
| `npm run compodoc` | Generates code documentation |

---

## Updating the content

| To change… | Edit |
|---|---|
| Headline, summary, skills, languages, links | `src/app/data/profile.ts` |
| Work experience | `src/app/data/experience.ts` (optional `highlights` appear in the Career Timeline) |
| Degrees and courses | `src/app/data/education.ts` |
| Certificates | `src/app/data/certificates.ts` (+ image in `src/assets`) |
| Original resume PDF | Replace `src/assets/Joshua_MaiaRodrigues_Resume.pdf` |
| Tailored Resume focus areas | `src/app/data/resume-profiles.ts` (a focus area only appears when its technology exists in the data) |

Run the tests after editing the data. They point out inconsistencies, such as a technology in the Skills Map that is not declared anywhere else.

---

## Deployment

The production build is written to `docs/`, which GitHub Pages serves from the `master` branch. The `src/CNAME` file is copied into the build, so the custom domain survives every deploy.

```bash
npm run build
git add docs && git commit -m "Build" && git push
```

---

## Author

**Joshua Maia Rodrigues**: Senior Full Stack Developer · Brasília – DF, Brazil

[Portfolio](https://joshuamr.com.br) · [LinkedIn](https://www.linkedin.com/in/joshuamaia/) · [GitHub](https://github.com/joshuamaia)
