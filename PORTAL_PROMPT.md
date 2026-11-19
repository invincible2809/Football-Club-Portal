# Prompt: Build the Castle Bromwich Lions FC Youth Portal

> Details below come from the club's Facebook page
> (https://www.facebook.com/share/1DMu8eeUUJ/) and FA Full-Time. Anything marked
> **TBD** is still to be confirmed with the club. See "Handling TBD details" below.

---

You are building a modern, mobile-first website for **Castle Bromwich Lions FC**, a grassroots youth football club in Castle Bromwich, Birmingham, UK. The club currently lives only on Facebook. The website should become its official home on the web while staying connected to that Facebook page.

## Club details
- **Club name:** Castle Bromwich Lions FC (Youth). Short name: "The Lions" / "CB Lions"
- **What we are:** A youth football club with multiple teams playing in the **CWYFL** (Central Warwickshire Youth Football League). The league is on FA Full-Time as league ID `4385806`: https://fulltime.thefa.com/index.html?league=4385806
- **Accreditation:** England Football Accredited, **1 Star**. Show the badge prominently, because it reassures parents.
- **Home ground:** Arden Hall Playing Fields, Castle Bromwich, Birmingham, **B36 9PB**, United Kingdom
- **Founded:** June 2024. 2026/27 is the club's third season, after 2024/25 and 2025/26. Use "Est. 2024" in the footer and next to the crest where it fits. Present the club as young and fast-growing: from founding in 2024 to multiple CWYFL teams and FA 1-Star Accreditation within two seasons.
- **Teams / age groups:** Each team is named by age group plus a nickname, in the format "Castle Bromwich Lions U8 Spitfires". Confirmed so far:
  - **U8 age group: four teams.** All play CWYFL development fixtures ("DEVP"), so no scores or tables are published. The U8 division-season ID on Full-Time is `796460763`. The "Played" column counts games played so far in 2026/27.

    | Team | Full-Time team ID | Played |
    |---|---|---|
    | Castle Bromwich Lions U8 Colts | `176714321` (https://fulltime.thefa.com/displayTeam.html?divisionseason=796460763&teamID=176714321) | 11 |
    | Castle Bromwich Lions U8 Cubs | `913557206` (https://fulltime.thefa.com/displayTeam.html?divisionseason=796460763&teamID=913557206) | 10 |
    | Castle Bromwich Lions U8 Lions | `794253502` (https://fulltime.thefa.com/displayTeam.html?divisionseason=796460763&teamID=794253502) | 10 |
    | Castle Bromwich Lions U8 Spitfires | `457917099` (https://fulltime.thefa.com/displayTeam.html?divisionseason=796460763&teamID=457917099) | 11 |

  - Other age groups: **TBD**. The team data model must let admins add new age groups and teams, each with its own Full-Time team ID, without code changes.
  - Group teams by age group on the site. The "Our Teams" page lists age groups, and each age group lists its teams. Keep the nicknames (Colts, Cubs, Lions, Spitfires) as each team's identity, and give each team its own page, fixtures feed and calendar.
- **Club colours (from the crest):** red `#D7262B`, royal blue `#1F4FA3`, yellow/gold `#F7D417`, black `#111111`. White is the neutral.
- **Crest:** A shield split into red and blue quarters with a yellow border. It shows a crowned yellow lion with two footballs and the words "Castle Bromwich" / "Lions FC". High-res crest file: **TBD**. Until it arrives, use a cropped placeholder taken from the Facebook profile picture, and keep it easy to swap. Don't redesign the crest.
- **Current campaign / tagline:** "Say hello to our best season yet."
- **Committee contacts:**
  - Chairman: Hassan Saleh, 07810 015315
  - Secretary: Luke Sandford, 07900 561839
  - Welfare Officer: **TBD** (required for an FA-accredited youth club)
- **Email:** **TBD**. Until confirmed, send contact and registration forms to an address set in config.
- **Social links:** Facebook https://www.facebook.com/share/1DMu8eeUUJ/ , Instagram **TBD**, TikTok **TBD**. Hide the icon for any link that isn't set.
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
   - **Venue naming.** Full-Time names the home venue "CASTLE BROMWICH PLAYING FIELDS" with a pitch (e.g. "Pitch 3", "Pitch 1A"), while the club calls it Arden Hall Playing Fields. Map both names to one venue record (B36 9PB), keeping the pitch number. Away venues come from Full-Time as free text (e.g. "ARDEN GARAGES STADIUM 3G Pitch 1A"). Keep a venues file that maps those names to a tidy display name, postcode and map link, and add new venues as the import finds them.
   - **Match status codes.** Full-Time shows "X - X" for development games with no score recorded. It shows "P - P" for postponed, "A - A" for abandoned and "C - C" for cancelled or void. Show each as a clear status badge. Treat any code not in this list as unknown and flag it to an admin.
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

   Also include a fees and subs section (amounts **TBD**) and a link out to the payment method (**TBD**, e.g. ClubBuzz / Pitchero / bank transfer / GoCardless). Don't handle card details on the site.
8. **Volunteer / Coach with us.** Roles available, DBS check and FA coaching course information, and an enquiry form.
9. **Safeguarding & Welfare.** This is mandatory for a youth club. Include:
   - the Welfare Officer's contact details
   - the FA safeguarding policy
   - codes of conduct for players, parents and coaches
   - the anti-bullying, equality and photography policies
   - links to the FA safeguarding pages and the NSPCC
10. **Sponsors.** Sponsors by tier, with logos and links, plus a "Sponsor a team / kit" enquiry form.
11. **About.** Include:
    - club history: a timeline starting with the founding in June 2024, then each season's milestones such as new teams and the accreditation (milestone dates **TBD**)
    - the accreditation
    - the committee: Chairman Hassan Saleh, Secretary Luke Sandford, Treasurer **TBD**, Welfare Officer **TBD**
    - honours, if any. Hide this section until there's something to show, since the club is new and its U8 teams play non-competitive development football
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
- Seed fixtures with the **real 2026/27 data for all four U8 teams**, taken from Full-Time on 19/11/26 and listed below. The import job then keeps them up to date. Use realistic placeholder content, clearly marked as sample data, for anything else (news, gallery, sponsors). Keep it all in easy-to-edit files. Home venue is Castle Bromwich Playing Fields unless stated otherwise.

  **U8 Colts**

  | Date | Time | Home | Away | Status |
  |---|---|---|---|---|
  | 06/09/26 | 10:00 | **CB Lions U8 Colts** | Silhill U8 Lions | Played (DEVP) |
  | 13/09/26 | 09:30 | Norton Lindsey Juniors U8 All Stars | **CB Lions U8 Colts** | Played (DEVP) |
  | 20/09/26 | 11:30 | C C C U8 Greens | **CB Lions U8 Colts** | Played (DEVP) |
  | 27/09/26 | 10:00 | **CB Lions U8 Colts** | Knowle U8 Bobcats | Played (DEVP) |
  | 04/10/26 | 10:00 | **CB Lions U8 Colts** | Boldmere St Michaels Juniors U8 2018 PE | Played (DEVP) |
  | 11/10/26 | 10:00 | **CB Lions U8 Colts** | Solihull Moors Foundation U8 Blue | Played (DEVP) |
  | 18/10/26 | 11:00 | Bartley Reds U8 | **CB Lions U8 Colts** | Played (DEVP) |
  | 25/10/26 | 11:30 | Coleshill Town U8 Panthers | **CB Lions U8 Colts** | Played (DEVP) |
  | 01/11/26 | 12:00 | Olton Ravens U8 Stars | **CB Lions U8 Colts** | Played (DEVP) |
  | 08/11/26 | 10:00 | **CB Lions U8 Colts** | Hollywood United U8 | Played (DEVP) |
  | 15/11/26 | 10:00 | **CB Lions U8 Colts** | Wychall Wanderers Juniors U8 Colts | Played (DEVP) |
  | 22/11/26 | 10:00 | **CB Lions U8 Colts** | Arden Forest U8 Yellow | Upcoming, Castle Bromwich Playing Fields Pitch 1A |
  | 29/11/26 | 09:30 | Stratford Town Colts U8 Bards Aces | **CB Lions U8 Colts** | Upcoming, Arden Garages Stadium 3G Pitch 1A |

  **U8 Cubs** (no fixture on 25/10/26)

  | Date | Time | Home | Away | Status |
  |---|---|---|---|---|
  | 06/09/26 | 09:30 | Solihull Moors Foundation U8 AB | **CB Lions U8 Cubs** | Played (DEVP) |
  | 13/09/26 | 10:30 | **CB Lions U8 Cubs** | Bournville U8 | Played (DEVP) |
  | 20/09/26 | 10:00 | C C C U8 Hoops | **CB Lions U8 Cubs** | Played (DEVP) |
  | 27/09/26 | 09:30 | Kings Heath Panthers U8 KDN | **CB Lions U8 Cubs** | Played (DEVP) |
  | 04/10/26 | 09:30 | Stratford Town Colts U8 Bards Aces | **CB Lions U8 Cubs** | Played (DEVP) |
  | 11/10/26 | 10:30 | **CB Lions U8 Cubs** | Solihull Moors Foundation U8 Y | Played (DEVP) |
  | 18/10/26 | 10:30 | **CB Lions U8 Cubs** | Boldmere St Michaels Juniors U8 2018 JA | Played (DEVP) |
  | 01/11/26 | 10:30 | **CB Lions U8 Cubs** | Kingshurst Pavilions Sports Club U8 Colt | Played (DEVP) |
  | 08/11/26 | 10:30 | **CB Lions U8 Cubs** | F C Elite U8 Blaze | Played (DEVP) |
  | 15/11/26 | 11:00 | Kings Heath Panthers U8 TL | **CB Lions U8 Cubs** | Played (DEVP) |
  | 22/11/26 | 12:00 | Wychall Wanderers Juniors U8 Tigers | **CB Lions U8 Cubs** | Upcoming, Wychall Wanderers FC Pitch 2 |
  | 29/11/26 | 10:30 | **CB Lions U8 Cubs** | Baller Boys U8 | Listed as "C - C" (cancelled/void), so show it as cancelled |

  **U8 Lions** (no fixture on 15/11/26)

  | Date | Time | Home | Away | Status |
  |---|---|---|---|---|
  | 06/09/26 | 11:15 | **CB Lions U8 Lions** | Silhill U8 Bears | Played (DEVP) |
  | 13/09/26 | 12:30 | Glades U8 | **CB Lions U8 Lions** | Played (DEVP) |
  | 20/09/26 | 11:15 | **CB Lions U8 Lions** | Coldlands Colts U8 Blacks | Played (DEVP) |
  | 27/09/26 | 11:15 | **CB Lions U8 Lions** | F C Elite U8 Blaze | Played (DEVP) |
  | 04/10/26 | 10:30 | Arden Forest U8 S6 | **CB Lions U8 Lions** | Played (DEVP) |
  | 11/10/26 | 09:30 | Starz Academy U8 CWYFL | **CB Lions U8 Lions** | Played (DEVP) |
  | 18/10/26 | 09:30 | P and E Sports U8 Madrid | **CB Lions U8 Lions** | Played (DEVP) |
  | 25/10/26 | 11:15 | **CB Lions U8 Lions** | Sutton United U8 Panthers | Played (DEVP) |
  | 01/11/26 | 11:15 | **CB Lions U8 Lions** | Hampton U8 | Played (DEVP) |
  | 08/11/26 | 11:15 | **CB Lions U8 Lions** | Your Performance Group U8 I | Played (DEVP) |
  | 22/11/26 | 09:30 | Vision U8 BHAM DD | **CB Lions U8 Lions** | Upcoming, Castle Vale Football Stadium CV1C |
  | 29/11/26 | 11:00 | Vision U8 Lions | **CB Lions U8 Lions** | Upcoming, North Warwickshire & South Leicestershire College (Nuneaton) Pitch 3 |

  **U8 Spitfires**

  | Date | Time | Home | Away | Status |
  |---|---|---|---|---|
  | 06/09/26 | 09:30 | Silhill U8 Tigers | **CB Lions U8 Spitfires** | Played (DEVP) |
  | 13/09/26 | 10:30 | **CB Lions U8 Spitfires** | C C C U8 Greens | Played (DEVP) |
  | 20/09/26 | 10:30 | Cadbury Athletic U8 Juniors | **CB Lions U8 Spitfires** | Played (DEVP) |
  | 27/09/26 | 09:30 | Arden Forest U8 Black | **CB Lions U8 Spitfires** | Played (DEVP) |
  | 04/10/26 | 10:30 | **CB Lions U8 Spitfires** | Vision U8 Lions | Played (DEVP) |
  | 11/10/26 | 10:30 | **CB Lions U8 Spitfires** | Olton Ravens U8 Stars | Played (DEVP) |
  | 18/10/26 | 10:30 | **CB Lions U8 Spitfires** | Olton Ravens U8 OR | Played (DEVP) |
  | 25/10/26 | 10:30 | **CB Lions U8 Spitfires** | C C C U8 Whites | Played (DEVP) |
  | 01/11/26 | 09:30 | Silhill U8 Bears | **CB Lions U8 Spitfires** | Played (DEVP) |
  | 08/11/26 | 11:00 | Bartley Reds U8 | **CB Lions U8 Spitfires** | Played (DEVP) |
  | 15/11/26 | 09:30 | Inkberrow Youth U8 Kestrels | **CB Lions U8 Spitfires** | Played (DEVP) |
  | 22/11/26 | 10:30 | **CB Lions U8 Spitfires** | Hampton U8 Reds AOB | Upcoming, Castle Bromwich Playing Fields Pitch 3 |
  | 29/11/26 | 10:30 | **CB Lions U8 Spitfires** | Cottage Farm Rangers U8 United | Upcoming, Castle Bromwich Playing Fields Pitch 3 |

- Include a README with setup steps, how to edit content, and how to deploy.

## Handling TBD details
- Keep every TBD value in one config/content file (e.g. `content/club.json`) so the committee can fill it in later without a developer.
- Show nothing broken or empty to visitors while a value is TBD. Hide the field, or show a neutral fallback such as "Contact the club via Facebook".
- **Exception:** the Welfare Officer contact is a safeguarding requirement. Until it's set, the Safeguarding page shows the Secretary's contact with a note, and the admin area shows a visible "Welfare Officer not set" warning.
- Add a "Pending club details" list to the README naming each TBD item.

## Deliverables
1. A working codebase in this repository.
2. Real 2026/27 fixtures for all four U8 teams (Colts, Cubs, Lions, Spitfires), plus sample news and gallery content for the 2026/27 season, plus the Full-Time import job.
3. A README and a short admin guide written for club volunteers.

Start by proposing the site map, design direction (red/blue/yellow lion identity, typography, mood) and tech stack in a short plan. Then build the site page by page.
