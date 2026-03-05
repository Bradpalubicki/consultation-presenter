# Consultation Presenter — NuStack

AI-powered chairside consultation tool. Show patients what matters, get faster decisions.

## What It Does

- **Procedure Library** — Multi-industry (dental, salon, cosmetic surgery, landscaping)
- **Chairside Presenter** — Fullscreen dark-mode patient-facing view: Overview, How It Works, Benefits, Aftercare, FAQ
- **Patient Pack** — Auto-emails branded consultation summary via Resend after session
- **Session Tracking** — All sessions logged with timestamps
- **Consent-ready** — Flags procedures requiring consent; integrates with consent-engine

## Quick Start

```bash
npm install
cp .env.local .env.local.bak
# Fill in Clerk, Supabase, Resend, Anthropic keys in .env.local
npm run dev
```

## Key Env Vars

| Variable | Description |
|----------|-------------|
| NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY | Clerk public key |
| CLERK_SECRET_KEY | Clerk secret |
| NEXT_PUBLIC_SUPABASE_URL | Supabase URL |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | Supabase anon key |
| ANTHROPIC_API_KEY | Claude API key |
| RESEND_API_KEY | Resend email key |
| NEXT_PUBLIC_INDUSTRY | dental, salon, cosmetic, or landscaping |
| NEXT_PUBLIC_PRACTICE_NAME | Your practice name |

## Roadmap

- [ ] Phase 2: Claude-generated dynamic AI explainers per procedure
- [ ] Phase 3: Hairgen.ai-style visual treatment simulator (hair transplant, cosmetic)
- [ ] Phase 4: Voice AI consultation notes (Whisper + Claude summary)
- [ ] Phase 5: Consent-engine token-based e-sign integration
- [ ] Phase 6: Cherry financing CTA on patient pack

## Connect to Engines

Embed in ak-dental-website, littleroots-studio, or any engine:
- Deploy standalone, link from dashboard
- Patient pack API: POST /api/patient-pack from any engine
