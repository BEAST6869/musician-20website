# 🎵 SHELBY MACKAY - Cyberpunk Musician Portfolio

![Cyberpunk Music Website](https://img.shields.io/badge/Status-Live-brightgreen)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue)
![Vite](https://img.shields.io/badge/Vite-6.2.2-purple)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.11-blue)

> A futuristic, cyberpunk-themed portfolio website for electronic music producer Shelby Mackay. Features dynamic Spotify integration, immersive animations, and a neon-soaked digital aesthetic.

## 🌟 Features

### 🎮 **Cyberpunk Aesthetic**

- **Neon Color Palette**: Electric pink, cyan, green, and violet neon colors
- **Glitch Effects**: Animated text glitches and visual distortions
- **Interactive Elements**: Floating geometric shapes that respond to mouse movement
- **Grid Background**: Animated cyberpunk grid overlay
- **Custom Scrollbar**: Themed scrollbar with neon glow effects

### 🎵 **Music Integration**

- **Spotify API**: Dynamic discography loading from Spotify playlists
- **Real Album Artwork**: Fetches actual cover images from Spotify
- **Interactive Play Buttons**: Cyberpunk-styled play overlays on track cards
- **Social Media Links**: Direct links to Spotify, Apple Music, YouTube, Instagram

### ✨ **Modern Tech Stack**

- **React 18** with TypeScript for type safety
- **Framer Motion** for smooth animations and transitions
- **TailwindCSS** for utility-first styling with custom cyberpunk theme
- **Vite** for lightning-fast development and building
- **Express Server** for API endpoints (if needed)

### 📱 **Responsive Design**

- Mobile-first design that works on all screen sizes
- Adaptive layouts for desktop, tablet, and mobile
- Touch-friendly interactions for mobile devices

## 🚀 Live Demo

**🔗 [View Live Website](https://c03c609af7944ffabfdbdd4bdd70d341-43a7daccf28849e693b11fd40.fly.dev/)**

## 🛠️ Tech Stack

| Technology          | Version | Purpose                 |
| ------------------- | ------- | ----------------------- |
| **React**           | 18.3.1  | Frontend framework      |
| **TypeScript**      | 5.5.3   | Type safety             |
| **Vite**            | 6.2.2   | Build tool & dev server |
| **TailwindCSS**     | 3.4.11  | Styling framework       |
| **Framer Motion**   | 12.6.2  | Animations              |
| **Express**         | 4.18.2  | Backend server          |
| **Spotify Web API** | -       | Music data integration  |
| **Lucide React**    | 0.462.0 | Icons                   |

## 📦 Installation

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Spotify Developer Account** (for API integration)

### 1. Clone the Repository

```bash
git clone https://github.com/BEAST6869/musician-20website.git
cd musician-20website
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Spotify API (Optional)

For dynamic music loading, set up Spotify integration:

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new app and get your credentials
3. Get an access token from [Spotify Web Console](https://developer.spotify.com/console/get-playlist/)
4. Update `client/lib/spotify-playlist.ts`:

```typescript
const SPOTIFY_CONFIG = {
  ACCESS_TOKEN: "YOUR_SPOTIFY_ACCESS_TOKEN_HERE",
  PLAYLIST_ID: "YOUR_PLAYLIST_ID_HERE",
};
```

### 4. Start Development Server

```bash
npm run dev
```

The site will be available at `http://localhost:8080`

## 🎨 Customization

### **Colors & Theme**

The cyberpunk color palette is defined in `client/global.css`:

```css
:root {
  --neon-pink: 320 100% 50%;
  --neon-green: 120 100% 50%;
  --neon-violet: 270 100% 70%;
  --neon-cyan: 180 100% 50%;
  --neon-orange: 30 100% 50%;
}
```

### **Adding New Tracks**

Update the fallback data in `client/pages/Index.tsx` or configure Spotify API for automatic updates.

### **Social Media Links**

Update social media URLs in the `socialLinks` array in `client/pages/Index.tsx`.

## 🔧 Configuration

### **Spotify Integration**

- **Playlist Mode**: Loads tracks from a public Spotify playlist
- **Automatic Updates**: When playlist is updated, website reflects changes
- **Fallback Data**: Works without API configuration using hardcoded tracks

### **Environment Variables**

No environment variables required for basic functionality. Spotify credentials are configured in the source files.

## 📁 Project Structure

```
musician-20website/
├── client/                 # Frontend React app
│   ├── components/ui/      # Reusable UI components
│   ├── lib/               # Utility libraries
│   │   ├── spotify-playlist.ts  # Spotify API integration
│   │   └── utils.ts       # Helper functions
│   ├── pages/             # Route components
│   │   ├── Index.tsx      # Main homepage
│   │   └── NotFound.tsx   # 404 page
│   └── global.css         # Global styles & cyberpunk theme
├── server/                # Express backend (minimal)
├── shared/                # Shared types
└── public/                # Static assets
```

## 🎵 Music Features

### **Discography Section**

- Interactive track cards with hover animations
- Direct Spotify links for each track
- Real album artwork (when API configured)
- Responsive grid layout

### **Artist Bio**

- Professional artist description
- Genre information and influences
- Toronto-based electronic music focus

### **Social Media Integration**

- Spotify artist profile
- Apple Music releases
- Instagram social presence
- YouTube channel

## 🚀 Deployment

### **Build for Production**

```bash
npm run build
```

### **Deploy to Netlify/Vercel**

The project is ready for deployment to modern hosting platforms:

1. **Netlify**: Connect your GitHub repo for automatic deployments
2. **Vercel**: Use the Vercel CLI or GitHub integration
3. **Fly.io**: Current hosting platform (already configured)

### **Build Output**

- **Client**: Static React app in `dist/spa/`
- **Server**: Express server in `dist/server/`

## 🔒 Security Notes

### **Spotify API**

- Access tokens are currently in frontend code
- **Production Recommendation**: Move token generation to backend
- Current setup is for demo/development purposes

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## ���� Design Philosophy

This website embodies the **cyberpunk aesthetic** with:

- **Neon colors** and glowing effects
- **Futuristic typography** with glitch animations
- **Non-linear layouts** that feel like exploring a digital artifact
- **Immersive experience** prioritizing aesthetics while maintaining usability
- **Tech-noir atmosphere** perfect for electronic music

## 📞 Contact

**Shelby Mackay** - Electronic Music Producer

- 🎵 **Spotify**: [Artist Profile](https://open.spotify.com/artist/5p71wpajbzO90AEiPBej94)
- 🍎 **Apple Music**: [Sacred Queer Heart](https://music.apple.com/us/album/sacred-queer-heart-single/1826390398)
- 📸 **Instagram**: [@sheldoradoshellshock](https://www.instagram.com/sheldoradoshellshock)
- 📺 **YouTube**: [Channel](https://www.youtube.com/channel/UCo8uLZ6bb1zDfKK1_Q8f9BQ)

---

**⭐ If you like this project, please give it a star on GitHub!**

_Built with 💜 in the digital frontier_
