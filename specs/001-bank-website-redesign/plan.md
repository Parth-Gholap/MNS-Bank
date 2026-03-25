# Implementation Plan: Banking Website Redesign

**Branch**: `001-bank-website-redesign` | **Date**: 2026-03-23 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/001-bank-website-redesign/spec.md`
**Platform**: Next.js (already set up)

## Summary

Complete redesign of Mahanagar Nagrik Sahakari Bank website with 80+ pages across 3 phases, focusing on RBI compliance, bilingual support (English/Hindi), and mobile-first responsive design. The project will implement a component-based React architecture using Next.js, with CMS-managed content, comprehensive banking product pages, self-service tools (EMI calculator), and full regulatory compliance (DEAF, Grievance Redressal, KFS). Phase 1 addresses critical compliance issues, Phase 2 delivers full redesign with all product pages, Phase 3 adds customer acquisition features.

## Technical Context

**Language/Version**: TypeScript 5.x with Next.js 14+ (App Router) 
**Primary Dependencies**: React 18+, TailwindCSS, Next.js i18n, reCAPTCHA, Google Analytics 4, Headless CMS (Strapi/Sanity TBD)
**Storage**: Headless CMS for content, Next.js static/dynamic hosting, CDN for assets
**Testing**: Jest + React Testing Library, Playwright for E2E, Lighthouse for performance
**Target Platform**: Web (mobile-first responsive: 320px-1440px)
**Project Type**: Responsive banking website with 80+ pages
**Performance Goals**: PageSpeed ≥ 90, LCP < 3s on 4G, 99.5% uptime
**Constraints**: WCAG 2.1 AA compliance, RBI banking regulations, no port 8444, HTTPS-only
**Scale/Scope**: 80+ pages, 10 user stories, 17 NFRs, 3-phase delivery over 16 weeks

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Core Principles Compliance

✅ **I. Compliance-First Development**: DEAF, Grievance Redressal, KFS, and all mandatory disclosures specified in Phase 1 deliverables
✅ **II. Zero Broken Links Policy**: Navigation testing specified in US-1 acceptance criteria
✅ **III. Mobile-First Responsive Design**: NFR-08 and NFR-09 define responsive requirements
✅ **IV. Trust-Driven UI Architecture**: Component C-002 includes trust indicators, NFR-17 prohibits dark patterns
✅ **V. Accessibility & Performance Standards**: NFR-01 through NFR-07 define exact metrics
✅ **VI. Bilingual Support**: NFR-10 requires complete EN/HI translations
✅ **VII. Self-Service Enablement**: US-3 and C-010 define EMI calculator requirements
✅ **VIII. Component-Based Architecture**: C-001 to C-014 specifications define exact components
✅ **IX. Detailed Page Inventory Compliance**: Complete page inventory with 80+ pages specified

### Technical Requirements Compliance

✅ **Component Architecture**: React/Next.js with predefined components specified
✅ **Information Architecture Rules**: Dual navigation (Personal/Business) specified
✅ **Global Component Architecture**: C-001 to C-014 provide detailed specifications
✅ **Design System Requirements**: Professional banking theme with trust indicators
✅ **Security & Data Handling**: HTTPS-only, no PII in browser storage specified
✅ **NFRs**: All 17 NFRs with exact metrics incorporated
✅ **Persona-Driven Development**: 8 personas (P1-P8) specified in user stories

### Development Workflow Compliance

✅ **Critical Compliance Requirements**: All compliance features listed in Phase 1
✅ **Phase-Based Execution**: Detailed 3-phase plan with specific deliverables
✅ **Quality Gates**: Testing, security, accessibility reviews specified
✅ **Content Standards**: CMS-manageable content, no empty pages specified
✅ **Risk Management**: 10 identified risks with mitigations included

**GATE STATUS**: ✅ PASS - All constitution requirements addressed in specification

## Project Structure

### Documentation (this feature)

```text
specs/001-bank-website-redesign/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
mnsbankbhopal.com/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── [locale]/           # i18n routing (en/hi)
│   │   │   ├── (layout)/       # Layout groups
│   │   │   │   ├── personal/   # Personal banking pages
│   │   │   │   ├── business/   # Business banking pages
│   │   │   │   ├── about-us/   # About us pages
│   │   │   │   └── compliance/ # Compliance pages
│   │   │   ├── globals.css    # Global styles
│   │   │   └── layout.tsx     # Root layout
│   │   └── api/                # API routes
│   ├── components/             # Reusable components (C-001 to C-014)
│   │   ├── global/            # Header, Footer, Navigation
│   │   ├── product/           # Product page components
│   │   ├── forms/             # Inquiry forms, validation
│   │   ├── calculator/        # EMI calculator
│   │   └── ui/                # UI component library
│   ├── lib/                   # Utilities, configurations
│   │   ├── cms/               # CMS integration
│   │   ├── validations/       # Form validations
│   │   └── utils/             # Helper functions
│   ├── types/                 # TypeScript types
│   ├── styles/                # TailwindCSS, design tokens
│   └── public/                # Static assets
├── content/                   # CMS content (if using static CMS)
├── docs/                      # Additional documentation
├── tests/                     # Test files
├── next.config.js            # Next.js configuration
├── tailwind.config.js        # TailwindCSS configuration
├── package.json              # Dependencies
└── README.md                  # Project documentation
```

## Complexity Tracking

### Technical Complexity
- **Frontend**: High - 80+ pages, bilingual i18n, complex component architecture
- **CMS Integration**: Medium - Headless CMS with approval workflows
- **Performance**: Medium - PageSpeed ≥ 90 optimization required
- **Accessibility**: Medium - WCAG 2.1 AA compliance across all pages
- **Security**: Low-Medium - Standard web security, no complex authentication

### Compliance Complexity
- **RBI Regulations**: High - Multiple compliance requirements (DEAF, KFS, Grievance)
- **Legal Review**: Medium - Policy documents and disclosures require legal sign-off
- **Audit Trail**: Medium - Content change logs and approval workflows

### Operational Complexity
- **Content Management**: High - 80+ pages with regular updates
- **Translation**: Medium - Hindi translation review and maintenance
- **Testing**: Medium - Cross-browser, responsive, accessibility testing

## Dependencies

### External Dependencies
- **Headless CMS**: Strapi or Sanity (decision required Week 1)
- **Analytics**: Google Analytics 4 implementation
- **CAPTCHA**: Google reCAPTCHA v3 integration
- **CDN**: For static asset optimization

### Internal Dependencies
- **Bank Management**: Product rates, eligibility criteria, leadership info
- **IT Team**: Net Banking port resolution, DEAF data export
- **Legal/Compliance**: Policy approvals, compliance sign-offs
- **Content Team**: Product content, Hindi translations

## Risks & Mitigations

### High-Impact Risks
- **R-01**: Content bottleneck - Single content approver, templates
- **R-02**: Net Banking port 8444 - Infrastructure coordination
- **R-03**: DEAF data unavailable - Nil statement + CBS extract
- **R-04**: RBI compliance review - Legal sign-off required

### Medium-Impact Risks
- **R-05**: Hindi translation delays - Early translator engagement
- **R-06**: Design misalignment - Design system first approach
- **R-08**: CMS decision delayed - Week 1 decision required

## Next Steps

### Immediate Actions (Week 1)
1. **CMS Platform Decision**: Evaluate Strapi vs Sanity, select by end of Week 1
2. **Design System Setup**: Create design tokens, component library foundation
3. **Content Kickoff**: Engage content approver, establish templates
4. **Infrastructure Setup**: Configure development environment, CI/CD

### Phase 0 Research Tasks
- Headless CMS evaluation and selection
- Banking industry accessibility best practices
- RBI compliance technical requirements
- Performance optimization for banking websites
- Hindi i18n implementation patterns

---
**Plan Status**: ✅ Complete - Ready for Phase 0 research
**Next Command**: `/speckit.tasks` to generate detailed task breakdown
