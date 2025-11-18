[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![View License](https://img.shields.io/badge/View%20License-MIT-blue)](LICENSE)

# Data Visualization Project — Comparing SDG Indicators

This project is part of an academic exercise for the course **Taller de Diseño 9**, within the Industrial Design Engineering program at the **Instituto Tecnológico de Costa Rica**.

The goal of the project is to visualize and compare two Sustainable Development Goal (SDG) indicators:

- **SDG 5: Gender Equality** (UN Data)
- **GDP per capita** (World Bank Data)

The dashboard explores how these metrics relate across different countries.  
All datasets are sourced directly from official open-data platforms.

From a technical standpoint, this is a **custom dashboard built in vanilla React**, bundled and served with **Vite**.  
The interface was designed to support specific UX/UI decisions made during the research and concept development phase of the team—of which I was a member.

## Technical Architecture

This project is a client-side data visualization dashboard built with a lightweight and modular architecture. The emphasis is on clarity, performance, and maintainability.

### **1. Frontend Framework**

- **React (Vanilla React)**  
  The interface is built using React without additional state-management libraries.  
  Component structure is kept simple and focused on readability.

### **2. Development & Build System**

- **Vite**  
  Used as the development server and build tool.
  - Fast HMR (Hot Module Replacement) during development
  - Minimal configuration
  - Generates an optimized production bundle

### **3. Data Flow**

- The dashboard loads two datasets:
  - **UN SDG 5: Gender Equality Indicator**
  - **World Bank: GDP per Capita**
- Data is **not stored in this repository** and is fetched or imported from external open-data sources.
- Data transformations (filtering, mapping, comparisons) are performed client-side using JavaScript utility functions.

### **4. Visualization Layer**

- Implemented with custom React components.
- Visualizations are intentionally handcrafted (no third-party charting libraries), aligning with the design team’s UX/UI priorities and aesthetic direction.
- Components include:
  - Country comparison views
  - Normalized scales for cross-indicator visualization
  - Responsive layouts for laptop and desktop use

### 5. File Structure Overview

The project follows a modular client-side architecture with clean separation between components, logic utilities, styling, and entry points.

```
src/
├─ components/      # UI and visualization components
├─ hooks/           # Custom React hooks for shared logic
├─ lib/             # Data transformations, helpers, utility functions
├─ assets/          # Icons, images, SVGs (no proprietary data)
├─ types/           # TypeScript type definitions
├─ constants.ts     # Global configuration and categorical constants
├─ data.ts          # Logic related to data loading, preprocessing, mapping
├─ App.tsx          # Main app wrapper
├─ main.tsx         # Client entry
├─ entry-client.tsx # SSR hydration entry (if SSR is used)
├─ entry-server.tsx # Server entry for SSR (if applicable)
└─ index.css        # Global stylesheet
```

### **6. Styling**

- Styling uses a simple modular CSS approach (or CSS modules, depending on your setup).
- The design system prioritizes:
  - High visual contrast
  - Strong hierarchy
  - Clear data-to-ink ratio (Tufte principle)
  - Color palettes derived from the design research phase

### **7. Deployment**

The project can be deployed as a static frontend on any service that supports static hosting, such as:

- Netlify
- Vercel
- GitHub Pages
- Cloudflare Pages

Vite outputs a fully static build (`dist/`) with no backend dependencies.

---

## Licensing

This project is licensed under the **MIT License**.  
You are free to use, modify, and distribute the source code under the terms of that license.

- **Code ownership:** All source code in this repository was developed by **Juan Ignacio Campos**.

- **UX/UI research contributions:**  
  This project includes collaborative design research, ideation, and conceptual development conducted with:

  - _Analuisa Aguilar Rodríguez_
  - _Mariana Gómez Boza_
  - _Daniela Sandí Hernández_

  These contributions are acknowledged here but **are not included under the MIT license**, as they involve shared authorship.

- **Datasets:**  
  The datasets used in this project are the property of their respective institutions and are **not licensed** under this repository. They remain the intellectual property of their original owners.
