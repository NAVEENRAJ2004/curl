# Mini Webhook Listener

A tiny one-page webhook viewer. Send any request to `/listen` and it shows up on the page.

## Local development

Install dependencies (none for runtime) and run Vercel dev server:

```powershell
npm install
npx vercel dev
```

Open the URL printed by the dev server and send a request:

```powershell
Invoke-RestMethod -Uri http://localhost:3000/listen -Method Post -ContentType "application/json" -Body '{"hello":"world"}'
```

## Notes

- The `/listen` path rewrites to `/api/listen` for Vercel compatibility.
- If Upstash Redis is configured, events are stored so they show in production.
- Without Redis, events are kept in memory and reset on redeploy.

## Free storage setup (Upstash Redis)

1. In Vercel, go to your project → **Storage**.
2. Click **Create Database** → choose **Redis** (Upstash).
3. Select the **Free** plan and create it.
4. Click **Connect Project** and pick this project.

This will set `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` automatically.
If your integration uses `KV_REST_API_URL` and `KV_REST_API_TOKEN`, those work too.

## Tests

```powershell
npm test
```
