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
- Events are kept in memory and reset on redeploy.

## Tests

```powershell
npm test
```
