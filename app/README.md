# The Burning Archive

A minimalist portfolio website featuring Times New Roman typography and a black/red/white color scheme with fluid scroll animations.

## Features

- **Typography**: Times New Roman throughout for an elegant, editorial aesthetic
- **Color Scheme**: Dominant black background, secondary red (#FF0000), white text
- **Sections**: About, Substack, Instagram, Writings
- **Animations**: GSAP-powered scroll animations with Lenis smooth scrolling
- **Custom Cursor**: Red ring cursor with hover effects
- **Loading Screen**: Typewriter effect with split-screen reveal

## Tech Stack

- React + TypeScript + Vite
- Tailwind CSS
- GSAP (GreenSock Animation Platform)
- Lenis (Smooth scrolling)
- Lucide React (Icons)

## Project Structure

```
src/
├── components/        # Reusable components
│   ├── CustomCursor.tsx
│   └── LoadingScreen.tsx
├── sections/          # Page sections
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Substack.tsx
│   ├── Instagram.tsx
│   ├── Writings.tsx
│   └── Footer.tsx
├── styles/            # Additional styles
├── hooks/             # Custom React hooks
├── assets/            # Static assets
├── App.tsx            # Main application
├── App.css            # App-specific styles
├── index.css          # Global styles
└── main.tsx           # Entry point
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd the-burning-archive
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

---

## GitHub Pages Deployment

### Method 1: Automatic Deployment with GitHub Actions (Recommended)

1. **Push your code to GitHub**:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under "Source", select **GitHub Actions**

3. **The workflow will automatically deploy your site** on every push to the main branch.

### Method 2: Manual Deployment

1. **Update `vite.config.ts`**:
   - Open `vite.config.ts`
   - Change `base: '/'` to `base: '/YOUR_REPO_NAME/'`
   - Example: if your repo is "the-burning-archive", use `base: '/the-burning-archive/'`

2. **Build the project**:
```bash
npm run build
```

3. **Deploy using `gh-pages` package**:
```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
# "deploy": "gh-pages -d dist"

# Deploy
npm run deploy
```

4. **Enable GitHub Pages**:
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: gh-pages /root

### Important: Fixing the Black Screen Issue

If you see a black screen after deploying to GitHub Pages, the issue is with the **base path** in `vite.config.ts`.

**For Project Sites** (e.g., `username.github.io/repo-name/`):
```typescript
// vite.config.ts
export default defineConfig({
  base: '/your-repo-name/',  // MUST match your repository name
  // ...
});
```

**For Custom Domains** (e.g., `yourdomain.com`):
```typescript
// vite.config.ts
export default defineConfig({
  base: '/',  // Use root path for custom domains
  // ...
});
```

After changing the base path, **rebuild and redeploy**:
```bash
npm run build
npm run deploy
```

---

## Customization

### Colors

Edit the CSS variables in `src/index.css`:

```css
--color-black: 0 0% 0%;
--color-white: 0 0% 100%;
--color-red: 0 100% 50%;
```

### Content

Update the content in each section file:
- `src/sections/About.tsx` - About section content
- `src/sections/Substack.tsx` - Article list
- `src/sections/Instagram.tsx` - Instagram grid
- `src/sections/Writings.tsx` - Publications list

## License

MIT
