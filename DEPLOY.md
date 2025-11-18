# GitHub Pages Deployment Guide

This project is pre-configured to deploy to GitHub Pages with client-side routing support.

## Quick Setup

1. **Fork or clone this repository**
2. **Update the repository URL in `package.json`** (if you forked/renamed):
   ```json
   "repository": {
     "type": "git",
     "url": "https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git"
   },
   "homepage": "https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/"
   ```
3. **Deploy**:
   ```bash
   npm install
   npm run deploy
   ```

## GitHub Pages Settings

After running `npm run deploy`, enable GitHub Pages in your repository:

1. Go to your repository **Settings**
2. Scroll to **Pages** section
3. Set **Source** to "Deploy from a branch"
4. Select **Branch**: `gh-pages`
5. **Root** should be `/ (root)`
6. Click **Save**

Your site will be available at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

## How It Works

- **Automatic Base Path**: Vite config auto-detects your repository name from `package.json`
- **Client-Side Routing**: Special `404.html` redirects unknown routes to React Router
- **Direct Links**: Users can bookmark and share any route directly
- **Browser Navigation**: Back/forward buttons work correctly

## Local Development

```bash
npm run dev    # Start development server (uses / base path)
npm run build  # Build for production (uses /repo-name/ base path)
npm run deploy # Build and deploy to GitHub Pages
```

## Troubleshooting

**Site shows 404 or loads incorrectly:**

- Check that GitHub Pages source is set to `gh-pages` branch
- Verify repository URL in `package.json` matches your actual repo
- Wait a few minutes after first deployment for GitHub Pages to activate

**Routes don't work on GitHub Pages:**

- Ensure `public/404.html` exists (it should be included)
- Check that `index.html` contains the redirect handling script

**Need a custom domain:**

- Add a `CNAME` file to the `public/` directory with your domain
- Configure DNS settings with your domain provider
