# M/s Neha Infrastructures — Official Corporate Website

[![Class-I Civil Contractor](https://img.shields.io/badge/Category-Class--I%20Civil%20Contractor-6D963D.svg)](#)
[![Deployment](https://img.shields.io/badge/Deployment-GitHub%20Pages-12263A.svg)](https://cherry6272.github.io/Neha-Infra/)
[![Location](https://img.shields.io/badge/Headquarters-Bangalore%2C%20Karnataka-blue.svg)](#)

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
| **Official Telephone** | `+91 98452 21414` |
| **Direct WhatsApp Channel** | `+91 98452 21414` (`https://wa.me/919845221414`) |
| **Official Email** | `nehainfra@yahoo.com` |

---

## 2. Visual Identity & Brand System

Built around a cohesive corporate civil engineering palette:
- **Deep Navy (`#12263A`):** Core structural brand color for headers, footers, and typography.
- **Infrastructure Green (`#6D963D`):** Accent brand color for badges, calls to action, active navigation, and certification markers.
- **Concrete Grey (`#F2F4F5`):** Clean background contrast for cards and content sections.
- **Primary Text (`#263443`) & Muted Text (`#687582`):** High-contrast, WCAG AAA compliant typography.
- **Typography:** Google Fonts *Saira Semi Condensed* and *Outfit*.

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
4. **Projects (`portfolio.html` & `portfolio-details.html`)**: Documented public engineering packages across Karnataka with transparent illustrative representation tags and the Thimmapur LIS case study.
5. **Contact (`contact.html`)**: Verified Bangalore office details, embedded interactive Bangalore map, and validated enquiry dispatch.
6. **Support & Admin (`404.html`, `leads.html`)**:
   - `404.html`: Custom branded error page for broken URLs.
   - `leads.html`: Offline/client-side CRM console logging incoming estimate inquiries and pageview traffic.

---

## 4. Honest Enquiry Flow & Client Handover

- Inquiries submitted via `contact.html` or inline estimate forms trigger client-side validation (minimum name length, regex email check, valid phone number).
- The inquiry details are immediately logged to `localStorage.getItem('crm_leads')` for tracking in `leads.html`.
- A modal opens presenting the visitor with prefilled direct dispatch links:
  - **WhatsApp Direct:** Opens `https://wa.me/919845221414?text=...` with formatted project scope.
  - **Email Direct:** Opens `mailto:nehainfra@yahoo.com?subject=...&body=...` prefilled draft.
- **Zero fake server responses:** No misleading success notices when no backend is configured.

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
2. **Photography Replacement:** Where authentic company site photographs become available in the future, simply place high-resolution photos in `assets/images/project/` using the established filenames to replace the illustrative stock representations.
3. **Class-I Renewal:** Registration certificate `CBS/C1/CIVIL/2933/2015` renewal status should be updated if a newer renewal endorsement has been issued by PWD Karnataka.
