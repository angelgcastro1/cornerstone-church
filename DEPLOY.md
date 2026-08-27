# Deploy — GitHub + Vercel

This folder is already a Git repository with an initial commit on the **main** branch.
It's a pure static site (an `index.html` at the root, no build step), so Vercel deploys it with zero configuration.

## 1) Push to GitHub

**Option A — GitHub CLI (fastest):**

```bash
gh repo create cornerstone-church --public --source . --remote origin --push
```

**Option B — Manual:**

1. Create a new **empty** repo at https://github.com/new — name it e.g. `cornerstone-church`. Do **not** add a README, .gitignore, or license (this repo already has them).
2. In this folder, run:

```bash
git remote add origin https://github.com/<your-username>/cornerstone-church.git
git push -u origin main
```

## 2) Deploy on Vercel

1. Go to https://vercel.com/new
2. **Import** the GitHub repo you just pushed.
3. **Framework Preset:** choose **Other** (static site — no build command, no output dir).
4. Click **Deploy**.

That's it. Vercel gives you a live URL, and every future `git push` to `main` auto-deploys.

**CLI alternative:**

```bash
npm i -g vercel
vercel          # first run creates/links the project
vercel --prod   # production deploy
```

## Notes

- No secrets or API keys are in this repo — safe to make public.
- The hero video (`assets/video/worship-hero.mp4`, ~7 MB) is bundled locally.
- Section images currently load from Higgsfield's CDN. If you'd rather bundle them locally
  (fully self-contained), download the 12 images into `assets/img/` and swap the `<img src>`
  URLs — happy to help with that.
