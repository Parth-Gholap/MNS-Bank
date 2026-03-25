**BUSINESS & PRODUCT REQUIREMENTS DOCUMENT**

**Website Enhancement Initiative**

Mahanagar Nagrik Sahakari Bank Ltd., Bhopal

*mnsbankbhopal.com*

  -------------------- ---------------------------------------------------
  **Document ID**      BRD/PRD-MNS-2026-01

  **Version**          1.0

  **Date**             March 2026

  **Derived From**     PVD-MNS-2026-01 · FRS-MNS-2026-03 · Design Brief
                       MNS-Website-Design-New-2026.xlsx

  **Reference Site**   https://tjsbbank.co.in/ (UX design reference per
                       client brief)

  **Classification**   Confidential --- Internal Use Only

  **Prepared By**      Digital Enhancement Team

  **Spec Kit Input**   Yes --- structured for direct handoff to
                       development tooling
  -------------------- ---------------------------------------------------

*BRD/PRD-MNS-2026-01 · Confidential · March 2026*

  -------- --------------------------------------------------------------
  **1**    **Executive Summary**

  -------- --------------------------------------------------------------

## 1.1 Purpose

This Business & Product Requirements Document (BRD/PRD) defines the
complete scope, goals, user stories, page inventory, component
specifications, and technical requirements for the redesign and
enhancement of the Mahanagar Nagrik Sahakari Bank (MNS Bank) website at
mnsbankbhopal.com. It is the single source of truth for all design,
development, and QA work on this project and is structured for direct
input to Spec Kit or equivalent specification tooling.

## 1.2 Business Problem

MNS Bank\'s current website fails on three dimensions critical to a
cooperative bank in 2026:

-   Functional incompleteness --- 10+ navigation items lead to empty or
    broken pages, including all Digital Services pages and several Loan
    product pages.

-   Regulatory non-compliance --- The DEAF/Unclaimed Deposits page is
    blank (a mandatory RBI disclosure). No Grievance Redressal page with
    RBI Ombudsman link exists. No KFS (Key Facts Statement) on loan
    pages. Multiple RBI-mandated policy documents are absent.

-   Trust & credibility gap --- Stale copyright (2021), typos on the
    homepage, a non-standard HTTPS port for Net Banking (8444), and no
    Annual Reports or membership information undermine customer
    confidence.

## 1.3 Strategic Objectives

The enhanced website must achieve the following strategic objectives:

1.  Complete every product and service page with accurate, benefit-led
    content.

2.  Achieve full RBI compliance for UCB digital disclosure requirements
    as of March 2026.

3.  Deliver a modern, mobile-first visual design modelled on the
    reference template (tjsbbank.co.in) using MNS Bank\'s own brand
    identity.

4.  Enable digital customer acquisition via inline inquiry forms and
    self-service tools.

5.  Establish SEO foundations and local search presence for Bhopal.

6.  Support both English and Hindi languages across all pages.

## 1.4 Document Lineage

  --------------- ---------------------------------- -------------------------------------
  **Document**    **ID**                             **Role in this Project**

  Product Vision  PVD-MNS-2026-01                    Strategic goals, user personas,
  Document                                           phased roadmap

  Design Brief    MNS-Website-Design-New-2026.xlsx   Site structure (SP/CP), feature list,
                                                     reference template

  Functional      FRS-MNS-2026-03                    Complete FR/NFR set, IA tree, use
  Requirements                                       cases, acceptance criteria
  Specification                                      

  **This          **BRD/PRD-MNS-2026-01**            User stories, page inventory,
  Document**                                         component specs, dev handoff
  --------------- ---------------------------------- -------------------------------------

  -------- --------------------------------------------------------------
  **2**    **Users & Personas**

  -------- --------------------------------------------------------------

The following personas represent the primary and secondary users of the
MNS Bank website. All user stories and UX decisions must be validated
against at least one of these personas.

+---------+-----------+----------------+----------------+------------+
| **Pe    | **        | **Goals on     | **Pain Points  | **Key      |
| rsona** | Profile** | Website**      | (Current       | FRs**      |
|         |           |                | Site)**        |            |
+---------+-----------+----------------+----------------+------------+
| **P1    | F         | Find savings   | Can\'t find    | FR-ACC-01, |
| ---     | irst-time | account        | product        | FR-DEP-02, |
| Priya** | customer. | details,       | content ---    | FR-PROD-03 |
|         | R         | compare rates, | all loan and   |            |
| *34,    | esearches | understand     | deposit pages  |            |
| Account | banks     | opening        | are empty or   |            |
| seeker* | online    | process.       | broken.        |            |
|         | before    |                |                |            |
|         | visiting. |                |                |            |
|         | Mobi      |                |                |            |
|         | le-first. |                |                |            |
+---------+-----------+----------------+----------------+------------+
| **P2    | Long      | Check deposit  | Rates page     | FR-DEP-03, |
| ---     | -standing | rates, apply   | exists but     | F          |
| R       | account   | for loan,      | differential   | R-CALC-01, |
| amesh** | holder.   | calculate EMI. | rates missing. | FR-LOAN-02 |
|         | Wants     |                | EMI calculator |            |
| *52,    | home      |                | is a dead      |            |
| E       | loan.     |                | link.          |            |
| xisting | Checks    |                |                |            |
| member* | rates on  |                |                |            |
|         | desktop.  |                |                |            |
+---------+-----------+----------------+----------------+------------+
| **P3    | Runs a    | Find business  | No Business    | FR-BI      |
| ---     | shop in   | loan options,  | banking        | Z-LOAN-01, |
| S       | TT Nagar. | understand     | section with   | F          |
| unita** | Needs     | eligibility,   | clear product  | R-CONN-03, |
|         | working   | contact        | pages. Contact | FR-CONN-07 |
| *45,    | capital.  | branch.        | info           |            |
| B       | Uses both |                | incomplete.    |            |
| usiness | mobile    |                |                |            |
| owner*  | and       |                |                |            |
|         | desktop.  |                |                |            |
+---------+-----------+----------------+----------------+------------+
| **P4    | Local     | Browse         | No Hindi       | FR-NAV-08, |
| ---     | resident, | products in    | support. Site  | NFR-10     |
| S       | more      | Hindi, fill    | is             |            |
| uresh** | co        | inquiry form   | English-only.  |            |
|         | mfortable | in Hindi.      |                |            |
| *48,    | in Hindi. |                |                |            |
| Hind    | Uses      |                |                |            |
| i-first | mobile    |                |                |            |
| user*   | only.     |                |                |            |
+---------+-----------+----------------+----------------+------------+
| **P5    | Account   | Find grievance | No grievance   | FR-GRP-01  |
| ---     | holder    | process,       | page. No RBI   | to         |
| Meena** | with an   | escalate to    | Ombudsman link | FR-GRP-07  |
|         | u         | RBI Ombudsman  | anywhere on    |            |
| *42,    | nresolved | if needed.     | site.          |            |
| Co      | service   |                |                |            |
| mplaint | c         |                |                |            |
| filer*  | omplaint. |                |                |            |
|         | Wants to  |                |                |            |
|         | escalate. |                |                |            |
+---------+-----------+----------------+----------------+------------+
| **P6    | Community | Understand     | No membership  | FR-MEM-01  |
| ---     | member    | membership     | section exists | to         |
| V       | curious   | benefits,      | anywhere on    | FR-MEM-04  |
| ikram** | about     | eligibility,   | the site.      |            |
|         | joining   | how to join.   |                |            |
| *35,    | the       |                |                |            |
| Pros    | coo       |                |                |            |
| pective | perative. |                |                |            |
| member* |           |                |                |            |
+---------+-----------+----------------+----------------+------------+
| **P7    | Legal     | Search DEAF    | DEAF page      | FR-DEAF-01 |
| ---     | heir      | list,          | exists but has | to         |
| R       | searching | understand     | zero data and  | FR-DEAF-08 |
| ajesh** | for a     | claim process. | broken search. |            |
|         | deceased  |                |                |            |
| *60,    | re        |                |                |            |
| Legal   | lative\'s |                |                |            |
| heir*   | dormant   |                |                |            |
|         | bank      |                |                |            |
|         | account.  |                |                |            |
+---------+-----------+----------------+----------------+------------+
| **P8    | Student   | Find education | No education   | F          |
| ---     | seeking   | loan details,  | loan page      | R-LOAN-01, |
| Arjun** | education | check          | exists.        | FR-LOAN-06 |
|         | loan for  | eligibility,   |                |            |
| *19,    | en        | calculate EMI. |                |            |
| S       | gineering |                |                |            |
| tudent* | college   |                |                |            |
|         | in        |                |                |            |
|         | Bhopal.   |                |                |            |
+---------+-----------+----------------+----------------+------------+

  -------- --------------------------------------------------------------
  **3**    **User Stories**

  -------- --------------------------------------------------------------

User stories follow the format: As a \[persona\], I want to \[goal\], so
that \[benefit\]. Each story includes acceptance criteria and maps to
the FRS-MNS-2026-03.

+-----+---------------+-------------------+--------------+------+-----+
| **I | **Story /     | **Description**   | **Acceptance | **Pr | **P |
| D** | Persona**     |                   | Criteria**   | i.** | has |
|     |               |                   |              |      | e** |
+-----+---------------+-------------------+--------------+------+-----+
| US- | **Fix All     | As any site       | All nav      | **Hi | 1   |
| 001 | Navigation**  | visitor, I want   | items        | gh** |     |
|     |               | every menu link   | resolve to   |      |     |
|     | *All          | to open a real    | content      |      |     |
|     | personas*     | page, so that I   | pages. Zero  |      |     |
|     |               | can find the      | 404s or      |      |     |
|     |               | information I     | blank pages. |      |     |
|     |               | need without dead |              |      |     |
|     |               | ends.             |              |      |     |
+-----+---------------+-------------------+--------------+------+-----+
| US- | **Language    | As a Hindi-first  | EN/HI toggle | **Hi | 2   |
| 002 | Toggle**      | user, I want to   | in header.   | gh** |     |
|     |               | switch the site   | All UI       |      |     |
|     | *P4 ---       | to Hindi, so that | strings and  |      |     |
|     | Suresh*       | I can read all    | product      |      |     |
|     |               | content in my     | content      |      |     |
|     |               | preferred         | available in |      |     |
|     |               | language.         | Hindi.       |      |     |
|     |               |                   | Translation  |      |     |
|     |               |                   | reviewed by  |      |     |
|     |               |                   | native       |      |     |
|     |               |                   | speaker.     |      |     |
+-----+---------------+-------------------+--------------+------+-----+
| US- | **Persistent  | As an existing    | Sticky or    | **   | 2   |
| 003 | Quick Nav**   | member on a long  | floating     | Medi |     |
|     |               | page, I want a    | quick nav    | um** |     |
|     | *P2 ---       | sticky navigation | visible on   |      |     |
|     | Ramesh*       | shortcut, so that | all pages    |      |     |
|     |               | I can jump to key | with working |      |     |
|     |               | sections without  | links to key |      |     |
|     |               | scrolling back to | sections.    |      |     |
|     |               | the top.          |              |      |     |
+-----+---------------+-------------------+--------------+------+-----+
| US- | **Homepage    | As a site         | Carousel     | **Hi | 2   |
| 004 | Carousel**    | visitor, I want   | shows 3+     | gh** |     |
|     |               | to see relevant,  | unique,      |      |     |
|     | *All          | up-to-date        | relevant     |      |     |
|     | personas*     | promotional       | images with  |      |     |
|     |               | content on the    | correct      |      |     |
|     |               | homepage, so that | overlay      |      |     |
|     |               | I am aware of new | text. No     |      |     |
|     |               | products and      | duplicate    |      |     |
|     |               | offers.           | p            |      |     |
|     |               |                   | laceholders. |      |     |
+-----+---------------+-------------------+--------------+------+-----+
| US- | **What\'s New | As a customer, I  | Min. 3       | **Hi | 2   |
| 005 | Section**     | want to see       | entries      | gh** |     |
|     |               | recent bank news  | visible.     |      |     |
|     | *All          | and updates on    | CMS-editable |      |     |
|     | personas*     | the homepage, so  | by           |      |     |
|     |               | that I know the   | n            |      |     |
|     |               | bank is active    | on-technical |      |     |
|     |               | and current.      | staff.       |      |     |
|     |               |                   | D            |      |     |
|     |               |                   | ate-stamped. |      |     |
+-----+---------------+-------------------+--------------+------+-----+
| US- | **Trust Bar** | As a prospective  | DICGC badge, | **Hi | 2   |
| 006 |               | customer, I want  | RBI          | gh** |     |
|     | *P1 ---       | to see trust      | membership,  |      |     |
|     | Priya*        | signals on the    | NPCI/RuPay   |      |     |
|     |               | homepage, so that | logo         |      |     |
|     |               | I know the bank   | visible.     |      |     |
|     |               | is legitimate and | Each links   |      |     |
|     |               | my deposits are   | to the       |      |     |
|     |               | safe.             | respective   |      |     |
|     |               |                   | o            |      |     |
|     |               |                   | rganisation. |      |     |
+-----+---------------+-------------------+--------------+------+-----+
| US- | **Fraud       | As a digital      | Persistent   | **Hi | 2   |
| 007 | Awareness     | banking user, I   | b            | gh** |     |
|     | Banner**      | want to be warned | anner/notice |      |     |
|     |               | about common      | on homepage  |      |     |
|     | *All          | scams, so that I  | and digital  |      |     |
|     | personas*     | can protect       | service      |      |     |
|     |               | myself from UPI   | pages. Links |      |     |
|     |               | fraud, phishing,  | to full      |      |     |
|     |               | and OTP theft.    | Cyber        |      |     |
|     |               |                   | Awareness    |      |     |
|     |               |                   | page.        |      |     |
+-----+---------------+-------------------+--------------+------+-----+
| US- | **Featured    | As a customer, I  | Rates        | **Hi | 1   |
| 008 | Deposit       | want to see       | displayed    | gh** |     |
|     | Rates**       | current deposit   | with tenure  |      |     |
|     |               | rates on the      | labels.      |      |     |
|     | *P2 ---       | homepage, so that | Rates are    |      |     |
|     | Ramesh*       | I can quickly     | editable via |      |     |
|     |               | compare without   | CMS. Rate    |      |     |
|     |               | navigating deep   | disclaimer   |      |     |
|     |               | into the site.    | present.     |      |     |
+-----+---------------+-------------------+--------------+------+-----+
| US- | **Product     | As a customer     | Internal     | **Hi | 2   |
| 009 | Page Tabs**   | browsing a loan   | tabs present | gh** |     |
|     |               | or deposit        | on all       |      |     |
|     | *All          | product, I want   | product SPs. |      |     |
|     | personas*     | the information   | Tab          |      |     |
|     |               | organised in      | switching    |      |     |
|     |               | clear tabs        | does not     |      |     |
|     |               | (Overview /       | require page |      |     |
|     |               | Features /        | reload.      |      |     |
|     |               | Eligibility /     |              |      |     |
|     |               | Documents /       |              |      |     |
|     |               | Apply), so that I |              |      |     |
|     |               | can jump directly |              |      |     |
|     |               | to what I need.   |              |      |     |
+-----+---------------+-------------------+--------------+------+-----+
| US- | **Related     | As a customer on  | 3--4 related | **Hi | 2   |
| 010 | Products**    | a product page, I | items shown  | gh** |     |
|     |               | want to see       | per page.    |      |     |
|     | *P1 ---       | related products  | Au           |      |     |
|     | Priya*        | recommended at    | to-generated |      |     |
|     |               | the bottom of the | by category  |      |     |
|     |               | page, so that I   | where        |      |     |
|     |               | can discover      | possible.    |      |     |
|     |               | other relevant    |              |      |     |
|     |               | offerings.        |              |      |     |
+-----+---------------+-------------------+--------------+------+-----+
| US- | **Inline      | As a customer     | Inline form  | **Hi | 2   |
| 011 | Inquiry       | interested in a   | on every     | gh** |     |
|     | Form**        | product, I want   | pro          |      |     |
|     |               | to submit my      | duct/service |      |     |
|     | *All          | interest directly | SP. Fields   |      |     |
|     | personas*     | from the product  | validated.   |      |     |
|     |               | page, so that I   | CAPTCHA      |      |     |
|     |               | don\'t have to    | present.     |      |     |
|     |               | navigate to a     | Confirmation |      |     |
|     |               | separate form.    | shown on     |      |     |
|     |               |                   | submit.      |      |     |
+-----+---------------+-------------------+--------------+------+-----+
| US- | **Key Facts   | As a loan         | KFS section  | **Hi | 2   |
| 012 | Statement**   | applicant, I want | visible on   | gh** |     |
|     |               | to see a Key      | all 18 loan  |      |     |
|     | *P2 ---       | Facts Statement   | SPs. Shows:  |      |     |
|     | Ramesh*       | on every loan     | rate,        |      |     |
|     |               | page, so that I   | processing   |      |     |
|     |               | can understand    | fee,         |      |     |
|     |               | the total cost of | repayment    |      |     |
|     |               | the loan before   | summary,     |      |     |
|     |               | applying, as      | total cost   |      |     |
|     |               | required by RBI.  | of credit.   |      |     |
+-----+---------------+-------------------+--------------+------+-----+
| US- | **Savings     | As a prospective  | SP live with | **Hi | 2   |
| 013 | Account       | account holder, I | all content  | gh** |     |
|     | Page**        | want a complete   | tabs. Inline |      |     |
|     |               | Savings Account   | form.        |      |     |
|     | *P1 ---       | page, so that I   | Download     |      |     |
|     | Priya*        | understand        | link for     |      |     |
|     |               | features, rates,  | account      |      |     |
|     |               | and how to open   | opening      |      |     |
|     |               | an account.       | form.        |      |     |
+-----+---------------+-------------------+--------------+------+-----+
| US- | **Interest    | As an existing    | Rates CP     | **Hi | 1   |
| 014 | Rates Table** | member, I want a  | accessible   | gh** |     |
|     |               | comprehensive     | from both    |      |     |
|     | *P2 ---       | interest rates    | tabs. All    |      |     |
|     | Ramesh*       | table, so that I  | products and |      |     |
|     |               | can find the rate | tenures      |      |     |
|     |               | for my deposit    | covered. All |      |     |
|     |               | tenure including  | differential |      |     |
|     |               | senior citizen    | categories   |      |     |
|     |               | and staff         | shown.       |      |     |
|     |               | differentials.    | Disclaimer   |      |     |
|     |               |                   | present.     |      |     |
+-----+---------------+-------------------+--------------+------+-----+
| US- | **Personal    | As a prospective  | All 12       | **Hi | 2   |
| 015 | Loan Pages**  | borrower, I want  | personal     | gh** |     |
|     |               | dedicated pages   | loan SPs     |      |     |
|     | *P1 ---       | for all 12        | live with    |      |     |
|     | Priya*        | personal loan     | tabs, KFS,   |      |     |
|     |               | types, so that I  | inline form, |      |     |
|     |               | can understand    | and EMI      |      |     |
|     |               | each product in   | calculator   |      |     |
|     |               | detail.           | link.        |      |     |
+-----+---------------+-------------------+--------------+------+-----+
| US- | **Education   | As a student, I   | SP live with | **Hi | 2   |
| 016 | Loan Page**   | want an Education | full content | gh** |     |
|     |               | Loan page, so     | including    |      |     |
|     | *P8 ---       | that I can        | moratorium   |      |     |
|     | Arjun*        | understand        | period,      |      |     |
|     |               | eligibility,      | courses,     |      |     |
|     |               | moratorium        | i            |      |     |
|     |               | period, and       | nstitutions, |      |     |
|     |               | applicable        | and          |      |     |
|     |               | courses.          | repayment    |      |     |
|     |               |                   | details.     |      |     |
+-----+---------------+-------------------+--------------+------+-----+
| US- | **Business    | As a business     | All 6        | **Hi | 2   |
| 017 | Loan Pages**  | owner, I want     | business     | gh** |     |
|     |               | dedicated pages   | loan SPs     |      |     |
|     | *P3 ---       | for all 6         | live with    |      |     |
|     | Sunita*       | business loan     | tabs, KFS,   |      |     |
|     |               | products, so that | and inline   |      |     |
|     |               | I can find a      | form.        |      |     |
|     |               | product that fits |              |      |     |
|     |               | my working        |              |      |     |
|     |               | capital needs.    |              |      |     |
+-----+---------------+-------------------+--------------+------+-----+
| US- | **EMI         | As a loan         | Calculator   | **Hi | 2   |
| 018 | Calculator**  | applicant, I want | takes Loan   | gh** |     |
|     |               | a real-time EMI   | Amount,      |      |     |
|     | *P2 ---       | calculator, so    | Rate,        |      |     |
|     | Ramesh*       | that I can        | Tenure.      |      |     |
|     |               | determine my      | Updates in   |      |     |
|     |               | monthly repayment | real-time.   |      |     |
|     |               | before applying.  | Shows EMI,   |      |     |
|     |               |                   | total        |      |     |
|     |               |                   | interest,    |      |     |
|     |               |                   | total        |      |     |
|     |               |                   | payable, and |      |     |
|     |               |                   | amortisation |      |     |
|     |               |                   | schedule.    |      |     |
+-----+---------------+-------------------+--------------+------+-----+
| US- | **Fix Net     | As a customer     | Net Banking  | **Hi | 1   |
| 019 | Banking       | wanting to log in | link uses    | gh** |     |
|     | Link**        | to Net Banking, I | standard     |      |     |
|     |               | want a link that  | HTTPS (port  |      |     |
|     | *All          | works without     | 443). No     |      |     |
|     | personas*     | port errors, so   | port 8444 in |      |     |
|     |               | that I can access | any          |      |     |
|     |               | my account        | user-facing  |      |     |
|     |               | securely.         | URL.         |      |     |
+-----+---------------+-------------------+--------------+------+-----+
| US- | **UPI / QR    | As a digital      | UPI/QR SP    | **Hi | 2   |
| 020 | Code Page**   | banking customer, | live with    | gh** |     |
|     |               | I want a UPI      | VPA details, |      |     |
|     | *All          | page, so that I   | how-to       |      |     |
|     | personas*     | can understand    | guide, and   |      |     |
|     |               | and use MNS       | app download |      |     |
|     |               | Bank\'s UPI       | links.       |      |     |
|     |               | services.         |              |      |     |
+-----+---------------+-------------------+--------------+------+-----+
| US- | **BBPS Page** | As a business     | BBPS SP live | **   | 2   |
| 021 |               | customer, I want  | with list of | Medi |     |
|     | *P3 ---       | to pay utility    | supported    | um** |     |
|     | Sunita*       | bills through the | billers,     |      |     |
|     |               | bank, so that I   | how-to       |      |     |
|     |               | can manage all    | guide, and   |      |     |
|     |               | payments in one   | access link. |      |     |
|     |               | place.            |              |      |     |
+-----+---------------+-------------------+--------------+------+-----+
| US- | **Branch &    | As a customer, I  | Interactive  | **   | 3   |
| 022 | ATM Locator** | want an           | map live     | Medi |     |
|     |               | interactive map   | with min. 3  | um** |     |
|     | *P3 ---       | showing all       | branches     |      |     |
|     | Sunita*       | branches and      | (Bairagarhi  |      |     |
|     |               | ATMs, so that I   | HO, TT       |      |     |
|     |               | can find the      | Nagar,       |      |     |
|     |               | nearest one with  | Karond).     |      |     |
|     |               | opening hours.    | Each pin     |      |     |
|     |               |                   | shows        |      |     |
|     |               |                   | address,     |      |     |
|     |               |                   | phone, and   |      |     |
|     |               |                   | hours.       |      |     |
+-----+---------------+-------------------+--------------+------+-----+
| US- | **Contact Us  | As a customer     | All branch   | **Hi | 1   |
| 023 | Page**        | needing to reach  | contacts     | gh** |     |
|     |               | the bank, I want  | live.        |      |     |
|     | *All          | a complete        | General      |      |     |
|     | personas*     | Contact Us page,  | inquiry form |      |     |
|     |               | so that I can     | with         |      |     |
|     |               | find the right    | validation.  |      |     |
|     |               | phone, email, or  | Page live by |      |     |
|     |               | address for my    | Phase 1.     |      |     |
|     |               | query.            |              |      |     |
+-----+---------------+-------------------+--------------+------+-----+
| US- | **Grievance   | As a customer     | Grievance    | **Hi | 1   |
| 024 | Redressal**   | with an           | page with    | gh** |     |
|     |               | unresolved        | 3-level      |      |     |
|     | *P5 ---       | complaint, I want | escalation   |      |     |
|     | Meena*        | a clear           | matrix.      |      |     |
|     |               | escalation path,  | Nodal        |      |     |
|     |               | so that I know    | Officer      |      |     |
|     |               | exactly how to    | details. RBI |      |     |
|     |               | escalate to the   | CMS link     |      |     |
|     |               | RBI Ombudsman if  | (cms.        |      |     |
|     |               | the bank does not | rbi.org.in). |      |     |
|     |               | resolve my issue. | Toll-free    |      |     |
|     |               |                   | 14448.       |      |     |
|     |               |                   | Policy PDF   |      |     |
|     |               |                   | d            |      |     |
|     |               |                   | ownloadable. |      |     |
+-----+---------------+-------------------+--------------+------+-----+
| US- | **Membership  | As a community    | Membership   | **Hi | 2   |
| 025 | Page**        | member, I want to | SP live with | gh** |     |
|     |               | learn how to join | eligibility, |      |     |
|     | *P6 ---       | the cooperative,  | share        |      |     |
|     | Vikram*       | so that I can     | capital,     |      |     |
|     |               | become a          | member       |      |     |
|     |               | shareholder and   | rights,      |      |     |
|     |               | participate in    | downloadable |      |     |
|     |               | the bank\'s       | application  |      |     |
|     |               | governance.       | form.        |      |     |
+-----+---------------+-------------------+--------------+------+-----+
| US- | **Annual      | As a depositor or | Annual       | **Hi | 2   |
| 026 | Reports**     | member, I want to | Reports CP   | gh** |     |
|     |               | see the bank\'s   | live with    |      |     |
|     | *All          | annual reports,   | min. 3 years |      |     |
|     | personas*     | so that I can     | of reports.  |      |     |
|     |               | review its        | Key          |      |     |
|     |               | financial health  | financial    |      |     |
|     |               | before trusting   | highlights   |      |     |
|     |               | it with my money. | summary on   |      |     |
|     |               |                   | page. CRAR   |      |     |
|     |               |                   | and tier     |      |     |
|     |               |                   | cl           |      |     |
|     |               |                   | assification |      |     |
|     |               |                   | shown.       |      |     |
+-----+---------------+-------------------+--------------+------+-----+
| US- | **DEAF Page   | As a legal heir,  | URL          | **Hi | 1   |
| 027 | Compliance**  | I want to search  | corrected.   | gh** |     |
|     |               | a complete and    | Table        |      |     |
|     | *P7 ---       | accurate DEAF     | populated or |      |     |
|     | Rajesh*       | list, so that I   | explicit     |      |     |
|     |               | can identify and  | \'no         |      |     |
|     |               | claim my deceased | accounts\'   |      |     |
|     |               | relative\'s       | statement    |      |     |
|     |               | unclaimed         | shown.       |      |     |
|     |               | deposits.         | Search       |      |     |
|     |               |                   | works.       |      |     |
|     |               |                   | Instructions |      |     |
|     |               |                   | section      |      |     |
|     |               |                   | live. Last   |      |     |
|     |               |                   | Updated      |      |     |
|     |               |                   | timestamp    |      |     |
|     |               |                   | present.     |      |     |
+-----+---------------+-------------------+--------------+------+-----+
| US- | **Policy      | As a customer or  | Policy       | **Hi | 2   |
| 028 | Centre**      | regulator, I want | Centre page  | gh** |     |
|     |               | to access all     | live with:   |      |     |
|     | *All          | bank policies in  | Fair         |      |     |
|     | personas*     | one place, so     | Practices    |      |     |
|     |               | that I can review | Code,        |      |     |
|     |               | the bank\'s       | KYC/CKYC     |      |     |
|     |               | commitments and   | Policy,      |      |     |
|     |               | compliance        | Penal        |      |     |
|     |               | posture.          | Charges,     |      |     |
|     |               |                   | Citizens\'   |      |     |
|     |               |                   | Charter, KFS |      |     |
|     |               |                   | templates    |      |     |
|     |               |                   | --- all      |      |     |
|     |               |                   | d            |      |     |
|     |               |                   | ownloadable. |      |     |
+-----+---------------+-------------------+--------------+------+-----+
| US- | **Cyber       | As a digital      | Cyber        | **Hi | 2   |
| 029 | Awareness     | banking user, I   | Awareness SP | gh** |     |
|     | Page**        | want to learn how | live with    |      |     |
|     |               | to protect myself | phishing,    |      |     |
|     | *All          | from online       | UPI fraud,   |      |     |
|     | personas*     | fraud, so that I  | OTP safety,  |      |     |
|     |               | can safely use    | Report Fraud |      |     |
|     |               | the bank\'s       | section,     |      |     |
|     |               | digital channels. | cyber        |      |     |
|     |               |                   | crime.gov.in |      |     |
|     |               |                   | link.        |      |     |
+-----+---------------+-------------------+--------------+------+-----+
| US- | **Positive    | As a customer     | PPS SP live  | **   | 2   |
| 030 | Pay System**  | issuing large     | with         | Medi |     |
|     |               | cheques, I want   | threshold    | um** |     |
|     | *P2 ---       | to understand     | amount,      |      |     |
|     | Ramesh*       | Positive Pay, so  | how-to       |      |     |
|     |               | that I can        | register     |      |     |
|     |               | protect my        | (Net Banking |      |     |
|     |               | high-value        | / Mobile /   |      |     |
|     |               | cheques from      | branch), and |      |     |
|     |               | fraud.            | RBI circular |      |     |
|     |               |                   | link.        |      |     |
+-----+---------------+-------------------+--------------+------+-----+

  -------- --------------------------------------------------------------
  **4**    **Information Architecture & Page Inventory**

  -------- --------------------------------------------------------------

The following complete page inventory is derived from the client design
brief (MNS-Website-Design-New-2026.xlsx, Structure sheet) and the
benchmark analysis in FRS-MNS-2026-03. SP = Separate Page (unique URL).
CP = Combined Page (shared URL, tabbed content).

> *All SP pages require unique, SEO-friendly URL slugs. All CP pages
> must serve both Personal and Business contexts via clearly labelled
> tabs or sections.*

### Navigation Architecture

The site uses a dual top-level tab structure. Each tab exposes five
consistent sub-navigation categories:

-   Tab 1: Personal Banking → Accounts · Deposits · Loans · Services ·
    Stay Connected

-   Tab 2: Business Banking → Accounts · Deposits · Loans · Services ·
    Stay Connected

-   Shared sections: About Us · Other Services · Compliance & Footer

### Complete Page Inventory

  -------------------------- ----------------- ---------- ----------- -----------------------------
  **URL Slug**               **Page Title**    **Type**   **Phase**   **Content Owner / Notes**

  **ABOUT US**                                                        

  /about-us                  About Us          CP         2           Management --- Bank history,
                                                                      milestones, chairman\'s note

  /board-of-directors        Board of          CP         2           Management --- Names,
                             Directors                                designations, photos

  /committees                Committees        CP         2           Management --- Committee
                                                                      listings

  /management                Management Team   CP         2           Management --- Senior
                                                                      leadership listing

  /annual-reports            Annual Reports &  CP         2           Admin --- Min. 3 years of
                             Financials                               PDFs + key financial
                                                                      highlights

  /membership                Membership /      SP         2           Legal --- Eligibility, share
                             Shareholding                             capital, application form

  /careers                   Careers           SP         1           HR --- Open positions,
                                                                      descriptions, application
                                                                      process

  **PERSONAL BANKING**                                                

  /savings-account           Savings Account   SP         2           Content --- Features, rates,
                                                                      min. balance, opening process

  /double-deposit            Double Deposit    SP         2           Content --- Features, rate,
                                                                      tenure, opening process

  /time-deposit              Time Deposit      SP         2           Content --- Features, rate
                                                                      table, FD maturity details

  /recurring-deposit         Recurring Deposit SP         2           Content --- Features, rate,
                                                                      instalment details

  /gold-loan                 Gold Loan         SP         2           Content --- Features, LTV,
                                                                      eligibility, KFS, inline form

  /car-loan                  Car Loan          SP         2           Content --- Features,
                                                                      eligibility, KFS, inline form

  /consumer-loan             Consumer Loan     SP         2           Content --- Features,
                                                                      eligibility, KFS, inline form

  /personal-loan             Personal Loan     SP         2           Content --- Features,
                                                                      eligibility, KFS, inline form

  /festival-loan             Festival Loan     SP         2           Content --- Features,
                                                                      seasonal terms, KFS, inline
                                                                      form

  /education-loan            Education Loan    SP         2           Content --- Eligibility,
                                                                      courses, moratorium, KFS ---
                                                                      NEW

  /home-loan                 House Purchase    SP         2           Content --- Features, LTV,
                             Loan                                     eligibility, KFS, inline form

  /house-construction-loan   House             SP         2           Content --- Features,
                             Construction Loan                        drawdown schedule, KFS,
                                                                      inline form

  /loan-against-fd           Loan Against      SP         2           Content --- LTV%, eligible
                             FD/RI/RD                                 instruments, KFS

  /loan-against-nsc          Loan Against      SP         2           Content --- Eligible
                             NSC/LIC/KVP                              instruments, LTV%, KFS

  /loan-against-property     Loan Against      SP         2           Content --- LTV%,
                             Property                                 eligibility, KFS, inline form

  /mortgage-overdraft        Mortgage          SP         2           Content --- Features,
                             Overdraft                                eligibility, limit, KFS

  /interest-rates            Interest Rates    CP         1           Content --- Shared with
                                                                      Business. All products by
                                                                      tenure + differentials

  /service-charges           Service Charges   CP         1           Content --- Shared with
                                                                      Business. All fee categories
                                                                      in tables

  /emi-calculator            EMI Calculator    CP         2           Dev --- Shared with Business.
                                                                      Real-time calc + amortisation

  /offers                    Offers            CP         2           Content --- Shared with
                                                                      Business. Date-limited
                                                                      promotions

  **BUSINESS BANKING**                                                

  /current-account           Current Account   SP         2           Content --- Features,
                                                                      eligibility, charges, opening
                                                                      process

  /biz-double-deposit        Business Double   SP         2           Content --- Business-specific
                             Deposit                                  terms where different

  /biz-time-deposit          Business Time     SP         2           Content --- Business-specific
                             Deposit                                  terms where different

  /biz-recurring-deposit     Business          SP         2           Content --- Business-specific
                             Recurring Deposit                        terms where different

  /working-capital-loan      Working Capital   SP         2           Content --- Features,
                             Loan                                     eligibility, KFS, inline form

  /transport-loan            Transport Loan    SP         2           Content --- Features,
                                                                      eligibility, KFS, inline form

  /professional-loan         Professional Loan SP         2           Content --- Features,
                                                                      eligibility, KFS, inline form

  /micro-finance             Micro Finance     SP         2           Content --- Features, SHG/JLG
                                                                      details, KFS, inline form

  /self-employed-loan        Self Employed     SP         2           Content --- Features,
                             Loan                                     eligibility, KFS, inline form

  /overdraft-facility        Overdraft         SP         2           Content --- Features, limits,
                             Facility                                 eligibility, KFS

  **DIGITAL SERVICES**                                                

  /net-banking               Net Banking       SP         1           IT --- Standard HTTPS link.
                                                                      Port 8444 MUST be retired

  /mobile-banking            Mobile Banking    SP         1           IT --- Verified Play Store +
                                                                      App Store links

  /atm                       ATM Services      SP         2           Content --- ATM network,
                                                                      usage guide, limits

  /debit-cards               Debit Cards       SP         2           Content --- Card variants,
                                                                      RuPay network, controls

  /upi-qr                    UPI / QR Code     SP         2           Content/IT --- VPA, QR guide,
                                                                      how-to --- NEW

  /imps                      IMPS              SP         2           Content --- Limits, timings,
                                                                      charges

  /bbps                      BBPS --- Bill     SP         2           Content --- Supported
                             Payments                                 billers, how-to --- NEW

  /sms-banking               SMS Banking       SP         2           Content --- SMS commands,
                                                                      registration --- NEW

  /pan                       PAN Services      SP         2           Content --- PAN application
                                                                      via bank

  /locker                    Locker Services   SP         2           Content --- Sizes, charges,
                                                                      how to apply

  /neft-rtgs                 NEFT / RTGS       SP         2           Content --- Limits, timings,
                                                                      charges

  /pm-jeevan-yojana          PM Jeevan Bima    SP         2           Content --- Scheme details,
                             Yojana                                   premium, coverage, enrolment

  /pm-suraksha-yojana        PM Suraksha Bima  SP         2           Content --- Scheme details,
                             Yojana                                   premium, coverage, enrolment

  **OTHER SERVICES                                                    
  (conditional --- if                                                 
  licensed)**                                                         

  /insurance                 Insurance         SP         3           Legal --- Only if licensed.
                             (Bancassurance)                          Partner insurer, products,
                                                                      SEBI/IRDAI disclaimer

  /mutual-funds              Mutual Funds      SP         3           Legal --- Only if empanelled
                                                                      AMC. AMFI disclaimer
                                                                      mandatory

  /demat                     Demat Account     SP         3           Content --- Only if offered.
                                                                      Charges, how to open

  /asba                      ASBA / IPO        SP         3           Content --- Only if offered.
                             Services                                 Eligible accounts, process

  **STAY CONNECTED**                                                  

  /locate-us                 Locate Us         CP         3           Content --- HO, branches,
                                                                      ATMs overview with map links

  /branch-locator            Branch Locator    CP         3           Dev --- Interactive map. Min.
                                                                      3 branches with full details

  /atm-locator               ATM Locator       CP         3           Dev --- Interactive map. All
                                                                      MNS Bank ATMs

  /ifsc-codes                IFSC Codes        CP         2           Content --- All branch IFSC
                                                                      codes in searchable table

  /tenders                   Tenders           CP         1           Admin --- Active tenders with
                                                                      closing dates + download
                                                                      links

  /feedback                  Feedback /        CP         3           Dev --- Structured form with
                             Complaint                                reference number generation

  /contact-us                Contact Us        CP         1           Content --- All branch
                                                                      contacts, general inquiry
                                                                      form

  **COMPLIANCE & LEGAL                                                
  (footer-linked)**                                                   

  /deaf-unclaimed-deposits   DEAF / Unclaimed  SP         1           IT/Compliance --- 301
                             Deposits                                 redirect from
                                                                      deef-inactive-accounts.php.
                                                                      Populated table or explicit
                                                                      nil statement. Search must
                                                                      work.

  /privacy-policy            Privacy Policy    SP         1           Legal --- Data handling, PDPB
                                                                      compliance

  /grievance-redressal       Grievance         SP         1           Legal --- Escalation matrix,
                             Redressal                                Nodal Officer, RBI CMS link,
                                                                      14448

  /policy-centre             Policy Centre     CP         2           Legal --- Fair Practices
                                                                      Code, KYC, Penal Charges,
                                                                      Citizens\' Charter, KFS
                                                                      templates

  /kyc-ckyc                  KYC / CKYC        SP         2           Content --- KYC process,
                                                                      documents, CKYC number

  /cyber-awareness           Cyber Security &  SP         2           Content/IT --- Phishing, UPI
                             Fraud Awareness                          fraud, OTP safety,
                                                                      cybercrime.gov.in link

  /positive-pay              Positive Pay      SP         2           Content/IT --- PPS threshold,
                             System                                   how to register, RBI circular
                                                                      link

  /download-forms            Download Forms    CP         1           Admin --- All customer forms
                                                                      as PDFs

  /sitemap                   Sitemap           SP         2           Dev --- Full site map,
                                                                      auto-generated or maintained
  -------------------------- ----------------- ---------- ----------- -----------------------------

  -------- --------------------------------------------------------------
  **5**    **Component Specifications**

  -------- --------------------------------------------------------------

The following component specifications define the required UI building
blocks. These are designed as reusable components for the design system
and map directly to development tickets in Spec Kit.

## 5.1 Global Components

### C-001 Global Header

  --------------- -------------------------------------------------------
  **Property**    **Specification**

  Elements        Logo (left) · Language Toggle EN/HI (right of logo) ·
                  Net Banking CTA button (far right) · Primary navigation
                  tabs (Personal / Business) · Hamburger menu on mobile

  Sticky          Header must remain fixed to the top of the viewport on
  behaviour       scroll (position: sticky). On mobile, collapses to
                  hamburger with full-screen drawer.

  Language Toggle Toggles between EN and HI. Persists via localStorage.
                  Applies i18n strings to all visible UI elements and
                  content blocks.

  Net Banking CTA Distinct button style (filled, gold). Links to standard
                  HTTPS portal URL. Must NOT link to port 8444.

  Accessibility   Accessibility toolbar widget adjacent to header: zoom
                  in/out, contrast, invert, greyscale, word spacing,
                  reset.

  FR References   FR-NAV-01, FR-NAV-02, FR-NAV-08, FR-SVC-02, NFR-07
  --------------- -------------------------------------------------------

### C-002 Global Footer

  --------------- -------------------------------------------------------
  **Property**    **Specification**

  Columns         Column 1: About Us links · Column 2: Personal Banking
                  links · Column 3: Business Banking links · Column 4:
                  Compliance & Legal links · Column 5: Contact info +
                  social icons

  Trust bar       Row above footer: DICGC insured badge, RBI membership,
                  NPCI/RuPay logo, Years of service. Each badge links to
                  the respective body\'s website.

  Social Icons    Facebook, Instagram, Twitter/X, LinkedIn, YouTube. All
                  open in new tab.

  Compliance      Privacy Policy, Grievance Redressal, DEAF/Unclaimed
  links           Deposits, Sitemap, Download Forms. All must resolve.

  Copyright       Auto-updates to current year via JavaScript: © {new
                  Date().getFullYear()} Mahanagar Nagrik Sahakari Bank
                  Ltd.

  FR References   FR-NAV-07, FR-HOME-07, FR-HOME-09, FR-COMP-02
  --------------- -------------------------------------------------------

### C-003 Product Page Shell

Every product and service SP must use this standard shell layout:

-   Section 1: Hero banner --- page title, breadcrumb, short
    description, Apply/Enquire CTA

-   Section 2: Internal tab bar --- Overview · Features · Eligibility ·
    Documents · Apply

-   Section 3: Tab content panels (swapped on tab click, no page reload)

-   Section 4: Key Facts Statement panel (loan pages only) --- rate,
    fee, total cost, repayment summary

-   Section 5: Inline inquiry form (collapsed/expandable or always
    visible)

-   Section 6: Related Products grid --- 3--4 cards auto-generated from
    same category

> *Tab format and related products are mandatory on all SPs per
> FR-PROD-01 and FR-PROD-02.*

### C-004 Inline Inquiry Form

  --------------- -------------------------------------------------------
  **Property**    **Specification**

  Fields          Full Name (required) · Mobile Number (required,
                  10-digit Indian validation) · Email (optional) ·
                  Product/Service (pre-filled from page context,
                  dropdown) · Preferred Branch (dropdown: Bairagarhi HO /
                  TT Nagar / Karond) · Message (optional, 250 char max)

  Validation      Client-side + server-side validation. Mobile: regex
                  \^\[6-9\]\\d{9}\$. All required fields highlighted on
                  empty submit.

  CAPTCHA         Google reCAPTCHA v3 (invisible) or equivalent. No bare
                  honeypot-only solution.

  Submission      On success: on-screen confirmation with reference
                  number. Email/SMS confirmation to customer. Submission
                  routed to designated bank email or CRM endpoint.

  PII handling    No PII stored in browser localStorage, sessionStorage,
                  or cookies. All form data sent via HTTPS POST only.

  FR References   FR-FORM-01 to FR-FORM-06, FR-PROD-03, NFR-15
  --------------- -------------------------------------------------------

## 5.2 Homepage Components

### C-005 Homepage Carousel

-   Minimum 3 slides. Each slide: unique full-width image, headline,
    sub-headline, optional CTA button.

-   Auto-play with 5 second interval. Manual prev/next controls. Swipe
    on mobile.

-   All slide content must be CMS-editable by non-technical staff.

-   FR Reference: FR-HOME-01

### C-006 What\'s New Section

-   Displays minimum 3 most recent entries (news articles, rate changes,
    announcements).

-   Each entry: date, category tag, headline, 2-line excerpt, Read More
    link.

-   Entries managed via CMS. Oldest entries automatically hidden when
    new ones are added.

-   FR Reference: FR-HOME-02, FR-HOME-06

### C-007 Product/Services Cards

-   Visually boxed cards in a 3--4 column grid (responsive: 2 on tablet,
    1 on mobile).

-   Each card: icon/image, product name, one-line description, CTA
    button.

-   Two card sets: Personal products, Business products. Visible
    simultaneously or tabbed.

-   FR Reference: FR-HOME-03

### C-008 Quick Links Bar

-   Horizontal row of icon + label links: EMI Calculator · Interest
    Rates · Branch Locator · Download Forms · Contact Us · Grievance
    Redressal.

-   Visible on homepage. May also persist as a floating widget on
    product pages.

-   FR Reference: FR-HOME-04

### C-009 Fraud Awareness Banner

-   Persistent yellow/amber banner near top of homepage and all Digital
    Services pages.

-   Message: warning about phishing, UPI fraud, OTP scams. Dismiss
    button allowed.

-   Links to /cyber-awareness page. Re-appears on next session if
    dismissed.

-   FR Reference: FR-HOME-10, FR-CYBER-04

## 5.3 Self-Service Tool Components

### C-010 EMI Calculator

  --------------- -------------------------------------------------------
  **Property**    **Specification**

  Inputs          Loan Amount: slider + numeric field (₹10,000 --
                  ₹50,00,000). Interest Rate: slider + field (6% -- 24%).
                  Tenure: slider + field with toggle (Months / Years,
                  1--30 years).

  Outputs         Monthly EMI (large display). Total Interest Payable.
                  Total Amount Payable. All update in real-time on input
                  change.

  Amortisation    Year-wise table: Year, Principal Paid, Interest Paid,
                  Total Paid, Outstanding Balance. Exportable to PDF
                  (optional, Phase 3).

  Formula         EMI = \[P × R × (1+R)\^N\] / \[(1+R)\^N -- 1\] where P
                  = Principal, R = monthly rate, N = tenure in months.
                  Must match RBI standard formula.

  CTA             \'Apply for This Loan\' button below results --- links
                  to inline inquiry form for the relevant product (or
                  generic loan inquiry form from calculator standalone
                  page).

  FR References   FR-CALC-01 to FR-CALC-04, US-018
  --------------- -------------------------------------------------------

### C-011 Branch / ATM Locator Map

-   Google Maps embed (or Mapbox alternative). Pins for each branch and
    ATM.

-   On pin click: popup with branch name, full address, phone, email,
    business hours, Get Directions link.

-   Filter toggle: All · Branches · ATMs.

-   FR Reference: FR-CONN-03, FR-CONN-04

## 5.4 Compliance Components

### C-012 KFS Panel (Loan Pages)

-   Displayed as a prominently boxed panel on the Apply tab of every
    loan product SP.

-   Fields: Loan Type · Indicative Interest Rate (% p.a.) · Processing
    Fee · Repayment Tenure · Estimated Monthly EMI (for a standard
    example amount) · Total Cost of Credit (example) · Prepayment
    charges.

-   Static disclaimer: \'Rates are indicative. Actual terms determined
    at sanction based on applicant profile.\'

-   FR Reference: FR-PROD-07, FR-LOAN-03, FR-BIZ-LOAN-02

### C-013 DEAF Search Table

-   Searchable HTML table. Filter input above table: searches Account
    Name, Account Number, Customer ID in real-time.

-   Columns: S.No., Customer ID, GL Code, New AC Number, DEAF New AC
    No., Account Name, Address, State, District, Transaction Date, DEAF
    Amount.

-   If zero records: explicit message \'No accounts have been
    transferred to the DEAF fund as of \[date\].\'

-   Last Updated timestamp displayed prominently above the table.

-   FR Reference: FR-DEAF-01 to FR-DEAF-08

### C-014 Grievance Escalation Matrix

-   Visual three-level matrix displayed as a step diagram or table:

    -   Level 1 --- Branch Manager: Contact details, resolution TAT
        (e.g. 7 working days).

    -   Level 2 --- Nodal Officer / Head Office: Contact details,
        resolution TAT (e.g. 15 working days).

    -   Level 3 --- RBI Integrated Ombudsman: cms.rbi.org.in, toll-free
        14448, available if Level 2 unresolved within 30 days.

-   Nodal Officer name, designation, phone, and email must be displayed
    inline.

-   FR Reference: FR-GRP-01 to FR-GRP-07

  -------- --------------------------------------------------------------
  **6**    **Non-Functional Requirements**

  -------- --------------------------------------------------------------

  -------- --------------- --------------------------------- --------------------
  **ID**   **Category**    **Requirement**                   **Acceptance
                                                             Metric**

  NFR-01   Performance     Homepage Google PageSpeed         PageSpeed score ≥ 90
                           Insights score ≥ 90 on mobile.    

  NFR-02   Performance     All pages must fully load within  LCP \< 3s on
                           3 seconds on a standard 4G mobile simulated 4G
                           connection (simulated             
                           throttling).                      

  NFR-03   Availability    Site must maintain 99.5% uptime   99.5% monthly uptime
                           per month, excluding communicated 
                           maintenance windows.              

  NFR-04   Security        All pages served over HTTPS with  SSL Labs: A-grade
                           valid SSL certificate. HTTP must  
                           301-redirect to HTTPS.            

  NFR-05   Security        No non-standard HTTPS port (e.g.  Zero instances in
                           8444) in any user-facing link.    codebase
                           Net Banking must use port 443.    

  NFR-06   Accessibility   All pages must conform to WCAG    WCAG audit: 0
                           2.1 Level AA guidelines.          critical errors

  NFR-07   Accessibility   An on-page accessibility toolbar  Toolbar QA pass on 5
                           must be present sitewide: zoom    browsers
                           in/out, contrast toggle, invert,  
                           greyscale, word spacing, reset.   

  NFR-08   Responsive      All pages must render correctly   Visual QA at 5
                           and be fully functional at:       breakpoints
                           320px, 480px, 768px, 1024px, and  
                           1440px breakpoints.               

  NFR-09   Browser         Must function correctly on:       Cross-browser QA
                           Chrome, Firefox, Safari, Edge     checklist
                           (latest 2 versions each), Chrome  
                           for Android.                      

  NFR-10   i18n            All UI strings, product content,  Translation review
                           and compliance notices must be    sign-off
                           available in English and Hindi.   
                           Hindi translations reviewed by    
                           native speaker before go-live.    

  NFR-11   SEO             Every page must have a unique     SEO audit tool score
                           \<title\> (max 60 chars) and      ≥ 80
                           \<meta description\> (max 160     
                           chars). sitemap.xml submitted to  
                           Google Search Console.            

  NFR-12   SEO             LocalBusiness structured data     Google Rich Results
                           (JSON-LD) with correct NAP for    Test: pass
                           each branch. BreadcrumbList       
                           schema on all inner pages.        

  NFR-13   CMS             All product content, rates,       Content update time
                           charges, news, and policy         \< 15 min
                           documents must be editable by     
                           non-technical staff via CMS admin 
                           panel without developer           
                           involvement.                      

  NFR-14   Analytics       Google Analytics 4 (or            GA4 debug mode: all
                           equivalent) installed on all      events firing
                           pages. Events tracked: pageview,  
                           form_submit, cta_click,           
                           calculator_use, language_toggle.  
                           Verified before go-live.          

  NFR-15   Privacy         Forms must not store PII in       Security code review
                           browser cookies, localStorage, or pass
                           sessionStorage. All form          
                           submissions via HTTPS POST.       
                           CAPTCHA on all public forms.      

  NFR-16   Design          All pages must adhere to the      Design review
                           defined design system (colours,   sign-off per page
                           typography, spacing, component    
                           library). No ad-hoc inline        
                           styling deviating from the        
                           system.                           

  NFR-17   Compliance      Website UI must not employ dark   Legal + design
                           patterns (pre-ticked checkboxes,  review sign-off
                           hidden fees, misleading CTAs,     
                           bundled consents) per Draft RBI   
                           Responsible Business Conduct      
                           Amendment Directions 2026.        
  -------- --------------- --------------------------------- --------------------

  -------- --------------------------------------------------------------
  **7**    **Phased Delivery Plan**

  -------- --------------------------------------------------------------

The project is structured across three phases. Each phase has a defined
scope, delivery checklist, and sign-off criteria. Phase 1 is focused on
compliance and critical fixes; Phases 2 and 3 build the full product.

## 7.1 Phase 1 --- Fix & Foundation (Weeks 1--4)

> *Goal: Remove all regulatory violations and critical usability
> failures. Site must be legally compliant by end of Phase 1.*

  ----------------------------------- ------------------ -----------------
  **Deliverable**                     **Owner**          **Acceptance
                                                         Test**

  Zero broken navigation links ---    Dev                Automated link
  all menu items resolve to content                      checker: 0 errors
  pages                                                  

  Net Banking link uses standard      IT                 Curl request to
  HTTPS port 443 --- port 8444                           port 8444 returns
  retired                                                error

  Homepage typos corrected            Content            Manual
  (Priviledges, Mahanager)                               proofreading
                                                         sign-off

  Google Play Store link verified and IT                 Link resolves to
  active                                                 live app listing

  Footer copyright auto-updates to    Dev                JavaScript
  current year                                           renders correct
                                                         year

  Interest Rates page live with all   Content            All tenures, all
  differential categories                                differentials
                                                         visible

  Service Charges page live with      Content            All fee
  complete fee table                                     categories
                                                         present

  DEAF page URL corrected with 301    Dev                301 redirect
  redirect                                               verified

  DEAF table populated OR explicit    IT/Compliance      No blank table
  nil statement displayed                                without message

  DEAF search function operational    Dev                Search filters
                                                         table in
                                                         real-time

  Grievance Redressal page live ---   Legal/Content      All elements
  escalation matrix, Nodal Officer,                      verified on page
  RBI CMS link (cms.rbi.org.in),                         
  toll-free 14448                                        

  Careers page live with current      HR                 At least 1 live
  openings                                               posting

  Tenders page live with active       Admin              Active tenders
  tenders                                                listed with
                                                         closing dates

  Download Forms page live with all   Admin              All forms
  current forms as PDFs                                  downloadable

  Privacy Policy page live            Legal              Legal sign-off
                                                         obtained
  ----------------------------------- ------------------ -----------------

## 7.2 Phase 2 --- Redesign & Content (Weeks 5--10)

> *Goal: Full visual redesign, all product pages live, all tools
> operational, all compliance content published.*

-   Dual tab navigation (Personal / Business) implemented per IA --- 5
    sub-nav categories per tab

-   All 12 personal loan SPs live with tabs, KFS, inline form, EMI
    calculator link

-   All 6 business loan SPs live with tabs, KFS, and inline form

-   All deposit SPs live: 3 Personal + 3 Business

-   Savings Account and Current Account SPs live

-   All 13 digital services SPs live including UPI/QR, BBPS, SMS Banking

-   EMI Calculator live and verified against RBI formula

-   Homepage redesigned: carousel, What\'s New, Product Cards, Quick
    Links, trust bar, fraud banner

-   Language toggle (EN/HI) in header sitewide --- Hindi translations
    reviewed

-   Accessibility toolbar live and functional on all pages

-   Social media links live for all 5 platforms

-   DICGC badge sitewide

-   Membership / Shareholding SP live

-   Annual Reports CP live with minimum 3 years of reports

-   Policy Centre CP live: Fair Practices Code, KYC/CKYC, Penal Charges,
    Citizens\' Charter, KFS templates

-   Cyber Security & Fraud Awareness SP live

-   DEAF instructions section live with claim process

-   Positive Pay System SP live

-   KFS panel visible on all 18 loan product pages

-   PageSpeed Insights mobile score ≥ 90

-   WCAG 2.1 AA audit passed

-   Zero dark patterns confirmed in design review

## 7.3 Phase 3 --- Grow & Acquire (Weeks 11--16)

> *Goal: Add customer acquisition flows, locators, SEO, analytics, and
> optional value-added services.*

-   Branch Locator interactive map live --- min. 3 branches correctly
    pinned

-   ATM Locator interactive map live

-   Feedback / Complaint form live with reference number generation

-   Loan Inquiry Form live with CRM routing and email/SMS confirmation

-   All pages have unique \<title\> and \<meta description\> tags

-   sitemap.xml submitted to Google Search Console and indexed

-   LocalBusiness structured data passes Google Rich Results Test

-   GA4 live and tracking pageviews, form_submit, cta_click,
    calculator_use, language_toggle events

-   What\'s New / News section: minimum 4 published posts

-   Insurance, Mutual Funds pages live if bank is licensed

-   Site search functional in header

  -------- --------------------------------------------------------------
  **8**    **Risks & Mitigations**

  -------- --------------------------------------------------------------

  -------- -------------------- ------------ ----------- -------------------------------- ------------------
  **ID**   **Risk**             **Impact**   **Prob.**   **Mitigation**                   **Owner**

  R-01     Content bottleneck   **High**     High        Appoint single content approver. Management
           --- product rates                             Create content brief templates.  
           and eligibility data                          Set hard deadlines with          
           not supplied by bank                          management. Unblocked content =  
           management in time                            blocked development.             

  R-02     Net Banking port     **High**     Medium      Use reverse proxy or subdomain   IT
           8444 requires                                 redirect                         
           infrastructure                                (netbanking.mnsbankbhopal.com)   
           change outside                                on main domain as short-term fix 
           website team control                          while infrastructure is updated. 

  R-03     DEAF table data      **High**     Medium      Display explicit nil statement   IT/Compliance
           unavailable from CBS                          immediately. IT to provide CBS   
           --- compliance gap                            data extract within Phase 1      
           persists post Phase                           window. Escalate to compliance   
           1                                             officer if blocked.              

  R-04     RBI compliance       **Medium**   High        Scope Phase 3 value-added        Legal
           review required for                           services as inquiry/interest     
           online forms                                  forms only --- not full          
           (bancassurance,                               applications. Legal sign-off     
           mutual funds)                                 required before any financial    
                                                         product form goes live.          

  R-05     Hindi translations   **Medium**   Medium      Engage Hindi translator at start Content
           delayed or quality                            of Phase 2, not end. Provide EN  
           insufficient                                  content 2 weeks before Phase 2   
                                                         deadline. Native speaker review  
                                                         is mandatory gate for launch.    

  R-06     Design-development   **Medium**   Medium      Define design system (colours,   Designer/Dev
           misalignment across                           typography, spacing tokens,      
           pages                                         component library) before coding 
                                                         any pages. All components built  
                                                         from system, not bespoke per     
                                                         page.                            

  R-07     Annual Reports       **Medium**   Medium      Legal and management to review   Management/Legal
           unavailable or not                            and approve reports for web      
           approved for                                  publication at project kickoff.  
           publication                                   Start with most recent year if   
                                                         older reports are in dispute.    

  R-08     CMS platform         **Medium**   High        CMS decision must be made in     IT
           decision delayed ---                          Week 1 of the project.           
           blocks content                                Recommended: headless CMS        
           editability                                   (Strapi/Sanity) or WordPress     
                                                         with custom theme. No custom PHP 
                                                         without admin panel.             

  R-09     Google PageSpeed     **Low**      Medium      Use WebP format, lazy loading,   Dev
           target (90) not met                           CDN for all images. Defer        
           on mobile due to                              non-critical JS. Test with       
           image-heavy homepage                          PageSpeed throughout Phase 2,    
                                                         not only at end.                 

  R-10     Brand identity       **Low**      Medium      Request vector logo, brand       Designer
           unclear --- no brand                          colour codes, and approved       
           guidelines provided                           font(s) at project kickoff. If   
                                                         none available, design team to   
                                                         create minimal brand style guide 
                                                         as Phase 2 prerequisite.         
  -------- -------------------- ------------ ----------- -------------------------------- ------------------

  -------- --------------------------------------------------------------
  **9**    **Assumptions, Dependencies & Constraints**

  -------- --------------------------------------------------------------

## 9.1 Assumptions

7.  The bank holds rights to all images, logos, and content to be
    published on the website.

8.  All interest rates and fees published will be approved by bank
    management and comply with RBI guidelines before publication.

9.  A designated content approver will be nominated by bank management
    before Phase 2 begins to review and sign off all product page
    content.

10. Online loan applications (full digital processing) are out of scope.
    Phase 3 covers inquiry/interest forms only, pending RBI compliance
    review for cooperative banks.

11. The existing domain (mnsbankbhopal.com) and hosting contract will be
    retained for the project duration.

12. \'Other Services\' pages (Insurance, Mutual Funds, Demat, ASBA) will
    only be built and published for services MNS Bank is currently
    licensed or empanelled to offer.

13. The Grievance Redressal Policy document exists internally and will
    be provided by the Legal/Compliance team for web publication by end
    of Week 1.

14. The reference design template (tjsbbank.co.in) is a UX/layout
    reference only. MNS Bank\'s own brand identity will be used
    throughout.

## 9.2 Dependencies

-   Bank management: all product interest rates, eligibility criteria,
    board/leadership info, branch photos, vector logo assets, social
    media account URLs, and Annual Report PDFs.

-   IT team: Net Banking port 8444 resolution or proxy before Phase 1
    sign-off; verified Google Play Store app link; DEAF account data
    export from CBS.

-   Legal/Compliance team: review and approval of rate disclosures, DEAF
    page, Privacy Policy, Grievance Redressal Policy, Fair Practices
    Code, KYC Policy, KFS templates, Citizens\' Charter, and all
    bancassurance/mutual fund disclaimers.

-   CMS/hosting platform decision: must be finalised in Week 1 before
    Phase 2 development begins.

-   Hindi translator: engaged and briefed by start of Phase 2.

## 9.3 Constraints

-   All financial disclosures must comply with RBI guidelines for Urban
    Cooperative Banks (Tier 1 / Tier 2 as applicable).

-   Website must not make representations about guaranteed returns or
    violate RBI advertising regulations.

-   Full digital KYC / online account opening is excluded from scope
    until regulatory compliance is confirmed.

-   Any collection of customer PII via forms must comply with applicable
    Indian data protection legislation (DPDP Act 2023).

-   All UI/UX must comply with the Draft RBI Responsible Business
    Conduct Amendment Directions 2026 --- no dark patterns, no bundled
    consents, no misleading CTAs.

-   Insurance and mutual fund pages may only be published with prior
    IRDAI/SEBI/AMFI compliance sign-off.

  -------- --------------------------------------------------------------
  **10**   **Sign-Off & Approvals**

  -------- --------------------------------------------------------------

This BRD/PRD requires sign-off from the following stakeholders before
development commences. Phase-specific sign-offs are required before each
phase begins.

## 10.1 Document Sign-Off

  ---------------------- ------------------ ---------------- -------------
  **Stakeholder**        **Role**           **Signature**    **Date**

  \[Name\]               Bank CEO / MD                       

  \[Name\]               IT Head                             

  \[Name\]               Content Approver                    

  \[Name\]               Legal / Compliance                  

  \[Name\]               Project Manager                     
  ---------------------- ------------------ ---------------- -------------

## 10.2 Phase Sign-Off Gates

  ----------- ------------------------------ ------------------ ------------
  **Phase**   **Gate Condition**             **Approver**       **Sign-off
                                                                Date**

  Phase 1     All Phase 1 acceptance         CEO + IT Head +    
              criteria met (Section 7.1).    Legal              
              Zero RBI compliance violations                    
              outstanding.                                      

  Phase 2     All Phase 2 acceptance         CEO + PM +         
              criteria met. PageSpeed ≥ 90.  Designer           
              WCAG AA passed. Zero dark                         
              patterns.                                         

  Phase 3     All Phase 3 acceptance         CEO + PM + IT Head 
              criteria met. GA4 tracking                        
              verified. SEO audit ≥ 80.                         
              Forms routing confirmed.                          
  ----------- ------------------------------ ------------------ ------------

*Mahanagar Nagrik Sahakari Bank Ltd. · Bhopal · BRD/PRD-MNS-2026-01 ·
Confidential · March 2026*
