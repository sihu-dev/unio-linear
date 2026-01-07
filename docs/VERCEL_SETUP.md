# Vercel Setup Guide

This guide explains how to connect the repository to Vercel and required environment variables.

1. Create a Vercel project and select the GitHub repository `sihu-dev/unio-linear`.
2. In Project Settings > General, set Root Directory if your project is not at repository root.
3. Build Command: `pnpm build`, Output Directory: `.next` (default for Next.js).
4. Add Environment Variables (Settings > Environment Variables):
   - `NEXTAUTH_URL` = `https://<your-domain>.vercel.app`
   - Any production DB URLs, secrets, or tokens your app needs (e.g., `DATABASE_URL`, `GITHUB_TOKEN`, etc.)
5. (Optional) Add Vercel-specific secrets for GitHub Actions deploy:
   - `VERCEL_TOKEN` (personal/organization token)
   - `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` (can be found on Vercel Project Settings)
6. If you want scheduled jobs, use Vercel Cron Jobs or add `vercel.json` with cron configuration.

Notes:
- For monorepos, ensure the Root Directory points to the app folder or set `outputDirectory` in `vercel.json`.
- After setting secrets, you can enable the deploy job in `.github/workflows/ci.yml` by adding the secrets to GitHub repo secrets.
