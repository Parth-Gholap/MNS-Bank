<!--
Sync Impact Report:
Version change: 1.0.1 → 1.1.0 (Major enhancement with complete BRD integration)
List of modified principles: None (enhanced existing)
Added sections:
- Core Principles (9 principles - added Component Architecture and Page Inventory Compliance)
- Technical Requirements (7 sections - added NFRs with 17 specific requirements, Persona-Driven Development)
- Development Workflow (7 sections - added detailed Phase 1-3 execution plan, Risk Management, Dependencies & Constraints)
- Governance (enhanced with BRD-specific requirements)
Removed sections: None
Templates requiring updates:
✅ constitution-template.md → Used as base
✅ plan-template.md → Constitution Check section compatible
✅ spec-template.md → Requirements structure compatible
✅ tasks-template.md → Task organization compatible
⚠ No command files found to update
Follow-up TODOs: None - all BRD requirements integrated
-->

# Mahanagar Nagrik Sahakari Bank Constitution

## Core Principles

### I. Compliance-First Development (NON-NEGOTIABLE)
All development must prioritize RBI compliance requirements above all other considerations. DEAF, Grievance Redressal, KFS, and all mandatory disclosures must be implemented exactly as specified. No feature shall launch without full compliance verification. Rationale: Banking websites operate under strict regulatory oversight; non-compliance poses legal and operational risks.

### II. Zero Broken Links Policy
Every navigation item, link, and button must resolve to a valid, complete page. No under-construction pages, empty content, or 404 errors are permitted. All user journeys must be fully functional. Rationale: Broken links erode trust and create poor user experience, particularly critical for financial institutions.

### III. Mobile-First Responsive Design
All components and pages must be designed for mobile devices first, then adapted for larger screens. Responsive behavior is mandatory across all viewports. Rationale: Majority of banking users access services via mobile; mobile-first ensures optimal experience for the primary user segment.

### IV. Trust-Driven UI Architecture
UI must convey credibility through verified links, official branding, clear disclosures, and professional design patterns. No dark patterns, misleading UI, or hidden information permitted. Rationale: Trust is the foundation of banking relationships; UI must reinforce institutional credibility.

### V. Accessibility & Performance Standards
WCAG 2.1 AA compliance and PageSpeed ≥ 90 are mandatory. All pages must load under 3 seconds with optimized assets. Rationale: Inclusive access and fast performance are essential for serving all customer segments and meeting modern web standards.

### VI. Bilingual Support (English + Hindi)
All key pages must support both English and Hindi languages. Language toggle must be prominently displayed. Hindi translation required for all navigation, compliance pages, and user-facing content. Rationale: Serving Hindi-first users is essential for inclusive banking access in the target region.

### VII. Self-Service Enablement
All product pages must include inquiry forms and self-service tools. EMI calculator with real-time calculation using standard formula is mandatory. Users must be able to initiate actions without requiring branch visits. Rationale: Modern banking expects digital self-service capabilities.

### VIII. Component-Based Architecture (NON-NEGOTIABLE)
All development must use predefined component specifications (C-001 to C-014) with exact implementation requirements. No bespoke components permitted. Design system tokens (colors, typography, spacing) must be consistently applied. Rationale: Ensures consistency, maintainability, and adherence to brand standards across 80+ pages.

### IX. Detailed Page Inventory Compliance
All 80+ specified pages from BRD must be implemented with exact URL structure and phase mapping. Each page must follow designated type (SP/CP) and include required content sections. Rationale: Complete website functionality requires every specified page to be live with proper content.

## Technical Requirements

### Component Architecture
Component-based architecture using React is required. All UI elements must be reusable components with consistent design system implementation. No inline styles or ad-hoc patterns permitted. Components must follow clean folder structure with separation of UI and logic.

### Information Architecture Rules
Dual navigation structure (Personal Banking, Business Banking) is mandatory. Each navigation path must include: Accounts, Deposits, Loans, Services, Stay Connected. Shared sections: About Us, Compliance & Legal, Contact & Support. Every navigation item must resolve to a valid page with SEO-friendly URLs.

### Global Component Architecture
Reusable components must be defined for:
- Header: Logo, navigation, language toggle (EN/HI), Net Banking button
- Footer: Navigation links, compliance links, contact details, social icons
- Product Pages: Hero section, tab-based content (Overview, Features, Eligibility, Documents, Apply)
- Forms: Inline inquiry forms with validation, CAPTCHA, secure submission
- Tables: Interest rates, service charges, DEAF data (searchable)
- Homepage Components: Carousel, What's New, product cards, quick links, fraud awareness banner

### Design System Requirements
Consistent design system with colors, typography, spacing is mandatory. No ad-hoc or inconsistent UI patterns. Clean, modern layout inspired by tjsbbank.co.in. Mandatory UI elements: Sticky header with navigation and Net Banking CTA, Structured footer with compliance and contact links, Trust indicators (RBI, DICGC, NPCI/RuPay), Accessibility toolbar (contrast, zoom, etc.).

### Security & Data Handling
HTTPS-only implementation is mandatory. No PII storage in browser localStorage. Secure form submission with validation and CAPTCHA required. Net Banking must use standard HTTPS (no port 8444). Rationale: Security is paramount for banking applications handling sensitive user data.

### Non-Functional Requirements (NFR)
The following 17 NFRs must be met with exact metrics:
- Performance: PageSpeed ≥ 90, LCP < 3s on 4G
- Availability: 99.5% monthly uptime
- Security: SSL Labs A-grade, no port 8444
- Accessibility: WCAG 2.1 AA + accessibility toolbar
- Responsive: 320px-1440px breakpoints
- Browser: Latest Chrome, Firefox, Safari, Edge
- i18n: Complete EN/HI translations
- SEO: Unique titles/meta descriptions, structured data
- CMS: <15min content updates
- Analytics: GA4 event tracking
- Privacy: Zero PII in browser storage
- Design: Design system compliance
- Compliance: Zero dark patterns

### Persona-Driven Development
All features must serve 8 defined personas (P1-P8):
- P1 Priya (34, first-time account seeker)
- P2 Ramesh (52, existing member seeking home loan)
- P3 Sunita (45, business owner needing working capital)
- P4 Suresh (48, Hindi-first user)
- P5 Meena (42, complaint filer needing escalation)
- P6 Vikram (35, prospective member)
- P7 Rajesh (60, legal heir searching DEAF)
- P8 Arjun (19, student seeking education loan)
Rationale: Ensures all user segments are served with appropriate solutions.

## Development Workflow

### Critical Compliance Requirements
The following compliance features are non-negotiable and must be enforced:
- DEAF / Unclaimed Deposits page: Must contain data OR explicit "no records" message with last updated date
- Grievance Redressal: 3-level escalation matrix + RBI Ombudsman link (cms.rbi.org.in)
- Key Facts Statement (KFS): Mandatory on all loan pages
- Interest Rates: Complete table including all tenures and categories
- Service Charges: Full fee disclosure
- Privacy Policy: Mandatory and accessible
- Net Banking: Must use standard HTTPS (no port 8444)

### Phase-Based Execution
**Phase 1 (Weeks 1-4): Fix & Foundation**
- Zero broken navigation links
- Net Banking port 8444 retirement
- DEAF page compliance (301 redirect + data/nil statement)
- Grievance Redressal with 3-level escalation
- Interest Rates & Service Charges tables
- Privacy Policy, Careers, Tenders, Download Forms
- Homepage typo corrections
- Footer copyright auto-update

**Phase 2 (Weeks 5-10): Redesign & Content**
- Dual navigation (Personal/Business) implementation
- All 12 personal loan SPs with tabs, KFS, forms
- All 6 business loan SPs with tabs, KFS, forms
- All deposit SPs (Personal + Business)
- All 13 digital services SPs
- EMI Calculator with RBI formula verification
- Homepage redesign (carousel, what's new, cards, quick links)
- Language toggle (EN/HI) with native review
- Accessibility toolbar sitewide
- Policy Centre, Cyber Awareness, Positive Pay
- Membership/Shareholding, Annual Reports

**Phase 3 (Weeks 11-16): Grow & Acquire**
- Branch/ATM interactive maps
- Feedback/Complaint forms with reference numbers
- SEO optimization (titles, meta, structured data)
- GA4 analytics implementation
- What's New content publication
- Optional services (Insurance, Mutual Funds if licensed)
- Site search functionality

**Phase Dependencies**: No Phase 2 features may begin until Phase 1 complete. No Phase 3 features until Phase 2 complete.

### Quality Gates
All code must pass compliance verification before merge. Component testing mandatory. Performance testing required for all pages. Security review mandatory for any form handling or data processing. Accessibility testing required for all UI changes.

### Content Standards
No empty or placeholder pages permitted. All content must be complete, clear, and structured. Product pages must include: Features, eligibility, documents, and application details. Hindi translation required for all key pages. Content should be CMS-manageable.

### Risk Management
The following 10 identified risks must be actively managed:
- R-01: Content bottleneck (High/High) - Single content approver, templates
- R-02: Net Banking port 8444 (High/Medium) - Infrastructure coordination
- R-03: DEAF data unavailable (High/Medium) - Nil statement + CBS extract
- R-04: RBI compliance review (Medium/High) - Legal sign-off required
- R-05: Hindi translation delays (Medium/Medium) - Early translator engagement
- R-06: Design misalignment (Medium/Medium) - Design system first approach
- R-07: Annual Reports unavailable (Medium/Medium) - Management review at kickoff
- R-08: CMS decision delayed (Medium/High) - Week 1 decision required
- R-09: PageSpeed target missed (Low/Medium) - WebP, CDN, lazy loading
- R-10: Brand identity unclear (Low/Medium) - Vector logo request at kickoff

### Dependencies & Constraints
**Dependencies**: Bank management (rates, leadership info), IT team (Net Banking, DEAF data), Legal/Compliance (policy approvals), CMS platform decision, Hindi translator.

**Constraints**: RBI compliance for UCBs, no guaranteed returns representations, no full digital KYC, DPDP Act 2023 compliance, Draft RBI Responsible Business Conduct 2026, IRDAI/SEBI/AMFI compliance for financial products.

## Governance

This constitution supersedes all other development practices and serves as the single source of truth for all design, development, and QA decisions. Amendments require documentation, approval, and migration plan. All PRs and reviews must verify compliance with this constitution. Complexity must be justified with explicit business need. Use project-specific guidance documents for runtime development decisions.

**Version**: 1.1.0 | **Ratified**: 2026-03-23 | **Last Amended**: 2026-03-23
