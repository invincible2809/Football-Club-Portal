# Prompt: Build the Castle Bromwich Lions FC Youth Portal

> Details below come from the club's Facebook page
> (https://www.facebook.com/share/1DMu8eeUUJ/). Fields still in `[BRACKETS]`
> were not visible there and need confirming with the club.

---

You are building a modern, mobile-first website for **Castle Bromwich Lions FC**, a grassroots youth football club in Castle Bromwich, Birmingham, UK. The club currently lives only on Facebook. The website should become its official home on the web while staying connected to that Facebook page.

## Club details
- **Club name:** Castle Bromwich Lions FC (Youth). Short name: "The Lions" / "CB Lions"
- **What we are:** A youth football club with multiple teams playing in the **CWYFL** (Central Warwickshire Youth Football League). The league is on FA Full-Time as league ID `4385806`: https://fulltime.thefa.com/index.html?league=4385806
- **Accreditation:** England Football Accredited, **1 Star**. Show the badge prominently, because it reassures parents.
- **Home ground:** Arden Hall Playing Fields, Castle Bromwich, Birmingham, **B36 9PB**, United Kingdom
- **Founded:** [YEAR]
- **Teams / age groups:** Each team is named by age group plus a nickname, in the format "Castle Bromwich Lions U8 Spitfires". Confirmed so far:
  - **U8 Spitfires.** Full-Time team ID `457917099`: https://fulltime.thefa.com/displayTeam.html?id=457917099. Plays CWYFL development fixtures ("DEVP"), so no scores or tables are published.
  - [OTHER TEAMS: age group, nickname and Full-Time team ID for each]
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
3. **Fixtures & Results.** Filter by age group and season. Show home or away, the venue with a Google Maps link, the kick-off time and the score. Each match gets an add-to-calendar (.ics) file.
   - **Source the data from FA Full-Time.** Each team has a Full-Time team ID. Pull upcoming fixtures and results from the team page (`https://fulltime.thefa.com/displayTeam.html?id=<teamID>`) or the league's fixtures and results pages (`fixtures.html?league=4385806`, `results.html?league=4385806`). Do this with a scheduled job, such as a daily GitHub Action or Vercel cron, that writes to a JSON file. The site must not fetch from Full-Time when someone loads a page. Store the source link on every fixture. Fall back to manual entry if the import fails. Each team page should also link to its Full-Time page.
   - **Development fixtures.** Matches of type "DEVP" (non-competitive development games, used for the younger age groups) record their score as "X - X". Show these as "Played" with no score and no league table. Make score display configurable per team.
   - **Venue naming.** Full-Time names the home venue "CASTLE BROMWICH PLAYING FIELDS Pitch 3" while the club calls it Arden Hall Playing Fields. Map both names to one venue record (B36 9PB), keeping the pitch number.
   - Full-Time no longer publishes youth players' names. Mirror that rule: no player names on fixtures or results.
4. **League Tables.** Per age group, only where Full-Time publishes them (it doesn't for development age groups). Import them with the same Full-Time job and link to the CWYFL tables.
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
- Seed fixtures with the **real U8 Spitfires 2026/27 data** from Full-Time. Use realistic placeholder content, clearly marked as sample data, for the other teams. Keep it all in easy-to-edit files. Real U8 Spitfires fixtures so far:

  | Date | Time | Home | Away | Status |
  |---|---|---|---|---|
  | 06/09/26 | 09:30 | Silhill U8 Tigers | CB Lions U8 Spitfires | Played (DEVP) |
  | 13/09/26 | 10:30 | CB Lions U8 Spitfires | C C C U8 Greens | Played (DEVP) |
  | 20/09/26 | 10:30 | Cadbury Athletic U8 Juniors | CB Lions U8 Spitfires | Played (DEVP) |
  | 27/09/26 | 09:30 | Arden Forest U8 Black | CB Lions U8 Spitfires | Played (DEVP) |
  | 04/10/26 | 10:30 | CB Lions U8 Spitfires | Vision U8 Lions | Played (DEVP) |
  | 11/10/26 | 10:30 | CB Lions U8 Spitfires | Olton Ravens U8 Stars | Played (DEVP) |
  | 18/10/26 | 10:30 | CB Lions U8 Spitfires | Olton Ravens U8 OR | Played (DEVP) |
  | 25/10/26 | 10:30 | CB Lions U8 Spitfires | C C C U8 Whites | Played (DEVP) |
  | 01/11/26 | 09:30 | Silhill U8 Bears | CB Lions U8 Spitfires | Played (DEVP) |
  | 08/11/26 | 11:00 | Bartley Reds U8 | CB Lions U8 Spitfires | Played (DEVP) |
  | 15/11/26 | 09:30 | Inkberrow Youth U8 Kestrels | CB Lions U8 Spitfires | Played (DEVP) |
  | 22/11/26 | 10:30 | CB Lions U8 Spitfires | Hampton U8 Reds AOB | Upcoming, Castle Bromwich Playing Fields Pitch 3 |
  | 29/11/26 | 10:30 | CB Lions U8 Spitfires | Cottage Farm Rangers U8 United | Upcoming, Castle Bromwich Playing Fields Pitch 3 |
- Include a README with setup steps, how to edit content, and how to deploy.

## Deliverables
1. A working codebase in this repository.
2. Real U8 Spitfires fixtures and sample data for the other age groups for the 2026/27 season, plus the Full-Time import job.
3. A README and a short admin guide written for club volunteers.

Start by proposing the site map, design direction (red/blue/yellow lion identity, typography, mood) and tech stack in a short plan. Then build the site page by page.
