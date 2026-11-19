# Prompt: Build the Castle Bromwich Lions FC Youth Portal

> Details below come from the club's Facebook page
> (https://www.facebook.com/share/1DMu8eeUUJ/). Fields still in `[BRACKETS]`
> were not visible there and need confirming with the club.

---

You are building a modern, mobile-first website for **Castle Bromwich Lions FC**, a grassroots youth football club in Castle Bromwich, Birmingham, UK. The club currently lives only on Facebook. The website should become its official home on the web while staying connected to that Facebook page.

## Club details
- **Club name:** Castle Bromwich Lions FC (Youth). Short name: "The Lions" / "CB Lions"
- **What we are:** A youth football club with multiple teams playing in the **CWYFL** (Central Warwickshire Youth Football League)
- **Accreditation:** England Football Accredited, **1 Star**. Show the badge prominently, because it reassures parents.
- **Home ground:** Arden Hall Playing Fields, Castle Bromwich, Birmingham, **B36 9PB**, United Kingdom
- **Founded:** [YEAR]
- **Teams / age groups:** [e.g. U7, U8, U9, U10, U11, U12, U13, U14, U15, U16, plus any girls' teams]
- **Club colours (from the crest):** red `#D7262B`, royal blue `#1F4FA3`, yellow/gold `#F7D417`, black `#111111`. White is the neutral.
- **Crest:** A shield split into red and blue quarters with a yellow border. It shows a crowned yellow lion with two footballs and the words "Castle Bromwich" / "Lions FC". Use the supplied crest file as-is: [PATH TO HIGH-RES CREST FILE]. Don't redesign it.
- **Current campaign / tagline:** "Say hello to our best season yet."
- **Committee contacts:**
  - Chairman: Hassan Saleh, 07810 015315
  - Secretary: Luke Sandford, 07900 561839
  - Welfare Officer: [NAME, CONTACT] (required for an FA-accredited youth club)
- **Email:** [CLUB EMAIL]
- **Social links:** Facebook https://www.facebook.com/share/1DMu8eeUUJ/ , Instagram [URL], TikTok [URL]
- **Currency:** GBP (£)
- **Language:** English (UK spelling)

## Audience
1. **Parents and guardians.** This is the main audience. They want to know about safety, training times, costs and how to sign up.
2. **Young players.** They want fixtures, results, team news and photos.
3. **Local community and sponsors.** Local businesses that might sponsor a team or a kit.
4. **Volunteers.** People who could become coaches, managers or helpers.

## Pages & features
1. **Home.** Hero section with the crest, club colours and the line "Say hello to our best season yet." Show:
   - the next fixtures across all age groups
   - the latest results
   - the latest news
   - the 1-Star Accreditation badge
   - a sponsor strip
   - big "Join the Lions" and "Volunteer" buttons
2. **Our Teams.** One page per age group showing:
   - manager and coach names, plus a contact form that sends messages to the club rather than publishing phone numbers
   - training day, time and location
   - league division
   - a squad list using **first names only** and no photos unless consent is recorded
3. **Fixtures & Results.** Filter by age group and season. Show home or away, the venue with a Google Maps link, the kick-off time and the score. Each match gets an add-to-calendar (.ics) file. Note: in the FA's youth format, results and tables aren't published for the younger age groups (usually U11 and below), so make score display configurable per team.
4. **League Tables.** Per age group, where published. Start with a manually editable data file and link to the CWYFL / FA Full-Time pages.
5. **News.** Match reports, club news and events, with share buttons. Embed the Facebook page feed so posts made on Facebook also appear here.
6. **Gallery.** Albums per event or season with a lightbox. Only show photos that are marked as consented.
7. **Join the Lions.** A player registration and trial request form with these fields:
   - child's first name and date of birth
   - age group
   - parent's name, email and phone
   - medical notes
   - photo consent
   - code-of-conduct acceptance

   Also include a fees and subs section ([AMOUNTS]) and a link out to the payment method ([e.g. ClubBuzz / Pitchero / bank transfer / GoCardless]). Don't handle card details on the site.
8. **Volunteer / Coach with us.** Roles available, DBS check and FA coaching course information, and an enquiry form.
9. **Safeguarding & Welfare.** This is mandatory for a youth club. Include:
   - the Welfare Officer's contact details
   - the FA safeguarding policy
   - codes of conduct for players, parents and coaches
   - the anti-bullying, equality and photography policies
   - links to the FA safeguarding pages and the NSPCC
10. **Sponsors.** Sponsors by tier, with logos and links, plus a "Sponsor a team / kit" enquiry form.
11. **About.** Include:
    - club history
    - the accreditation
    - the committee: Chairman Hassan Saleh, Secretary Luke Sandford, [Treasurer], [Welfare Officer]
    - honours
    - ground info for Arden Hall Playing Fields with an embedded map, parking details and the B36 9PB postcode
12. **Contact.** A form, committee contacts, a map and social links.

## Admin
- A simple admin area or headless CMS, so non-technical committee members and team managers can add news, fixtures, results, teams and photos without touching code.
- Roles:
  - **Admin:** the committee
  - **Team Manager:** can edit only their own age group
  - **Editor:** news and gallery
  - **Welfare Officer:** can see registrations and consents
- Store registration submissions securely and email the Secretary when one comes in.

## Tech & quality requirements
- Stack: **Next.js + Tailwind CSS**, with content in Markdown/JSON files or a free headless CMS such as Decap CMS or Sanity. Deploy free on **Vercel or Netlify**.
- Design for phones first, since most parents will visit from Facebook on mobile. Aim for a Lighthouse score of 90+.
- Meet WCAG AA accessibility. The yellow `#F7D417` fails contrast on white, so use it only on dark or red/blue backgrounds, never for body text. Include alt text and keyboard navigation.
- SEO:
  - target searches like "youth football club Castle Bromwich", "kids football B36" and "U9 football team Birmingham"
  - per-page titles and meta descriptions
  - Open Graph images so links look good when shared on Facebook and WhatsApp
  - `SportsOrganization` / `SportsTeam` / `SportsEvent` JSON-LD
  - sitemap.xml
- **Child protection and UK GDPR:**
  - no surnames or photos of children without a recorded consent flag
  - a privacy policy and cookie notice
  - collect only the data you need
  - no public phone numbers for team managers
- Seed the site with realistic placeholder content, clearly marked as sample data, for one season. Keep it in easy-to-edit files.
- Include a README with setup steps, how to edit content, and how to deploy.

## Deliverables
1. A working codebase in this repository.
2. Sample data for the [2026/27] season across all age groups.
3. A README and a short admin guide written for club volunteers.

Start by proposing the site map, design direction (red/blue/yellow lion identity, typography, mood) and tech stack in a short plan. Then build the site page by page.
