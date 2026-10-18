# M/s Neha Infrastructures — Official Corporate Website

[![Class-I Civil Contractor](https://img.shields.io/badge/Category-Class--I%20Civil%20Contractor-dd0429.svg)](#)
[![Deployment](https://img.shields.io/badge/Deployment-GitHub%20Pages-1a1a1a.svg)](https://cherry6272.github.io/Neha-Infra/)
[![Location](https://img.shields.io/badge/Headquarters-Bangalore%2C%20Karnataka-5a6268.svg)](#)

> **Live Website:** [https://cherry6272.github.io/Neha-Infra/](https://cherry6272.github.io/Neha-Infra/)  
> **Source Repository:** [https://github.com/Cherry6272/Neha-Infra](https://github.com/Cherry6272/Neha-Infra)

Corporate engineering and civil contracting website for **M/s Neha Infrastructures**, a registered Class-I Civil Contractor firm operating across Karnataka, India.

---

## 1. Verified Statutory & Contact Records

| Record Field | Verified Data |
| :--- | :--- |
| **Legal Firm Entity** | M/s Neha Infrastructures (Proprietorship) |
| **Proprietor / Managing Director** | Mr. M. Sundar Raju (32+ Years Personal Civil Experience) |
| **Firm Establishment** | Established in 2007 |
| **Contractor Classification** | Class-I Civil Contractor |
| **Registration Number** | `CBS/C1/CIVIL/2933/2015` |
| **Registration Authority** | Chief Engineer, Communication & Buildings (South), PWD, Bangalore |
| **GSTIN** | `29AGMPR8103R1ZF` |
| **Registered Office** | `#02, 1st Floor, Rangasri, Canara Bank Layout, Bangalore – 560097, Karnataka, India` |
| **Official Email** | `nehainfra@yahoo.com` |

---

## 2. Visual Identity & Brand System

Faithfully built around M/s Neha Infrastructures' authentic corporate brand palette established by its official logo and stylesheet:
- **Primary Brand Red (`--thm-base: #dd0429` / `rgb(221, 4, 41)`):** Sourced directly from the official logo's gear emblem and infrastructure banner. Applied to primary calls to action, active navigation lines, certification badges, and key icons.
- **Secondary Charcoal / Jet Black (`--thm-black: #1a1a1a` / `rgb(26, 26, 26)`):** Sourced from the logo's structural typography for headers, footers, section headings, and hero backgrounds.
- **Secondary Slate / Steel Gray (`--thm-slate: #5a6268` / `--thm-gray: #878c8f`):** Sourced from the serif 'NEHA' letterforms for metadata, subtitle badges, and muted text.
- **Architectural Concrete (`#F4F6F8`) & Pure White (`#FFFFFF`):** High-contrast, clean backgrounds for cards and alternating content modules.
- **Typography:** Google Fonts *Saira Semi Condensed* and *Outfit* ensuring legible, editorial hierarchy.

Styles are organized cleanly in [`assets/css/neha-corporate.css`](assets/css/neha-corporate.css).

---

## 3. Website Structure & Navigation

The website consists of a focused 5-item primary navigation:
1. **Home (`index.html`)**: Conversion-focused overview with verified credentials, core services, project portfolio highlights, leadership profile, and verified contact strip.
2. **About Us (`about.html`)**: Detailed firm history (est. 2007), proprietor credentials, plant & machinery capabilities, and quality assurance framework.
3. **Services (`services.html`)**: Engineering capabilities directory with dedicated subpages:
   - `residential-building.html` (Institutional student hostels, academic blocks, composite residential structures)
   - `road-development.html` (WMM, asphalt paving, urban road widening, municipal road improvements)
   - `stormwater-drains.html` (RCC box drains, AMRUT sewerage networks, flood mitigation)
   - `lift-irrigation.html` (Canal lining, jackwells, delivery chambers, KNNL hydraulic works)
   - `composite-housing.html` (Township layout formation, underground utilities, sites & services schemes)
   - `civil-earthworks.html` (Bulk cut-and-fill balancing, railway formations, site leveling)
4. **Projects (`portfolio.html` & `portfolio-details.html`)**: Documented public engineering packages across Karnataka with detailed project pages.
5. **Contact (`contact.html`)**: Verified Bangalore office details, embedded interactive Bangalore map, and validated enquiry dispatch.
6. **Support (`404.html`)**: Custom branded error page with GitHub Pages clean-URL routing.

---

## 4. Reliable Enquiry Workflow

- **Security & Privacy Protection**: Client-side browser CRM operations, hardcoded passcodes, and unencrypted local browser storage have been eliminated.
- **Enquiry Validation**: Inquiries submitted via `contact.html` trigger accessible inline validation (name length, RFC 5322 regex email, and project scope details).
- **Anti-Duplicate Controls**: Submit actions immediately debounce and disable the submit trigger with an animated loading indicator.
- **Delivery Channels**:
  - **Automated Service (Configurable)**: Can be activated by setting `window.NEHA_CONFIG.formspreeEndpoint` in `assets/js/neha-enquiry.js`. Success/error states reflect real HTTP responses.
  - **Direct Verified Email (Default on GitHub Pages)**: Transparently routes enquiries directly to official email (`nehainfra@yahoo.com`) with pre-formatted contract specifications.
- **Production CRM Activation (Supabase RLS)**:
  - Table: `public.leads` (`id`, `created_at`, `client_name`, `phone`, `email`, `service_category`, `scope_details`, `status`).
  - Public policy: `INSERT` allowed for `anon` role (form submissions only).
  - Administration policy: `SELECT`, `UPDATE`, `DELETE` restricted to authenticated staff (`@nehainfra.com`).
  - Secret Isolation: Database service-role keys and passwords are strictly kept out of frontend source control.

---

## 5. Technical SEO & Assets

- **Sitemap:** [`sitemap.xml`](sitemap.xml) with canonical URLs under `https://cherry6272.github.io/Neha-Infra/`.
- **Search Engine Directives:** [`robots.txt`](robots.txt).
- **High-Resolution Photography:** 16:9 civil infrastructure photography located locally in `assets/images/services/` and `assets/images/project/`.
- **No Hotlinking:** All assets are bundled in the repository for dependable offline or CDN serving.

---

## 6. Local Testing & Deployment

### Running Locally
To test the website locally, launch any static file server:
```bash
# Using Python
python -m http.server 8080

# Using Node.js
npx -y serve . -p 8080
```
Open `http://localhost:8080` in your browser.

### GitHub Pages Deployment
The website is preconfigured for automatic GitHub Pages deployment directly from the `main` branch:
1. Commit and push your changes to GitHub:
   ```bash
   git add .
   git commit -m "Complete website overhaul and client handover"
   git push origin main
   ```
2. In GitHub repository settings, verify **Pages** is set to `Deploy from a branch` -> `main` / `root`.
3. The site publishes automatically at `https://cherry6272.github.io/Neha-Infra/`.

---

## 7. Handover Notes for Company Verification

The following items are preserved from existing records and recommended for company validation during client review:
1. **Project Historical Values:** The contract values (e.g., Thimmapur LIS at ₹12,221 Lakhs, Prashanti Kuteeram at ₹1350 Lakhs) reflect existing portfolio archives.
2. **Photography Assets:** Where authentic on-site company project photographs become available in the future, simply place high-resolution photos in `assets/images/project/` using the established filenames.
3. **Class-I Renewal:** Registration certificate `CBS/C1/CIVIL/2933/2015` renewal status should be updated if a newer renewal endorsement has been issued by PWD Karnataka.
