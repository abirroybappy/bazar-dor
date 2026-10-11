# Delivery verification

Checked on 10 October 2026.

- `npm run lint`: passed without errors or warnings.
- `npm test`: both Bengali numeric parsing/sorting tests passed.
- `npm run build`: compiled, TypeScript checked and production routes generated successfully.
- Live API: 33 products; home renders 45 cards including the six risers and six fallers. Rice category renders four products.
- Chromium: home, rice category, signup, signin, invalid category and unknown product rendered the expected headings. No uncaught client JavaScript errors in this flow.
- Ascending rice prices: ৬৬, ৭৪, ৯৯, ১৪৮.
- At a 390px viewport, home, signup and rice category each had a 390px document width (no horizontal overflow).
- Empty signup submission displayed a validation error.
- Anonymous visits to `/profile`, `/profile/update` and a valid product detail page redirected to `/signin?reason=protected`; no client JavaScript errors.
- Desktop and mobile home screenshots were inspected. Emoji rendering depends on the operating system's color-emoji fonts; common platform font fallbacks are included.

## Requires your environment before submission

The delivery environment had no configured PostgreSQL service or OAuth credentials. BetterAuth logged database-schema connection errors during build; the build still exited successfully. Database migration execution, email signup/signin, authenticated product pages, name persistence, logout and real Google/GitHub callbacks must be verified after configuring `.env.local` and running `npm run db:migrate`.

The server first checks for a session cookie to redirect anonymous visitors, then validates any present session through BetterAuth; cookie presence is not treated as proof of login.

No live deployment or successful real-account OAuth test is claimed. Follow the README deployment steps and test refresh on dynamic routes before submission.

Next.js may stream its loading shell before discovering an invalid route; in that case the network status can be 200 while the friendly not-found UI and noindex response are rendered. This is normal App Router streaming behavior.
