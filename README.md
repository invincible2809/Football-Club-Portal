# Castle Bromwich Lions FC – club website

The official website for **Castle Bromwich Lions FC** (youth), an England Football Accredited (1 Star) club playing in the
Central Warwickshire Youth Football League (CWYFL). Founded June 2024. Home ground: Arden Hall Playing Fields, B36 9PB.

Built with **Next.js + Tailwind CSS** as a fully static site, so it can be hosted free on Netlify. The brief it was built from is in [`PORTAL_PROMPT.md`](PORTAL_PROMPT.md).

## What's on the site

| Page | What it does |
|---|---|
| Home | Hero, next match with countdown, upcoming fixtures, teams, news, join/volunteer calls to action |
| Teams / team pages | One page per team with fixtures, played games, calendar subscription and Full-Time link |
| Fixtures | Every team's fixtures, filterable by team and upcoming/played |
| Tables | Explains development football (no tables) and links to Full-Time |
| News | Articles from `content/news/`, plus an opt-in Facebook feed |
| Gallery | Photo albums (consented photos only) |
| Join, Volunteer, Sponsors, Contact | Forms (hidden until a form endpoint is set; contact details shown instead) |
| Safeguarding, About, Privacy | Welfare contact, codes of conduct, club timeline, committee, ground map, privacy notice |
| `/calendars/<team>.ics` | Calendar feeds parents can subscribe to on their phones |
| `/admin/` | Browser-based editor for committee members (Decap CMS) |

## Getting started (developers)

```bash
npm install
npm run dev          # http://localhost:3000
npm test             # Full-Time parser tests
npm run build        # static site in out/
npm run import:fulltime   # pull latest fixtures from FA Full-Time into content/fixtures.json
```

Needs Node 20 or newer.

## Where the content lives

Everything editable is in `content/`. Committee members edit it through `/admin/`; developers can edit the files directly.

| File | Contents |
|---|---|
| `content/club.json` | Club details, contacts, ground, social links, fees, form endpoint, timeline. `null` means **TBD** and is hidden on the site |
| `content/teams.json` | Teams with their FA Full-Time team IDs |
| `content/fixtures.json` | Fixtures and results (updated automatically from Full-Time) |
| `content/venues.json` | Maps Full-Time venue names to tidy names and postcodes |
| `content/news/*.md` | News articles (Markdown with a short header) |
| `content/sponsors.json`, `content/gallery.json` | Sponsors and photo albums |
| `public/images/crest.png` | Club crest – **placeholder cropped from Facebook; replace with the high-res file** |

## Fixtures from FA Full-Time

`scripts/import-fulltime.mjs` reads each team's Full-Time page and merges the fixtures into `content/fixtures.json`.
The **Import fixtures from FA Full-Time** GitHub Action runs it every morning and commits any changes, which redeploys the site.

- It never deletes fixtures (Full-Time only shows recent results), and keeps existing data if Full-Time can't be reached.
- Fixtures edited by hand can be marked `"locked": true` so the import won't overwrite them.
- Full-Time status codes: `X - X` played (no score – development football), `P - P` postponed, `A - A` abandoned, `C - C` cancelled. Anything else is shown as "Check status" and logged as a warning.
- Adding a team: add it to `content/teams.json` with its Full-Time team ID (and division-season ID) – fixtures appear after the next import.

## Deploying (Netlify, free)

1. Create a Netlify site from this GitHub repo. `netlify.toml` already sets the build command and the `out` folder.
2. **Admin login:** in Netlify, enable *Identity*, set registration to *Invite only*, enable *Git Gateway*, then invite committee members by email.
3. **Daily rebuild:** create a Netlify *build hook* and save it in GitHub as the `NETLIFY_BUILD_HOOK` repository secret.
4. **Forms:** create a free form endpoint (e.g. Formspree) and paste its URL into *Club settings → Form endpoint*. Until then forms are hidden and visitors see phone/Facebook contact details instead.
5. Set the real web address in `content/club.json` (`siteUrl`) and `public/admin/config.yml` (`site_url`).

## Pending club details (TBD)

These are not yet known. They're `null` in `content/club.json`, hidden on the site, and listed as warnings on every build (`npm run check:content`):

- [ ] Club Welfare Officer – **safeguarding requirement**; the site shows the Secretary until it's set
- [ ] Treasurer
- [ ] Club email address
- [ ] Fees & subs, and payment method / link
- [ ] Form endpoint (enables online forms)
- [ ] Instagram and TikTok links
- [ ] Facebook page URL (`facebook.com/<page>`) for the news-page feed
- [ ] Accreditation date and other timeline milestones
- [ ] Any teams outside U8, with their Full-Time IDs
- [ ] High-res club crest file
- [ ] Training times and managers for each team
- [ ] Real web address (domain)

Sample news articles are marked `sample: true` and say "[Sample article – replace or delete]".

## Child protection

- No squad lists or children's surnames anywhere on the site (matching Full-Time's own policy).
- Gallery photos only with recorded parental consent; children are never named.
- Team managers' phone numbers aren't published; enquiries go through the club.
- No analytics or advertising cookies. The Facebook feed only loads when a visitor clicks to load it.

See [`docs/ADMIN-GUIDE.md`](docs/ADMIN-GUIDE.md) for the volunteer guide.
