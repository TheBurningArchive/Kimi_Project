# Julia Cameron Portfolio

A minimalist portfolio website featuring Times New Roman typography and a black/red/white color scheme with fluid scroll animations.

## Features

- **Typography**: Times New Roman throughout for an elegant, editorial aesthetic
- **Color Scheme**: Dominant black, secondary red (#FF0000), white text accents
- **Sections**: About Us, Substack, Instagram, Writings
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
cd my-app
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

## Deployment

This project is ready for deployment on GitHub Pages, Vercel, Netlify, or any static hosting service.

### GitHub Pages

1. Push to GitHub
2. Enable GitHub Pages in repository settings
3. Set source to the `dist` folder (or root if using a separate branch)

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
