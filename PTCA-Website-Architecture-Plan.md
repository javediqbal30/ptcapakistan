# PTCA Website: Master Architecture & SEO + GEO Plan
**Prime Tax & Corporate Academy (PTCA), Karachi, Pakistan**
Version 1.1 | Prepared: 10 April 2026 | Status: Planning (no code yet)

> This plan covers the whole website: brand, information architecture, page blueprints, tech stack, SEO for Pakistan, GEO (Generative Engine Optimization), local SEO for Karachi, performance, security, analytics, launch and growth. It is split into phases.
> **Rule:** Do not invent facts. Fees, batch dates, unconfirmed mentors, the Director's Message and the IPO curriculum stay as "Confirm with Admissions" until PTCA confirms them in writing.

---

## Table of Contents
0. Critical Decisions Before Development
1. Phase 1: Discovery, Brand & Content Audit
2. Phase 2: Information Architecture & URL Structure
3. Phase 3: Keyword Strategy (Pakistan-Focused)
4. Phase 4: UX/UI Design System
5. Phase 5: Page-by-Page Blueprints
6. Phase 6: Technical Architecture & Stack
7. Phase 7: Technical SEO
8. Phase 8: GEO (AI Search Optimization)
9. Phase 9: Local SEO (Karachi + Pakistan)
10. Phase 10: Content Marketing & Knowledge Hub
11. Phase 11: Conversion, Admissions & CRM
12. Phase 12: Performance, Accessibility & Security
13. Phase 13: Analytics & Tracking
14. Phase 14: QA, Launch & Migration (301 redirects)
15. Phase 15: Post-Launch Growth (90-day roadmap)
16. Appendices: checklists, schema samples, missing data list
17. Enrollment Form Specification: "Enroll Now" flow & required student data (single source of truth)

---

## 0. Critical Decisions Before Development

| # | Decision | Recommendation |
|---|----------|----------------|
| 1 | **Brand name conflict.** The site says "Pakistan Tax & Corporate Academy". The logo and footer say "Prime Tax & Corporate Academy". | Use **one legal name everywhere**: "Prime Tax & Corporate Academy (PTCA)". Keep "Pakistan" as a descriptor, e.g. "PTCA, Pakistan's practical tax & corporate academy". Search engines and AI models treat a name mismatch as a different entity, which damages trust (E-E-A-T and entity SEO). |
| 2 | Domain | Keep `ptcapakistan.pk`. Force `https://` and no `www` (or the reverse), never both. |
| 3 | Languages | Phase A: English (primary, because professionals search in English). Phase B: Urdu pages for the top 6 courses at `/ur/...` with `hreflang`. Roman Urdu keywords go into FAQs and blog posts, not into URLs. |
| 4 | CMS | A headless setup so admissions staff can update batches, fees and mentors without a developer (see Phase 6). |
| 5 | Fees display | Show "Fee: Contact Admissions" plus a WhatsApp CTA until real fees are approved. |
| 6 | Course naming | Fix the inconsistencies: "Advanced Certificate in Taxation & Litigation" vs "Certificate in Advance Taxation". Also, the Foundation course page lists eligibility as "Advocates..." and copies the Advanced course text, so it needs a rewrite. The IPO course is called both "Attorney" and "Officer". |

---

## 1. Phase 1: Discovery, Brand & Content Audit (Week 1)

### 1.1 Brand Identity (from the logo)
- **Primary Green:** `#22A74A` (laurel wreath and banner)
- **Charcoal Grey:** `#6B6B6B` (globe)
- **Ink Black:** `#111111` (wordmark)
- **White:** `#FFFFFF`
- **Suggested accent:** Deep Green `#0E5C2F` for hovers and dark sections. A gold `#C9A227` can be used sparingly for "certificate" badges only.
- **Logo meaning:** the laurel stands for achievement and certification, the globe for local plus international taxation, and the three stars for the "Learn. Practice. Progress." motto. Use this story on the About page.
- **Deliverables:** SVG logo (full, horizontal, icon-only), a favicon set (16/32/180/512), a 1200×630 OG image template, and a white-on-green variant for dark backgrounds.

### 1.2 Typography
- Headings: **Plus Jakarta Sans** or **Manrope** (700/800)
- Body: **Inter** (400/500)
- Urdu: **Noto Nastaliq Urdu** (only on `/ur` pages)
- Self-host fonts with `font-display: swap`.

### 1.3 Tone of Voice
Professional, practical and confident, with no hype. Use "practical", "job-ready", "FBR-compliant" and "career-focused" often, because they match search intent.

### 1.4 Content Audit Result
| Content | Status | Action |
|---|---|---|
| Home / About / Mission / Vision | Available | Rewrite for SEO |
| 6 course listings | Available | Expand to 1,500+ words each |
| Advanced Tax, Sales Tax, CHRP, Company Secretary curricula | Available | Add FAQs and outcomes |
| Foundation course | Copied text | **Rewrite needed** |
| IPO course curriculum | Missing | **Get from PTCA** |
| Mentors: Zohaib Akhtar, Rukhsana Rustam Khan | Available | Add photos, LinkedIn, schema |
| Mentors for each course | Partly placeholders | Map only confirmed mentors |
| Director's Message | Placeholder | **Get from PTCA or hide the section** |
| Fees / batches | Not public | Use a CMS field with a "Contact" fallback |
| Testimonials, student photos, certificates | Missing | **Collect real ones with written consent** |
| Google Business Profile | Unknown | Create or claim (Phase 9) |

---

## 2. Phase 2: Information Architecture & URL Structure (Week 1–2)

### 2.1 Sitemap
```text
/                                   Home
/about/                             About PTCA (Mission, Vision, Approach, Who We Serve)
/courses/                           All Courses (filterable)
  /courses/advanced-taxation-litigation-course/
  /courses/sales-tax-course-pakistan/              (Certified Sales Tax Specialist)
  /courses/chrp-hr-course-karachi/                 (CHRP)
  /courses/company-secretary-course-pakistan/
  /courses/foundation-tax-corporate-course/
  /courses/intellectual-property-course-pakistan/  (IPO)
/mentors/
  /mentors/zohaib-akhtar/
  /mentors/rukhsana-rustam-khan/
/admissions/                        How to enrol, modes, process, FAQ
/batches/                           Upcoming batches (CMS-driven; hide if empty)
/resources/                         Knowledge Hub (blog)
  /resources/category/income-tax/
  /resources/category/sales-tax/
  /resources/category/corporate-secp/
  /resources/category/hr/
  /resources/category/careers/
/glossary/                          Pakistan tax terms (GEO asset)
/faq/                               Master FAQ
/contact/                           Contact + map + enquiry form
/verify-certificate/                Certificate verification (Phase 15)
/privacy-policy/  /terms/  /refund-policy/
/ur/ ...                            Urdu versions (Phase B)
/sitemap.xml  /robots.txt  /llms.txt
```

### 2.2 URL Rules
- Lowercase, hyphenated, keyword-first, with a trailing slash. No dates in blog URLs.
- Use a **flat** depth of at most 3 levels.
- Every old URL gets a 301 redirect to its new URL (see Phase 14).

### 2.3 Navigation
- **Header:** Logo | Home | About | Courses (mega-menu with 6 courses in 3 categories: Taxation, Corporate, HR) | Mentors | Resources | Contact | **[Enroll Now]** button | WhatsApp icon
- **Top bar (desktop):** +92 310 5070070 | info@ptcapakistan.pk | PECHS, Karachi
- **Mobile:** a sticky bottom bar with Call | WhatsApp | Enroll
- **Footer:** about text, Quick Links, Courses, Contact with NAP, Social links, map link, legal links, copyright year

### 2.4 Internal Linking Model (Hub & Spoke)
- **Hubs:** `/courses/` and each course page.
- **Spokes:** blog articles link to the matching course with descriptive anchor text, e.g. "learn sales tax return filing in our Certified Sales Tax Specialist course".
- Each course page links to its mentor(s), 2 related courses, 3 related articles and the admissions page.

---

## 3. Phase 3: Keyword Strategy, Pakistan-Focused (Week 2)

> Validate the numbers with Google Keyword Planner (location: Pakistan / Karachi), Ahrefs/Semrush and Google Search Console. The intent shown here is planned, not measured.

### 3.1 Primary Keyword Map (one primary keyword per page, to avoid cannibalisation)
| Page | Primary Keyword | Secondary / LSI Keywords |
|---|---|---|
| Home | tax academy in Pakistan | taxation courses Karachi, tax and corporate training Pakistan, professional tax course |
| About | tax training institute Karachi | PTCA Karachi, practical tax education Pakistan |
| Courses | taxation courses in Pakistan | tax courses online Pakistan, corporate law courses, short courses Karachi |
| Advanced Tax & Litigation | tax litigation course Pakistan | income tax course, tax appeal drafting, show cause notice reply, Commissioner Appeals, ATIR, section 147 advance tax |
| Sales Tax | sales tax course in Pakistan | FBR sales tax return filing course, STRN registration, IRIS training, Annexure C, Sindh sales tax (SRB), PRA, e-invoicing FBR |
| CHRP | CHRP course in Karachi | HR certification Pakistan, HR course online Pakistan, payroll course, HR diploma Karachi |
| Company Secretary | company secretary course Pakistan | SECP compliance course, corporate secretarial practice, eServices SECP training, corporate governance course |
| Foundation | tax course for beginners Pakistan | basic taxation course, income tax return filing course, FBR course for beginners |
| IPO | intellectual property course Pakistan | trademark registration course, IPO Pakistan training, IP law course Karachi |
| Mentors | tax trainer Karachi | Zohaib Akhtar taxation, Rukhsana Rustam Khan corporate affairs |
| Contact | PTCA Karachi contact | tax academy PECHS, Shahrah-e-Faisal institute |

### 3.2 Local-Modifier Keywords (Karachi + Pakistan)
- "[course] in Karachi", "[course] near PECHS / Shahrah-e-Faisal / Gulshan / DHA / Clifton"
- "[course] online Pakistan" for national reach (Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, Hyderabad, Quetta)
- City landing pages (Phase 15 only, **only for online delivery**): `/online-tax-course-lahore/` etc., each with **unique** content. No doorway or spam pages.

### 3.3 Roman Urdu / Urdu Long-Tail (for FAQs and blogs)
- "tax ka course kahan se karein Karachi", "sales tax return kaise file karein"
- "FBR notice ka jawab kaise dein", "income tax return file karne ka tareeqa"
- "HR course ki fees Karachi", "company register kaise karein SECP"
- Urdu script: "ٹیکس کورس کراچی", "سیلز ٹیکس ریٹرن", "انکم ٹیکس ریٹرن فائل کرنے کا طریقہ"

### 3.4 Informational Keywords (Knowledge Hub)
- how to file income tax return in Pakistan 2026 (step by step, IRIS)
- active taxpayer list (ATL), and filer vs non-filer
- how to register for sales tax (STRN) in Pakistan
- section 114 / 122 / 137 / 147 / 161 notices: what they mean and how to reply
- how to appeal to the Commissioner Inland Revenue (Appeals)
- Sindh Revenue Board (SRB) vs FBR sales tax on services
- withholding tax rates card (update every budget)
- how to register a company with SECP (SMC / Private Ltd)
- annual return Form A / Form 29 filing with SECP
- beneficial ownership declaration SECP
- trademark registration process with IPO Pakistan
- HR policies required by Pakistani labour law; EOBI and SESSI basics
- careers: "tax consultant salary in Pakistan", "how to become a tax consultant in Pakistan"

### 3.5 Seasonal Calendar (Pakistan tax cycle)
| Month | Content push |
|---|---|
| June | Federal Budget explainers and Finance Bill changes |
| July–Sept | Income tax return filing season (deadline usually 30 Sept). This is the **biggest traffic window**. |
| Monthly (15th / 18th) | Sales tax return reminders |
| Oct–Nov | SECP annual return and AGM season |
| Jan / Aug | New batch intake campaigns |

---

## 4. Phase 4: UX/UI Design System (Week 2–3)

### 4.1 Design Principles
1. **Trust first:** real faces, a real address, real credentials and certificates.
2. **Clarity:** each course page answers "What, Who, How long, Mode, Outcome, Career, Next step" above the fold.
3. **Mobile-first:** more than 75% of Pakistani traffic is on mobile, so design for 360px first.
4. **WhatsApp-native:** it is the primary conversion channel in Pakistan.
5. **Low bandwidth:** keep each page under 1 MB and keep LCP under 2.5s on 4G.

### 4.2 Design Tokens
```text
Colors:  --green-600 #22A74A  --green-800 #0E5C2F  --grey-600 #6B6B6B
         --ink #111111  --bg #FFFFFF  --bg-soft #F5F8F6  --gold #C9A227
Radius:  8 / 12 / 20px     Spacing scale: 4-8-12-16-24-32-48-64-96
Type:    H1 40-56 / H2 32-40 / H3 22-26 / Body 16-18 / line-height 1.6
Shadow:  0 8px 24px rgba(17,17,17,.06)
Grid:    12 columns, max-width 1240px, gutter 24px
```

### 4.3 Component Library
Button (primary, secondary, WhatsApp) · CourseCard · MentorCard · StatCounter · Steps (Understand to Practise to Apply) · Accordion (FAQ, Curriculum) · Tabs · Breadcrumbs · TestimonialCard · CTA Banner · EnquiryForm · Badge (Online / Physical / Hybrid) · Sticky Course Sidebar · MegaMenu · Footer · Toast · Cookie notice

### 4.4 Motion
Subtle only: 200-300ms fades, and respect `prefers-reduced-motion`. No heavy sliders on the hero.

---

## 5. Phase 5: Page-by-Page Blueprints (Week 3–4)

### 5.1 Home `/`
- **Title (max 60):** `Tax & Corporate Courses in Karachi, Pakistan | PTCA`
- **Meta (max 155):** `Practical taxation, sales tax, tax litigation, CHRP & company secretary courses in Karachi. Online, physical & hybrid. Enroll at PTCA today.`
- **Sections:**
  1. **Hero.** H1 "Develop Practical Tax & Corporate Skills for Your Career". Subtitle from the existing content. Buttons: Explore Courses / Enroll Now / WhatsApp. Feature chips: Practical Curriculum · Flexible Learning · Career-Focused Training. Image: a real classroom photo, with a placeholder until one is supplied.
  2. **Trust strip:** 6 Professional Programs · 15+ & 20+ Years Mentor Experience · Online / Physical / Hybrid · Karachi Campus. *(Only use verified numbers.)*
  3. **About snapshot** with a link to About.
  4. **Programs grid:** 6 course cards (category, duration, mode, "View Course").
  5. **Who We Serve:** 4 cards.
  6. **Learning Approach:** Understand to Practise to Apply.
  7. **Why PTCA:** 4 features.
  8. **Mentors:** 2 cards.
  9. **Career Paths:** chips that link to courses.
  10. **Testimonials:** **only once real ones exist.**
  11. **Latest resources:** 3 articles.
  12. **FAQ:** 5 questions with FAQPage schema.
  13. **Final CTA:** "Talk to Admissions" with WhatsApp.
- **Schema:** `EducationalOrganization` + `LocalBusiness` (as `@graph`), `WebSite` + `SearchAction`, `FAQPage`.

### 5.2 About `/about/`
- **Title:** `About PTCA | Practical Tax Training Institute in Karachi`
- **Sections:** Hero, Our Academy, Mission, Vision, Logo / Brand story, Who We Serve, Training Approach, Why PTCA, Mentors preview, Director's Message (**hidden until real content exists**), CTA
- **Schema:** `AboutPage`, `EducationalOrganization`, `BreadcrumbList`

### 5.3 Courses Listing `/courses/`
- **Title:** `Taxation & Corporate Courses in Pakistan | PTCA Karachi`
- **Filters:** Category (Taxation / Corporate / HR / IP) · Mode · Duration
- **Comparison table:** Course | Duration | Mode | Ideal For | Certificate
- **"Not sure which course?"** quiz: 3 questions that suggest a course and open WhatsApp with a pre-filled message.
- **Schema:** `ItemList` of `Course`

### 5.4 Course Detail Template (used for all 6 courses)
```text
Breadcrumb: Home > Courses > [Course]
[H1 Course Name] + category badge + mode badges
Quick Facts box: Duration | Mode | Sessions | Eligibility | Certificate | Fee: Contact Admissions | Next Batch: [CMS or "Enquire"]
CTAs: Enroll Now | Download Brochure (PDF) | WhatsApp
Sticky sidebar (desktop) / sticky bar (mobile)
1. Course Overview (150-250 words, primary keyword in the first 100 words)
2. Who Should Join (eligibility cards)
3. What You Will Learn (learning outcomes, checklist)
4. Curriculum (accordion by module)
5. Teaching Method (Understand to Practise to Apply plus practical documents)
6. Your Mentor (confirmed only; otherwise "Taught by PTCA's senior faculty")
7. Career Paths (job titles; optionally an indicative salary article link)
8. Certificate (sample image when available)
9. Learning Modes & Schedule
10. FAQs (6-10, course-specific, include Roman Urdu phrasing)
11. Related Courses + Related Articles
12. Final CTA + Enquiry form (course pre-selected)
Last updated: [date] | Reviewed by: [Mentor name]  <-- E-E-A-T and GEO signal
```
- **Target length:** 1,500-2,500 unique words.
- **Schema:** `Course` + `CourseInstance` (courseMode online/onsite/blended, duration ISO 8601, e.g. `P3M`, `PT40H`), `FAQPage`, `BreadcrumbList`. Omit `offers.price` until the fee is confirmed.

**Course-specific titles and meta descriptions:**
| Course | SEO Title | Meta Description |
|---|---|---|
| Advanced Tax & Litigation | Tax Litigation Course in Pakistan, Notices & Appeals \| PTCA | 30-40 hour practical course on tax notices, audits, assessments, appeals, stay applications & representation before FBR. Karachi & online. |
| Sales Tax | Sales Tax Course in Pakistan, FBR, IRIS & SRB \| PTCA | 3-month Certified Sales Tax Specialist course: STRN, invoicing, monthly returns, Annexure C, refunds, notices & audits. Karachi, online & hybrid. |
| CHRP | CHRP Course in Karachi, HR Certification Pakistan \| PTCA | 3-month Certified HR Professional program covering recruitment, payroll, employment law, performance & HR analytics. Physical or online. |
| Company Secretary | Company Secretary Course Pakistan, SECP Compliance \| PTCA | 12-week practical course on incorporation, SECP filings, board meetings, minutes, registers & corporate governance. |
| Foundation | Basic Tax & Corporate Course for Beginners \| PTCA Pakistan | 48-50 hour foundation course in Pakistan income tax, sales tax, FBR IRIS & corporate secretarial practice. |
| IPO | Intellectual Property Course in Pakistan, Trademark & IP \| PTCA | 3-6 month course on IP rights, trademark, copyright & patent registration procedures in Pakistan. |

### 5.5 Mentors `/mentors/` and Profile Pages
- **Profile structure:** Photo · Name (H1) · Title · Years of experience · Qualifications · Memberships · Expertise chips · Bio · Courses taught (links) · LinkedIn · Articles authored.
- **Schema:** `Person` (jobTitle, knowsAbout, memberOf: Sindh Bar Council / Karachi Tax Bar, sameAs LinkedIn).
- **Rule:** do not name current employers that the site does not already name ("one of Pakistan's leading business groups / largest banks").
- Mentors also act as **blog authors**, which is a strong E-E-A-T signal.

### 5.6 Admissions `/admissions/`
4-step process: Enquire, Counselling (WhatsApp/call), Registration, Start Batch. Covers documents required (only if PTCA confirms), learning modes, payment info ("confirm with admissions"), and FAQs.

### 5.7 Contact `/contact/`
- **Title:** `Contact PTCA | Tax Academy in PECHS, Shahrah-e-Faisal, Karachi`
- NAP block (exact, identical everywhere):
  `Prime Tax & Corporate Academy (PTCA), Office No. 301, Plot 1/6-C, PECHS Block 6, Shahrah-e-Faisal, Karachi 75500, Pakistan · +92 310 5070070 · info@ptcapakistan.pk`
- Google Map embed (lazy-loaded), "Get Directions" link, nearby landmark text, office hours (**confirm**).
- **Form fields:** Full Name* · Phone/WhatsApp* (PK format validation `03XX-XXXXXXX`) · Email · Course of Interest* (dropdown) · Preferred Mode (Physical/Online/Hybrid) · City (dropdown, Karachi default) · Message · consent checkbox, then **Submit Enquiry**
- 4 FAQs from the existing content. **Schema:** `ContactPage`, `LocalBusiness`, `FAQPage`.

### 5.8 Other Pages
- **404:** search box, course links and WhatsApp.
- **Thank-you page** `/thank-you/`: conversion tracking, `noindex`.
- **Legal:** Privacy (aligned with Pakistan PECA 2016 and the draft Personal Data Protection Bill), Terms, Refund Policy (**PTCA to provide the policy**).

---

## 6. Phase 6: Technical Architecture & Stack (Week 3)

### 6.1 Recommended Stack
| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 15 (App Router) + TypeScript** | SSG/ISR gives fast, SEO-friendly HTML |
| Styling | Tailwind CSS + design tokens | Consistent, small CSS |
| CMS | **Sanity** or **Strapi** (headless) *or* WordPress headless | Staff can edit courses, batches, mentors and blog posts |
| Forms | Server Action to email (Resend/SMTP) + Google Sheet/CRM + WhatsApp notification | No lost leads |
| Hosting | Vercel / Cloudflare Pages, with Cloudflare CDN (Karachi PoP) | Low latency in Pakistan |
| Images | Next/Image, AVIF/WebP, responsive | Fast on mobile |
| Search | Static JSON + Fuse.js (later Algolia) | Site search |
| Analytics | GA4 + Google Search Console + Bing Webmaster + Microsoft Clarity | Covered in Phase 13 |

> **Alternative (lower budget):** WordPress + a lightweight theme (GeneratePress/Kadence) + Rank Math Pro + ACF. The SEO rules in this document still apply.

### 6.2 Rendering Strategy
- Static generation for all pages. ISR (revalidate 1h) for batches and blog.
- No client-only rendering of content. Every piece of text must be present in the initial HTML, because AI crawlers often do not run JavaScript.

### 6.3 CMS Content Models
```text
Course { title, slug, category, shortDesc, overview(rich), duration, durationISO, modes[],
         sessionsPerWeek, eligibility[], outcomes[], modules[{title, points[]}],
         authoritiesCovered[], careerPaths[], certificateName, mentors[ref],
         fee (optional), showFee (bool), brochurePDF, faqs[{q,a}], seo{title,desc,ogImage},
         lastReviewed, reviewedBy[ref] }
Batch  { course[ref], startDate, mode, timing, seats, status(open/closed) }
Mentor { name, slug, photo, title, years, qualifications[], memberships[], expertise[],
         bio(rich), courses[ref], linkedin, seo }
Post   { title, slug, category, author[ref Mentor], excerpt, body, faqs, publishedAt,
         updatedAt, seo, relatedCourse[ref] }
FAQ, Testimonial (with consent flag), SiteSettings (NAP, socials, WhatsApp number)
```

### 6.4 Folder Structure (Next.js)
```text
/app
  /(site)/page.tsx, about/, courses/[slug]/, mentors/[slug]/, resources/[slug]/, contact/ ...
  /api/enquiry/route.ts
  sitemap.ts, robots.ts, llms.txt/route.ts
/components (ui/, sections/, schema/)
/lib (cms.ts, seo.ts, schema.ts, whatsapp.ts)
/content (fallback JSON)
/public (logo.svg, og/, brochures/)
```

---

## 7. Phase 7: Technical SEO (Week 4–5)

### Checklist
- [ ] Unique `<title>` and meta description per page; one H1 per page; logical H2/H3 order
- [ ] Self-referencing `canonical` on every page; avoid parameter duplicates
- [ ] `sitemap.xml` (auto, with lastmod), split into pages/courses/posts; submitted to GSC and Bing
- [ ] `robots.txt` allows all public paths and **explicitly allows AI crawlers** (Phase 8)
- [ ] Open Graph + Twitter cards with a branded 1200x630 image per course
- [ ] JSON-LD structured data validated in the Rich Results Test
- [ ] Breadcrumbs (visual + schema)
- [ ] `hreflang` en-PK / ur-PK / x-default once Urdu pages exist
- [ ] `<html lang="en-PK">`
- [ ] Image alt text that is descriptive, with keywords where natural
- [ ] Core Web Vitals: LCP < 2.5s, INP < 200ms, CLS < 0.1
- [ ] HTTPS, HSTS, no mixed content
- [ ] 301 map from old WordPress URLs (Phase 14)
- [ ] `noindex` on thank-you pages, search results and empty tag pages
- [ ] Internal links: at most 3 clicks to any page; no orphan pages
- [ ] Pagination done properly on the blog

### Core Schema (`@graph` sample, placed sitewide)
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["EducationalOrganization", "LocalBusiness"],
      "@id": "https://ptcapakistan.pk/#organization",
      "name": "Prime Tax & Corporate Academy",
      "alternateName": ["PTCA", "PTCA Pakistan"],
      "url": "https://ptcapakistan.pk/",
      "logo": "https://ptcapakistan.pk/logo.png",
      "slogan": "Learn. Practice. Progress.",
      "description": "Practical, career-focused education in taxation, tax litigation, sales tax, human resources and corporate compliance in Karachi, Pakistan.",
      "email": "info@ptcapakistan.pk",
      "telephone": "+923105070070",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Office No. 301, Plot 1/6-C, PECHS Block 6, Shahrah-e-Faisal",
        "addressLocality": "Karachi",
        "addressRegion": "Sindh",
        "postalCode": "75500",
        "addressCountry": "PK"
      },
      "geo": { "@type": "GeoCoordinates", "latitude": "CONFIRM", "longitude": "CONFIRM" },
      "areaServed": [{ "@type": "City", "name": "Karachi" }, { "@type": "Country", "name": "Pakistan" }],
      "knowsAbout": ["Income Tax Pakistan", "Sales Tax", "FBR IRIS", "Tax Litigation", "SECP Compliance", "Company Secretarial Practice", "Human Resource Management", "Intellectual Property"],
      "sameAs": ["FACEBOOK_URL", "LINKEDIN_URL", "INSTAGRAM_URL", "YOUTUBE_URL", "GOOGLE_BUSINESS_PROFILE_URL"]
    },
    {
      "@type": "WebSite",
      "@id": "https://ptcapakistan.pk/#website",
      "url": "https://ptcapakistan.pk/",
      "name": "PTCA",
      "publisher": { "@id": "https://ptcapakistan.pk/#organization" },
      "inLanguage": "en-PK"
    }
  ]
}
```
> Replace the `CONFIRM` and `*_URL` placeholders with real values before launch, or remove those properties.

### Course Schema Sample (Sales Tax)
```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Certified Sales Tax Specialist",
  "description": "Hands-on Pakistan sales-tax compliance: registration, invoicing, monthly filing, Annexure C, refunds, notices and audit preparation.",
  "provider": { "@id": "https://ptcapakistan.pk/#organization" },
  "inLanguage": "en",
  "educationalCredentialAwarded": "Certified Sales Tax Specialist",
  "teaches": ["STRN registration", "FBR IRIS", "Sales tax return filing", "Annexure C", "Sales tax refunds", "FBR notices"],
  "hasCourseInstance": [
    { "@type": "CourseInstance", "courseMode": "onsite", "courseWorkload": "P3M", "location": { "@id": "https://ptcapakistan.pk/#organization" } },
    { "@type": "CourseInstance", "courseMode": "online", "courseWorkload": "P3M" },
    { "@type": "CourseInstance", "courseMode": "blended", "courseWorkload": "P3M" }
  ]
}
```

---

## 8. Phase 8: GEO, Generative Engine Optimization (Week 5–6)

**Goal:** when someone asks ChatGPT, Gemini, Google AI Overviews, Perplexity or Copilot "best tax course in Karachi" or "how to file a sales tax return in Pakistan", PTCA should be **mentioned and cited**.

### 8.1 Entity Clarity
- One consistent name, address, phone, description and logo across the website, Google Business Profile, LinkedIn, Facebook, Wikidata (when eligible), directories and press.
- An "About PTCA" fact block on the About page, written as short declarative facts:
  > "Prime Tax & Corporate Academy (PTCA) is a professional training academy located in PECHS Block 6, Shahrah-e-Faisal, Karachi, Pakistan. PTCA offers six programs: ..."
- Organization and Person schema linked through `@id`.

### 8.2 Answer-Ready Content Format
- Start every section with a **direct 40-60 word answer**, then the detail (the inverted pyramid).
- Use question-style H2s ("What is Annexure C in a sales tax return?").
- Prefer lists, steps and tables, because LLMs extract them easily.
- Add a **"Key Takeaways"** box at the top of each article.
- Include specific facts: section numbers, deadlines, form names, authority names (FBR, SRB, PRA, KPRA, BRA, SECP, IPO-Pakistan). These are citable.
- Show the date: "Updated for Tax Year 2026 / Finance Act 2025" (verify the current year before publishing).
- Show the author with credentials: "Written by Zohaib Akhtar, Senior Manager Taxation, 15+ years".

### 8.3 AI Crawler Access (`robots.txt`)
```text
User-agent: *
Allow: /
Disallow: /api/
Disallow: /thank-you/

User-agent: GPTBot
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: Bingbot
Allow: /

Sitemap: https://ptcapakistan.pk/sitemap.xml
```

### 8.4 `/llms.txt` (emerging standard, cheap to add)
```markdown
# Prime Tax & Corporate Academy (PTCA)
> Practical tax and corporate training academy in Karachi, Pakistan. Courses in tax litigation, sales tax, CHRP (HR), company secretarial practice, foundation tax and intellectual property. Online, physical and hybrid.

## Courses
- [Advanced Certificate in Taxation & Litigation](https://ptcapakistan.pk/courses/advanced-taxation-litigation-course/): 30-40 hours
- [Certified Sales Tax Specialist](https://ptcapakistan.pk/courses/sales-tax-course-pakistan/): 3 months
- [CHRP](https://ptcapakistan.pk/courses/chrp-hr-course-karachi/): 3 months
- [Corporate Law and Secretarial Practices Course](https://ptcapakistan.pk/courses/company-secretary-course-pakistan/): 12 weeks
- [Foundation Certification in Tax & Corporate](https://ptcapakistan.pk/courses/foundation-tax-corporate-course/): 48-50 hours
- [Intellectual Property Course](https://ptcapakistan.pk/courses/intellectual-property-course-pakistan/): 3-6 months

## Contact
- Office No. 301, Plot 1/6-C, PECHS Block 6, Shahrah-e-Faisal, Karachi 75500
- +92 310 5070070 · info@ptcapakistan.pk
```

### 8.5 Citation-Worthy Assets (what AI engines like to cite)
1. **Pakistan Tax Glossary** (`/glossary/`): 100+ terms such as ATL, NTN, STRN, IRIS, WHT, Annexure C, FTR, MTR, ATIR, SRB, PRA.
2. **Deadline Calendar:** income tax, sales tax and SECP due dates (updated yearly).
3. **Step-by-step guides with screenshots:** IRIS return filing, STRN registration, SECP company registration.
4. **Comparison tables:** FBR vs SRB vs PRA on services; Filer vs Non-filer rates.
5. **Career guides:** "How to become a tax consultant in Pakistan", "Company secretary career path in Pakistan".
6. **Original data:** e.g. an annual "PTCA Survey of Tax Professionals' Skills in Pakistan". Original data earns links and citations.

### 8.6 Off-Site GEO Signals
- Google Business Profile with reviews (the most important local and AI signal).
- LinkedIn company page plus mentor posts linking to articles.
- Helpful answers on Quora and Reddit (r/pakistan, r/karachi) **written by mentors**, not spam.
- Listings: Pakistan education directories, Karachi business listings, Bing Places, Apple Maps.
- PR: guest articles in Business Recorder, Dawn (Business), ProPakistani, The Express Tribune, and tax bar association platforms.
- YouTube: short "how to" videos (IRIS, notices) with transcripts embedded on the site.

### 8.7 GEO Measurement
- Run monthly manual prompt tests in ChatGPT, Gemini, Perplexity and Copilot ("best sales tax course in Karachi", "where to learn tax litigation in Pakistan"). Log whether PTCA is mentioned or cited in a spreadsheet.
- Track GA4 referrals from `chatgpt.com`, `perplexity.ai`, `gemini.google.com` and `copilot.microsoft.com`.

---

## 9. Phase 9: Local SEO, Karachi + Pakistan (Week 5–6)

- [ ] **Google Business Profile:** category "Educational institution" (secondary: "Training centre"; "Tax consultant" only if PTCA also offers that service). Add the exact NAP, hours, photos (office, classroom, signage), courses as Services/Products, a weekly Post, and Q&A.
- [ ] Review strategy: send students a review link (QR code) after the course and reply to every review. **No fake reviews.**
- [ ] NAP consistency across 30+ citations: Bing Places, Apple Business Connect, Facebook, LinkedIn, Yellow Pages Pakistan, Pakistan business directories, education portals.
- [ ] Embedded map + "How to reach us" text (landmarks on Shahrah-e-Faisal, PECHS Block 6; verify locally).
- [ ] `LocalBusiness` schema with geo coordinates.
- [ ] Local content: "Tax courses in Karachi: complete guide", Karachi events and seminars.
- [ ] Track local rank with a geo-grid tool (Local Falcon / BrightLocal) for "tax course Karachi".
- [ ] National reach: online-course pages with `areaServed: Pakistan`, plus city pages only with real unique value.

---

## 10. Phase 10: Content Marketing & Knowledge Hub (ongoing)

### 10.1 Content Pillars
| Pillar | Linked Course | Example Articles |
|---|---|---|
| Income Tax | Foundation, Advanced | How to file an income tax return on IRIS; Filer vs non-filer; Section 114 explained |
| Sales Tax | Sales Tax | STRN registration guide; Annexure C explained; SRB vs FBR |
| Tax Litigation | Advanced | How to reply to a show-cause notice; Appeal to CIR(A) timeline; Stay application guide |
| Corporate / SECP | Company Secretary | Register a Private Ltd with SECP; Form A & Form 29; Board minutes format |
| HR | CHRP | HR policies checklist for Pakistani SMEs; Payroll, EOBI & SESSI basics |
| IP | IPO | Trademark registration in Pakistan, step by step |
| Careers | All | Tax consultant career path; CHRP vs HR diploma |

### 10.2 Publishing Cadence
- Months 1-3: **8 posts/month** (pillar guides first, 2,000+ words each).
- Months 4-12: **4-6 posts/month**, plus refreshing old posts every budget season.

### 10.3 Article Template
H1, Key Takeaways box, direct answer (50 words), table of contents, body with H2 questions, tables/steps, course CTA box, FAQ (FAQPage schema), author box, last updated, related articles.

### 10.4 Compliance Disclaimer
Every tax article carries: "This article is for educational purposes. Laws change with each Finance Act; consult a qualified professional." This protects PTCA and builds trust.

---

## 11. Phase 11: Conversion, Admissions & CRM (Week 6)

- **WhatsApp:** a floating button plus a pre-filled message per page, e.g. `https://wa.me/923105070070?text=Hi%20PTCA%2C%20I%27m%20interested%20in%20the%20Certified%20Sales%20Tax%20Specialist%20course`
- **CTA hierarchy:** Primary "Enroll Now" (form) · Secondary "WhatsApp" · Tertiary "Download Brochure" (lead capture for name and phone).
- **Lead routing:** form to email to info@, to Google Sheet/CRM (HubSpot free / Zoho), to a WhatsApp alert on the admissions phone.
- **Auto-reply email** with course details.
- **Exit intent / scroll pop-up** (desktop only, once per session): "Get the free course brochure".
- **Trust near CTAs:** mentor photo, "Karachi office" badge, response-time promise ("Reply within working hours").
- **Spam protection:** honeypot + Cloudflare Turnstile (no annoying CAPTCHA).
- **Future:** online payment via JazzCash / Easypaisa / bank transfer (Phase 15), and a student LMS portal.

---

## 12. Phase 12: Performance, Accessibility & Security (Week 6–7)

**Performance budget:** HTML+CSS+JS < 200KB gzip on the home page · hero image < 120KB AVIF · Lighthouse 95+ on all four categories · TTFB < 600ms from Pakistan.

**Accessibility (WCAG 2.2 AA):** contrast of 4.5:1 or more (check white on `#22A74A`; for small text use `#0E5C2F`) · keyboard navigation · focus states · labels on inputs · alt text · skip link · ARIA for the accordion and mega-menu.

**Security:** HTTPS + HSTS · CSP headers · rate-limited form API · input sanitisation · no secrets on the client · daily CMS backups · uptime monitoring (UptimeRobot) · Cloudflare WAF · domain auto-renew and registrar lock (PKNIC for `.pk`).

---

## 13. Phase 13: Analytics & Tracking (Week 7)

| Tool | Purpose |
|---|---|
| GA4 | Events: `generate_lead`, `whatsapp_click`, `phone_click`, `email_click`, `brochure_download`, `course_view`, `enroll_click` |
| Google Tag Manager | Tag management |
| Google Search Console + Bing Webmaster | Indexing, queries, CWV |
| Microsoft Clarity | Heatmaps and session recordings (free) |
| Meta Pixel / LinkedIn Insight | Retargeting (with a consent banner) |
| Looker Studio | Monthly dashboard: traffic to leads to enrollments per course |

**KPIs:** organic sessions, top-10 keywords, leads per course, WhatsApp clicks, lead-to-enrollment rate, GBP calls and directions, AI referral sessions, AI mention rate.

---

## 14. Phase 14: QA, Launch & Migration (Week 8)

### 14.1 Redirect Map (old to new, 301)
| Old URL | New URL |
|---|---|
| /about/ | /about/ |
| /our-courses/ | /courses/ |
| /certificate-in-advance-taxation-and-litigation/ | /courses/advanced-taxation-litigation-course/ |
| /certified-sales-tax-specialist/ | /courses/sales-tax-course-pakistan/ |
| /certified-human-resource-professional-chrp/ | /courses/chrp-hr-course-karachi/ |
| /company-secretary-secretarial-practices/ | /courses/company-secretary-course-pakistan/ |
| /foundation-certification-in-tax-and-corporate/ | /courses/foundation-tax-corporate-course/ |
| (IPO old URL, to be confirmed) | /courses/intellectual-property-course-pakistan/ |
| /zohaib-akhtar/ | /mentors/zohaib-akhtar/ |
| /rukhsana-rustam/ | /mentors/rukhsana-rustam-khan/ |
| /contact-us/ | /contact/ |

> Crawl the old site fully with Screaming Frog before launch to catch every URL.

### 14.2 Pre-Launch QA Checklist
- [ ] All content proofread; no lorem ipsum or placeholders
- [ ] Forms tested (email, sheet and WhatsApp alert received)
- [ ] Cross-device: Android Chrome (low-end), iPhone Safari, desktop
- [ ] Lighthouse and PageSpeed on 4G throttling
- [ ] Schema validated; no errors in GSC
- [ ] Redirects tested; no 404s or redirect chains
- [ ] robots.txt not blocking anything (staging was `noindex`, production is `index`)
- [ ] Analytics events firing
- [ ] Legal pages live

### 14.3 Launch Day
Deploy, submit the sitemap in GSC and Bing, request indexing of key pages, update the GBP website link, announce on social media, monitor 404s and traffic for 14 days.

---

## 15. Phase 15: Post-Launch Growth (90-Day Roadmap and Beyond)

| Period | Focus |
|---|---|
| Days 1-30 | Fix GSC issues, publish 8 pillar articles, set up GBP and get the first 15 reviews, 20 citations |
| Days 31-60 | Glossary (100 terms), deadline calendar, mentor LinkedIn articles, YouTube tutorials (3) |
| Days 61-90 | Urdu versions of 6 courses, PR outreach (5 publications), first GEO prompt audit |
| Q2+ | Certificate verification portal, alumni stories, webinars (Event schema), online payment, LMS, city pages for online courses, original research report |

---

## 16. Appendices

### A. Missing Data Required from PTCA (blocking items)
1. Final legal brand name (Prime vs Pakistan)
2. Fees per course, or a decision to keep them hidden
3. Upcoming batch dates and timings
4. Mentor assignment for each course (confirmed)
5. Director's Message plus photo (or remove the section)
6. IPO course full curriculum, eligibility and certificate name
7. A rewritten Foundation course eligibility and description
8. Real photos: office, classroom, mentors, certificates
9. Testimonials with written consent
10. Social media URLs; office hours; map coordinates
11. Refund policy and terms
12. Logo in SVG / high-resolution format
13. Any accreditation or affiliation (only if real and verifiable)

### B. Content Rules (Do / Don't)
- Do: real data only, cite FBR/SECP/IPO sources in articles, update yearly after the Budget.
- Don't: fake reviews, invented stats, "No.1 academy" claims, unverified accreditation, salary guarantees.
- Don't: duplicate city pages or keyword stuffing.

### C. Effort Estimate (indicative)
| Phase | Duration |
|---|---|
| 1-4 Discovery, IA, keywords, design | 3 weeks |
| 5-6 Pages + development | 3-4 weeks |
| 7-13 SEO, GEO, local, performance, analytics | 2 weeks (overlapping) |
| 14 QA and launch | 1 week |
| **Total to launch** | **~8-10 weeks** |
| 15 Growth | Ongoing |

### D. Phase Summary at a Glance
| # | Phase | Output |
|---|---|---|
| 1 | Discovery, Brand & Content Audit | Brand kit, content audit, missing-data list |
| 2 | Information Architecture | Sitemap, URLs, navigation, internal linking |
| 3 | Keyword Strategy | Keyword map (English, Roman Urdu, Urdu) |
| 4 | UX/UI Design System | Tokens, components, motion rules |
| 5 | Page Blueprints | Section-by-section plan for every page |
| 6 | Technical Architecture | Stack, CMS models, folder structure |
| 7 | Technical SEO | Schema, metadata, CWV, redirects |
| 8 | GEO / AI Search | robots for AI bots, llms.txt, citable assets |
| 9 | Local SEO | Google Business Profile, NAP, reviews, citations |
| 10 | Content Marketing | Pillars, cadence, article template |
| 11 | Conversion & CRM | WhatsApp, forms, lead routing |
| 12 | Performance, A11y, Security | Budgets, WCAG 2.2 AA, hardening |
| 13 | Analytics | GA4, GSC, Clarity, KPIs |
| 14 | QA & Launch | Redirect map, checklists, day-1 tasks |
| 15 | Growth | 90-day roadmap and Q2+ backlog |

---
**Next step:** once PTCA approves this plan and provides the Appendix A data, move on to (1) the full copywriting document per page, (2) a Figma design, and (3) Next.js development.

---

## 17. Enrollment Form Specification ("Enroll Now" flow)

> **This is a locked requirement.** Whenever a student clicks any course, an **"Enroll Now"** button must be visible. Clicking it opens an **enrollment form** that collects the required student data (name, mobile, email, education, location, etc.) before the lead reaches admissions. This section is the single source of truth for that form.

### 17.1 The Flow (user journey)
1. **Course click.** On `/courses/`, a course card, the mega-menu, or the Knowledge Hub, the student lands on the course detail page.
2. **"Enroll Now" button** appears in three places on every course page: the hero, the sticky course sidebar / mobile sticky bar, and the final CTA section. It is the **primary** green button.
3. **Click** opens the **Enrollment Form**. Recommended: a **dedicated route** `/enroll/?course=<slug>` so it is shareable, trackable and works everywhere; render it as a **modal** on desktop and a **full-screen page** on mobile. (Fallback: always a real page for accessibility and no-JS users.)
4. The **Course of Interest is pre-selected** from the URL/button, so the student does not re-choose it (but can change it).
5. **Multi-step form** (3 short steps) to reduce drop-off, with a progress bar.
6. **Submit** (with consent) leads to a **Thank-You state** offering an instant **WhatsApp handoff**, brochure download and next steps.
7. Lead is stored and routed to admissions (see 17.9).

### 17.2 Required Fields (MUST collect before enrolling)
| # | Field | Type | Required | Validation | Why it is required |
|---|---|---|---|---|---|
| 1 | **Full Name** | text | Yes | 3-60 chars, letters/spaces only | Identity, certificate, greeting on WhatsApp |
| 2 | **Mobile / WhatsApp Number** | tel | Yes | Pakistani format: `03XX-XXXXXXX` or `+923XXXXXXXXX` | Primary contact channel in Pakistan; batch alerts |
| 3 | **Email (Gmail etc.)** | email | Yes | Valid email, unique | Confirmation, brochure, official communication |
| 4 | **Course of Interest** | select | Yes | Must match one of the 6 courses; pre-filled from button | Routes lead to the right counsellor/fee |
| 5 | **Preferred Learning Mode** | radio | Yes | Physical / Online / Hybrid | Batch planning and pricing tier |
| 6 | **City** | select (searchable) | Yes | Karachi default; other PK cities + "Other" | Local vs online handling; geo reporting |
| 7 | **Highest Education** | select | Yes | Matric / Intermediate / Bachelor / Master / CA-ACCA-ACMA / LLB / Other | Eligibility check per course |
| 8 | **Current Status / Profession** | select | Yes | Student / Graduate / Accountant / Lawyer / Business Owner / Working Professional / Other | Levels the batch and tailors counselling |
| 9 | **Consent** | checkbox | Yes | Must be ticked (privacy + contact consent) | Legal (PECA 2016 / privacy) + WhatsApp contact |

**Rule:** these 9 fields are the **minimum** before "Enroll" is accepted. Nothing less, or admissions cannot act on the lead.

### 17.3 Recommended / Optional Fields (ask but do not block)
| Field | Type | Notes |
|---|---|---|
| Father's Name | text | Needed on the certificate; can be deferred to admission |
| CNIC Number | text | `#####-#######-#`; needed for certificate/records; optional at form, mandatory at admission |
| Date of Birth | date | Age/eligibility checks; optional |
| Gender | select | Optional (reporting) |
| Full Address / Area | text | Beyond city (e.g. "PECHS, Karachi"); optional |
| Alternate Phone | tel | Optional backup |
| Years of Experience | select | 0 / 1-2 / 3-5 / 5+; helps batch placement |
| Preferred Batch Timing | radio | Morning / Afternoon / Evening / Weekend |
| Preferred Start / Batch | select | Only if PTCA publishes batch dates; else hide |
| How did you hear about us? | select | Google / Facebook / Instagram / LinkedIn / YouTube / Friend or Colleague / WhatsApp / Walk-in / Other (marketing attribution) |
| Message / Question | textarea | Optional, max 500 chars |
| CV / Last Degree upload | file | Optional, PDF/JPG/PNG, max 5 MB |

**Guideline:** keep the **MUST** set to 9 fields to protect conversion; keep optional fields short and clearly marked "optional".

### 17.4 Multi-step layout (3 steps + review)
**Step 1 of 3 - About You**
- Full Name*, Mobile/WhatsApp*, Email*
- Progress bar showing "Step 1 of 3"

**Step 2 of 3 - Your Background**
- Highest Education*, Current Status/Profession*, City*
- Years of Experience, Full Address/Area (optional)

**Step 3 of 3 - Course & Preference**
- Course of Interest* (pre-filled), Preferred Learning Mode*, Preferred Batch Timing (optional)
- How did you hear about us (optional), Message (optional)
- Consent checkbox*
- Button: **Submit Enrolment**

Navigation: **Back / Next** buttons, inline validation per step, and a final review summary. On mobile, one column, large tap targets (min 44px), correct keyboard types (`tel`, `email`, `numeric`).

### 17.5 Validation rules (Pakistan-specific)
- **Mobile:** exactly 11 digits starting with `03` (e.g. `0300 1234567`), or `+92 3XX XXXXXXX`. Strip spaces/dashes before saving. Reject letters.
- **Email:** standard RFC format; block obvious typos (e.g. `gmial.com` suggestion). Accept Gmail, Outlook, Yahoo, company domains.
- **CNIC (if provided):** 13 digits in `#####-#######-#` format.
- **Name:** letters and spaces only, min 3 chars; disallow digits/symbols (allow `.` and `-` for names like "Abdul-Rahman").
- **City:** must be chosen from the list or "Other" with free text.
- **File upload (if used):** PDF/JPG/PNG only, max 5 MB, virus-scanned before storage.

### 17.6 UX behaviour (must-haves)
- Course pre-selected from the clicked button/URL; still editable.
- **Autosave** the draft to `localStorage` so a refresh does not lose data.
- Errors shown **inline** next to the field, with a top summary for screen readers (`aria-live`).
- Never clear the form on a server error; keep the entered data.
- Success = **Thank-You state** (page or modal) with: "We received your enrolment request. Our admissions team will contact you within working hours."
- Provide the **WhatsApp handoff** immediately: a button that opens WhatsApp to `+92 310 5070070` with a **pre-filled message** (17.7).
- Also offer **Download Brochure (PDF)**.
- Accessibility: all fields labelled, keyboard navigable, focus visible, WCAG 2.2 AA.

### 17.7 WhatsApp handoff message template
```text
Assalam-o-Alaikum PTCA,
I want to enrol in: [COURSE NAME]
Name: [NAME]
City: [CITY]
Education: [EDUCATION]
Preferred mode: [MODE]
Please share fees, batch dates and next steps.
```
Encode it, e.g. `https://wa.me/923105070070?text=<URL-ENCODED-MESSAGE>`.

### 17.8 Data handling, privacy & anti-spam
- Store leads in the DB/CRM with a **consent flag** and a timestamp.
- Privacy: comply with Pakistan PECA 2016 and the draft Personal Data Protection Bill; publish a Privacy Policy; **never sell** student data; allow deletion on request.
- Anti-spam: **honeypot** field + **Cloudflare Turnstile** (preferred) or reCAPTCHA v3, plus **server-side rate limiting** and IP throttling.
- Sanitise all inputs server-side; never trust the client.

### 17.9 Lead routing, notifications & follow-up
1. On submit, the server validates, saves the lead and returns a success response.
2. **Notify admissions:** email to `info@ptcapakistan.pk` + a **WhatsApp alert** to the admissions number + a row in a **Google Sheet/CRM** (HubSpot free / Zoho).
3. **Auto-reply** to the student by email (and SMS/WhatsApp later) confirming the request and next steps.
4. **Pipeline statuses:** New, Contacted, Counselling, Registered, Enrolled, Dropped — each lead is followed up within **one working day** (SLA).
5. Every lead keeps `source` (which page/button), `course`, `utm` parameters and timestamp for reporting.

### 17.10 Thank-You page `/thank-you/`
- Confirmation message + expected response time.
- Big **"Chat on WhatsApp now"** button (pre-filled).
- Download brochure link.
- Optional: next steps (documents to bring) once confirmed by PTCA.
- Set `noindex`; fire the `generate_lead` conversion.

### 17.11 Analytics events for the form
| Event | Fires when |
|---|---|
| `enroll_click` | "Enroll Now" is clicked (with course parameter) |
| `form_start` | Step 1 is viewed |
| `form_step_complete` | Each step's Next is validated |
| `enroll_submit` | Successful submission |
| `generate_lead` | Conversion on thank-you (with course + value if known) |
| `whatsapp_after_submit` | WhatsApp handoff clicked on thank-you |

### 17.12 Phase 2 (post-launch, optional)
- Online **payment** (JazzCash / Easypaisa / bank transfer) with slip upload.
- **Batch auto-allocation** from the preferred timing/start selection.
- **Student portal / LMS** login created automatically after enrolment.
- WhatsApp Business API templates for automated confirmations.

---

*End of plan (Version 1.1 - added Enrollment Form Specification).*










