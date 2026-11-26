<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/5d60afa8-ec84-4193-a78d-98a391606c6b

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Customer Accounts and Saved History

When Supabase is configured, the app uses Supabase Auth for customer email/password accounts. Chat conversations and customer-entered visit notes are stored in that project and protected by the row-level security policies in `supabase-schema.sql`.

1. Create a Supabase project and enable email/password authentication.
2. Copy `.env.example` to `.env.local`, keep any existing Gemini settings, and set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to the project's URL and publishable/anon key.
3. Run the contents of `supabase-schema.sql` in the Supabase SQL Editor.
4. Restart the Vite development server and use **Create an account** from the app's sign-in page.

Never put a Supabase service-role key in the browser app. The SQL policies restrict each signed-in customer to their own records. Passwords are handled by Supabase Auth; the app does not store passwords. The auth session is held in browser session storage.

For a local-only demo without Supabase, run `npm run dev:local-demo` to start the SQLite API. The sign-in page offers three one-click demo accounts:

| Patient | Email |
| --- | --- |
| Aarav Sharma | `aarav.demo@example.test` |
| Mira Patel | `mira.demo@example.test` |
| Kabir Mehta | `kabir.demo@example.test` |

Use the **Use demo** buttons; no password is needed for these fictional accounts. You can also register a local demo account with an email and password. Passwords for registered accounts are hashed, and the demo session uses an HttpOnly cookie. Chat history and visit notes persist in `data/local-demo.sqlite` and are scoped by account. That SQLite file is not encrypted at rest. Use fictional data only; this local demo is not suitable for real patient information or deployment.

Doctor records and appointments shown in this prototype are fictional. Visit notes are private customer summaries, not messages sent to a clinician. Do not enter real health information until the deployment has had appropriate privacy, security, and legal review; this prototype does not claim healthcare regulatory compliance.
