# Creador de Firmas · Canablue

Signature creator for Canablue agents. Table-based, email-safe HTML output.

## Run

Live site (GitHub Pages): https://canabluepuntacana.github.io/creador-de-firmas-cana-blue/

Locally, open `index.html` in a browser, or serve the folder:

```bash
npx serve .
```

> `data/agents.json` loads via `fetch()`, so use http(s) — not `file://` — for the shared agents list (built-in fallback included).

## Push to GitHub (repo: creador-de-firmas-cana-blue)

```bash
cd CreadorFirmas
git init
git add .
git commit -m "Creador de firmas Canablue"
gh repo create creador-de-firmas-cana-blue --public --source=. --push
```

Without `gh`:

```bash
git remote add origin https://github.com/TU-USUARIO/creador-de-firmas-cana-blue.git
git branch -M main
git push -u origin main
```

## Agents persistence (static page)

- `data/agents.json` — shared source of truth, loaded with `fetch()`.
- Browser `localStorage` — form autosave + custom agents saved with **Save agent**.
- **Export JSON** downloads `agents.json` — replace the file and commit to publish.

## Google Sheets database

1. Create a spreadsheet with a tab named `Agentes` and this exact header row:
   `key | name | role | zona | tel | email | web | dir | dirUrl | listings | linkedin | instagram | whatsapp | foto | logo | color | crs | aei | realtor | sr23 | sr24 | lux`
   Cert columns use `TRUE` / `FALSE`. One agent per row.
2. Share → General access → **Anyone with the link** (Viewer).
3. Copy the spreadsheet ID from its URL (`/d/ID/edit`) and paste it in the
   creator's **Google Sheet ID** field → **Reload**. The ID is remembered.
4. The creator loads Sheets first, then `data/agents.json`, then built-ins.
   Browser-saved agents always merge on top.
