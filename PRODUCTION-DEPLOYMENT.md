# 🚀 Production Deployment Guide & Troubleshooting

## 🔧 **Fixed Issues**

### ✅ **"Failed to fetch" Error Resolution**

The "TypeError: Failed to fetch" error occurs when the frontend can't reach the backend API in production. Here's what was fixed:

1. **✅ Express.js Production Setup** - Server now properly starts in production
2. **✅ Static File Serving** - Frontend assets served by Express.js
3. **✅ API Route Integration** - All `/api/*` routes work in production
4. **✅ Environment Detection** - Proper production/development mode switching
5. **✅ Error Handling** - Better fallback to mock data when API fails

## 🛠 **Deployment Platforms**

### **Option 1: Railway (Recommended)**

```bash
# Environment Variables Required:
SPOTIFY_CLIENT_ID=4867425ccf554368bcc7274926d45738
SPOTIFY_CLIENT_SECRET=78007a2fbdad4fa9a1e46e7dc5ac19a7
NODE_ENV=production
PORT=8080

# Build Command: npm run build
# Start Command: npm start
```

### **Option 2: Fly.io**

```bash
# Deploy with:
fly deploy

# Set environment variables:
fly secrets set SPOTIFY_CLIENT_ID=4867425ccf554368bcc7274926d45738
fly secrets set SPOTIFY_CLIENT_SECRET=78007a2fbdad4fa9a1e46e7dc5ac19a7
```

### **Option 3: Docker/Containers**

```bash
# Build image:
docker build -t spotify-app .

# Run with environment variables:
docker run -p 8080:8080 \
  -e SPOTIFY_CLIENT_ID=4867425ccf554368bcc7274926d45738 \
  -e SPOTIFY_CLIENT_SECRET=78007a2fbdad4fa9a1e46e7dc5ac19a7 \
  -e NODE_ENV=production \
  spotify-app
```

## 🐛 **Troubleshooting Production Issues**

### **Issue: "Failed to fetch" Errors**

**Symptoms:**

- Console shows `TypeError: Failed to fetch`
- API calls to `/api/spotify/playlist/*` fail
- Website shows mock data instead of real playlist

**Solutions:**

#### **1. Check Backend Server Status**

```bash
# Test if API is running:
curl https://your-domain.com/api/health

# Should return:
{"status":"healthy","timestamp":"...","uptime":123}
```

#### **2. Verify Environment Variables**

```bash
# Check if Spotify credentials are set:
curl https://your-domain.com/api/spotify/token/status

# Should return:
{
  "hasToken": true,
  "expiresIn": 3600,
  "clientIdConfigured": true,
  "clientSecretConfigured": true
}
```

#### **3. Test Spotify API Directly**

```bash
# Test playlist endpoint:
curl https://your-domain.com/api/spotify/playlist/1ghDr8QsDH7aeP7Jd8OLT9

# Should return real track data with songs from your playlist
```

### **Issue: Static Files Not Loading**

**Symptoms:**

- Website shows 404 errors for CSS/JS files
- Page appears unstyled or broken

**Solutions:**

#### **1. Check Build Output**

```bash
npm run build

# Verify files exist:
ls -la dist/spa/        # Frontend files
ls -la dist/server/     # Backend files
```

#### **2. Verify Production Server Setup**

- Ensure `npm start` runs the Express.js server
- Check that static files are served from `/dist/spa`
- Verify SPA fallback is working for routes

### **Issue: CORS Errors**

**Symptoms:**

- Browser console shows CORS policy errors
- API calls fail with CORS-related messages

**Solutions:**

#### **1. Set Frontend URL Environment Variable**

```bash
# For your deployment platform:
FRONTEND_URL=https://your-domain.com
```

#### **2. Check CORS Configuration**

The Express.js server automatically handles CORS for:

- Development: `localhost:3000`, `localhost:8080`, `localhost:5173`
- Production: Your domain and Railway/Fly.io subdomains

## 📊 **Health Check Endpoints**

Use these to monitor your deployment:

### **Server Health**

```bash
GET /api/health
# Returns server status, uptime, environment
```

### **Spotify Integration Status**

```bash
GET /api/spotify/token/status
# Returns token status and credential configuration
```

### **Force Token Refresh**

```bash
POST /api/spotify/token/refresh
# Manually refresh Spotify access token
```

## 🎯 **Production Optimization**

### **Performance Features:**

- ✅ **Static file serving** with proper caching headers
- ✅ **Token caching** (5-minute cache, auto-refresh)
- ✅ **Request timeouts** to prevent hanging
- ✅ **Graceful error handling** with fallbacks
- ✅ **Health monitoring** endpoints

### **Security Features:**

- ✅ **Environment variable protection** (secrets not in code)
- ✅ **CORS properly configured** for your domain
- ✅ **Request validation** and sanitization
- ✅ **Non-root user** in Docker containers

## 🔄 **Deployment Checklist**

Before deploying, verify:

- [ ] Environment variables set (CLIENT_ID, CLIENT_SECRET)
- [ ] Build completes successfully (`npm run build`)
- [ ] Health check endpoint works (`/api/health`)
- [ ] Spotify API integration works (`/api/spotify/token/status`)
- [ ] Static files are properly served
- [ ] SPA routing works (no 404s on page refresh)

## 🚀 **Quick Deploy Commands**

### **Railway:**

```bash
# Connect repo and set environment variables in dashboard
# Deploy automatically triggers on git push
```

### **Fly.io:**

```bash
fly deploy
fly secrets set SPOTIFY_CLIENT_ID=4867425ccf554368bcc7274926d45738
fly secrets set SPOTIFY_CLIENT_SECRET=78007a2fbdad4fa9a1e46e7dc5ac19a7
```

### **Docker:**

```bash
docker build -t spotify-app .
docker run -p 8080:8080 \
  -e SPOTIFY_CLIENT_ID=4867425ccf554368bcc7274926d45738 \
  -e SPOTIFY_CLIENT_SECRET=78007a2fbdad4fa9a1e46e7dc5ac19a7 \
  spotify-app
```

## 🎉 **Success Indicators**

When deployment works correctly:

- ✅ Website loads without errors
- ✅ Real playlist data shows (not mock data)
- ✅ Songs have proper names, artists, and album covers
- ✅ Clicking songs redirects to Spotify
- ✅ No console errors about "Failed to fetch"
- ✅ Health check returns status 200

Your Spotify playlist integration should now work perfectly in production! 🎵
