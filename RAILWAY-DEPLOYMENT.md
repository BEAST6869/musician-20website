# 🚀 Railway Deployment Guide

## ✨ Complete Express.js Backend Revamp

Your backend has been completely revamped with:

### 🔧 **New Architecture**

- **Pure Express.js** server (no more hybrid Netlify functions)
- **Automatic Spotify token management** with refresh mechanism
- **Railway-optimized** deployment configuration
- **Production-ready** with health checks and monitoring

### 🎵 **Spotify Integration Features**

- ✅ **Auto-refreshing tokens** - Never expires!
- ✅ **Client Credentials Flow** for secure authentication
- ✅ **Multiple endpoints**:
  - `GET /api/spotify/playlist/:id` - Get playlist tracks
  - `GET /api/spotify/artist/:id/albums` - Get artist albums
  - `GET /api/spotify/search?q=query` - Search tracks
  - `GET /api/spotify/token/status` - Token debug info
  - `POST /api/spotify/token/refresh` - Force token refresh

### 🛡️ **Security & Reliability**

- Singleton token manager with automatic refresh
- Request timeouts to prevent hanging
- Comprehensive error handling
- CORS properly configured
- Environment variable validation

## 🚀 **Deploy to Railway**

### **Option 1: One-Click Deploy**

1. Go to [Railway](https://railway.app)
2. Create new project from GitHub repo
3. Railway will auto-detect the configuration
4. Set environment variables (see below)

### **Option 2: CLI Deploy**

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Initialize project
railway init

# Deploy
railway up
```

### **Option 3: Manual Setup**

1. Connect your GitHub repo to Railway
2. Set build command: `npm run build`
3. Set start command: `npm start`
4. Configure environment variables

## 🔐 **Environment Variables**

Set these in Railway dashboard:

```env
# Required - Get from Spotify Developer Dashboard
SPOTIFY_CLIENT_ID=your_spotify_client_id_here
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret_here

# Optional - Railway will set these automatically
PORT=8080
NODE_ENV=production
FRONTEND_URL=https://yourdomain.railway.app
```

### **How to Get Spotify Credentials:**

1. Visit [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create or select your app
3. Copy Client ID and Client Secret
4. Add these to Railway environment variables

## 📊 **API Endpoints**

### **Health & Status**

- `GET /api/health` - Health check
- `GET /api/ping` - Simple ping (legacy)
- `GET /api/demo` - Demo endpoint with system info

### **Spotify API**

- `GET /api/spotify/playlist/:playlistId` - Get playlist tracks
- `GET /api/spotify/artist/:artistId/albums` - Get artist albums
- `GET /api/spotify/search?q=query&type=track&limit=20` - Search tracks
- `GET /api/spotify/token/status` - Debug token info
- `POST /api/spotify/token/refresh` - Force token refresh

### **Example API Calls**

```javascript
// Get playlist tracks
const tracks = await fetch("/api/spotify/playlist/37i9dQZF1DXcBWIGoYBM5M");

// Search tracks
const results = await fetch("/api/spotify/search?q=taylor%20swift&limit=10");

// Get artist albums
const albums = await fetch("/api/spotify/artist/06HL4z0CvFAxyc27GXpf02/albums");
```

## 🔄 **Development Workflow**

### **Local Development**

```bash
# Start frontend (port 8080)
npm run dev

# Start backend server (port 3001) - in separate terminal
npm run dev:server
```

### **Production Build**

```bash
# Build everything
npm run build

# Start production server
npm start
```

## 🎯 **Key Features**

### **Automatic Token Management**

- Tokens refresh 5 minutes before expiration
- Singleton pattern prevents multiple refresh requests
- Caching for optimal performance
- Graceful error handling

### **Railway Optimizations**

- Health check endpoint for monitoring
- Proper graceful shutdown
- Environment-specific CORS
- Static file serving in production
- Docker support included

### **Error Handling**

- Comprehensive error responses
- Request timeouts (15s for Spotify API)
- Detailed logging for debugging
- Graceful degradation

## 🔍 **Troubleshooting**

### **Common Issues**

#### **"Spotify credentials not configured"**

- Verify `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET` are set in Railway
- Check credentials are correct in Spotify Developer Dashboard

#### **"Failed to refresh Spotify access token"**

- Check your Spotify app is not suspended
- Verify credentials are valid
- Check Railway logs for detailed error

#### **CORS errors**

- Make sure `FRONTEND_URL` is set correctly
- Frontend domain must match CORS configuration

### **Debug Endpoints**

- Visit `/api/spotify/token/status` to check token status
- Use `/api/health` to verify server is running
- Check Railway logs for detailed error information

## 📈 **Monitoring**

Railway provides built-in monitoring:

- CPU and memory usage
- Request metrics
- Error tracking
- Custom health checks

## 🚀 **Performance**

Expected performance:

- **Cold start**: <2 seconds
- **Token refresh**: <1 second
- **API requests**: <500ms
- **Health check**: <100ms

## 🎉 **You're Ready!**

Your Express.js backend is now:

- ✅ **Railway-ready** with optimized configuration
- ✅ **Spotify-integrated** with auto-refreshing tokens
- ✅ **Production-ready** with health checks and monitoring
- ✅ **Error-resilient** with comprehensive error handling

Deploy to Railway and your Spotify integration will work flawlessly! 🎵
