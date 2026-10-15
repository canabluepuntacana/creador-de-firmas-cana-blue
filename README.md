# Creador de Firmas · Canablue

Signature creator for Canablue agents. Table-based, email-safe HTML output.

## Run

Open `creador-firmas/index.html` in a browser, or serve the folder:

```bash
npx serve creador-firmas
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

- `creador-firmas/data/agents.json` — shared source of truth, loaded with `fetch()`.
- Browser `localStorage` — form autosave + custom agents saved with **Save agent**.
- **Export JSON** downloads `agents.json` — replace the file and commit to publish.
