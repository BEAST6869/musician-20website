# Fusion Starter - GitHub Pages Edition

A production-ready React application configured for GitHub Pages deployment with modern tooling.

## 🚀 Tech Stack

- **Frontend**: React 18 + TypeScript + Vite + TailwindCSS 3
- **Routing**: React Router 6 with Hash Routing (GitHub Pages compatible)
- **UI**: Radix UI + Lucide React icons
- **Testing**: Vitest
- **Deployment**: GitHub Pages with GitHub Actions

## 📁 Project Structure

```
client/                   # React SPA frontend
├── pages/                # Route components (Index.tsx = home)
├── components/ui/        # Pre-built UI component library
├── App.tsx               # App entry point with hash routing
└── global.css            # TailwindCSS 3 theming and global styles
```

## 🛠️ Development

```bash
npm install               # Install dependencies
npm run dev              # Start development server
npm run build            # Build for production
npm run typecheck        # TypeScript validation
npm test                 # Run tests
```

## 🌐 GitHub Pages Deployment

### Automatic Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions:

1. **Push to main/master branch** triggers automatic deployment
2. **GitHub Actions workflow** builds and deploys the app
3. **Available at**: `https://yourusername.github.io/your-repo-name/`

### Manual Deployment

```bash
npm run deploy          # Build and deploy to gh-pages branch
```

## ⚙️ Configuration

### Repository Setup

1. **Update repository name** in `vite.config.ts`:

   ```typescript
   const base = mode === "production" ? "/your-repo-name/" : "/";
   ```

2. **Update 404.html** with your repository name:

   ```javascript
   const base = "/your-repo-name/";
   ```

3. **Enable GitHub Pages** in repository settings:
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: gh-pages / (root)

### Hash Router

This project uses React Router's `HashRouter` for GitHub Pages compatibility. URLs will have the format:

- `https://yourusername.github.io/your-repo-name/#/`
- `https://yourusername.github.io/your-repo-name/#/about`

## 🎨 Styling System

- **Primary**: TailwindCSS 3 utility classes
- **Theme**: Cyberpunk-inspired color palette with neon accents
- **Components**: Pre-built library in `client/components/ui/`
- **Dark Mode**: Built-in support with CSS variables

## 📱 Features

- ⚡ Fast development with Vite
- 🎨 Modern UI components with Radix UI
- 🌙 Dark mode support
- 📱 Responsive design
- 🔍 TypeScript for type safety
- 🧪 Testing setup with Vitest
- 🚀 Automatic GitHub Pages deployment
- 🎭 Cyberpunk-themed design system

## 🔧 Adding Features

### New Page Route

1. Create component in `client/pages/MyPage.tsx`
2. Add route in `client/App.tsx`:

```typescript
<Route path="/my-page" element={<MyPage />} />
```

### Custom Components

- Use existing UI components from `client/components/ui/`
- Follow the established patterns for styling and props
- Leverage the `cn()` utility for conditional classes

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
