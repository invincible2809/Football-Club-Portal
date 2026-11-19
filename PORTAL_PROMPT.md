# Prompt: Build the Football Club Portal

> Fill in every `[BRACKETED]` field from the club's Facebook page
> (https://www.facebook.com/share/1DMu8eeUUJ/) before using this prompt.

---

You are building a modern, mobile-first website ("portal") for an amateur/community football club. The club currently lives only on Facebook; the portal should become its official home on the web while staying connected to that Facebook page.

## Club details
- **Club name:** [CLUB NAME]  (short name / nickname: [e.g. "The Reds"])
- **Location / home ground:** [CITY, COUNTRY — GROUND NAME + ADDRESS]
- **Founded:** [YEAR]
- **League / competitions:** [LEAGUE NAME, DIVISION, CUPS]
- **Teams / age groups:** [e.g. First Team, Reserves, Women's, U18, U14, U10, Veterans]
- **Club colours:** [PRIMARY HEX], [SECONDARY HEX], accent [HEX]
- **Crest / logo:** [PATH OR URL TO LOGO FILE — use as-is, don't redesign]
- **Tagline / motto:** [e.g. "More than a club"]
- **Contact:** [EMAIL], [PHONE / WHATSAPP]
- **Social links:** Facebook https://www.facebook.com/share/1DMu8eeUUJ/ , Instagram [URL], YouTube/TikTok [URL]
- **Primary language(s):** [e.g. English, plus Hindi / Urdu / other]

## Audience
Players and parents, fans and local community, sponsors, and new players wanting to join or try out.

## Pages & features
1. **Home** — hero with crest, club colours and a team photo; next fixture with countdown; latest result; latest 3 news posts; sponsor strip; "Join the club" call to action.
2. **Fixtures & Results** — filterable by team and season; home/away, venue with map link, kick-off time, score; add-to-calendar (.ics) per match.
3. **League Table** — standings per team (manually editable data file to start).
4. **Squads** — per team: player cards (photo, name, number, position, short bio, appearances/goals); coaching staff.
5. **News** — articles with image, date, category (match report, club news, events); share buttons; embedded Facebook page feed so posts made on Facebook also appear here.
6. **Gallery** — photo/video albums per match or event, lightbox view.
7. **Join / Trials** — registration form (name, age, position, team, parent contact for minors, consent checkbox) that emails the club and stores submissions.
8. **Membership & Shop (optional)** — membership fees and kit info; link out to a payment provider rather than handling card data.
9. **Sponsors** — tiers with logos and links; "Become a sponsor" enquiry form.
10. **About** — history, honours/trophies, committee, ground info with embedded map, safeguarding & code-of-conduct policies.
11. **Contact** — form, email, phone, map, social links.

## Admin
- Simple admin area (or headless CMS) so non-technical committee members can add news, fixtures, results, players and photos without touching code.
- Role-based logins: Admin, Coach (own team only), Editor (news/gallery).

## Tech & quality requirements
- Stack: **[e.g. Next.js + Tailwind CSS + a headless CMS like Sanity/Strapi, or a simpler static site]**, deployable free on **[Vercel / Netlify / GitHub Pages]**.
- Responsive (phone first), fast (Lighthouse 90+), accessible (WCAG AA contrast with club colours, alt text, keyboard navigation).
- SEO: per-page titles/meta, Open Graph images for Facebook/WhatsApp sharing, `SportsTeam` / `SportsEvent` JSON-LD, sitemap.xml.
- Light and dark mode using the club colours.
- Privacy: protect minors — no full names/photos of under-18s without consent flag; cookie notice; privacy policy page.
- Seed the site with realistic placeholder content clearly marked as sample data, kept in easy-to-edit JSON/Markdown files.
- Include a README with setup, how to edit content, and how to deploy.

## Deliverables
1. Working codebase in this repository with the structure above.
2. Sample data for one season.
3. README + short admin guide for club volunteers.

Start by proposing the site map, design direction (colours, typography, mood) and tech stack in a short plan, then build it page by page.
