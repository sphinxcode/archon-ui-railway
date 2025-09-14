# Archon UI Railway Deployment Instructions

## Current Status
✅ Repository configured with Archon UI source files
✅ Dockerfile and nginx configuration ready
✅ Railway service configured
✅ Environment variables set
✅ Domain configured: https://archon-frontend-production.up.railway.app

## Final Step Required: Connect GitHub Repository

You need to manually connect this repository to Railway:

1. Go to [Railway Dashboard](https://railway.app/project/59ae99d7-dc99-4642-ae06-642cd8d8c83a/service/fdc61239-cbb3-4314-9984-6c088494959e)
2. Click on the `archon-frontend` service
3. Go to **Settings** tab
4. Under **Source**, click **Connect GitHub repo**
5. Select `sphinxcode/archon-ui-railway`
6. Railway will automatically start building and deploying

## Service Configuration

### Environment Variables (Already Set)
- `ARCHON_SERVER_URL`: https://archon-server-production.up.railway.app
- `VITE_API_URL`: https://archon-server-production.up.railway.app
- `VITE_ARCHON_SERVER_PORT`: 8181
- `NODE_ENV`: production
- Railway automatically provides `PORT`

### Build Configuration
- **Root Directory**: `/` (already set)
- **Build Command**: (empty - uses Dockerfile)
- **Start Command**: (empty - uses Dockerfile)
- **Health Check Path**: `/health` (already set)

### How It Works

1. **Multi-stage Docker Build**:
   - Stage 1: Node.js builds the Vite app
   - Stage 2: Nginx serves the built files

2. **API Proxy Configuration**:
   - Nginx proxies `/api/*` to archon-server
   - WebSocket support for Socket.IO via `/socket.io/*`
   - Environment variables injected at runtime

3. **Production Optimizations**:
   - Gzip compression enabled
   - Static assets cached for 1 year
   - Security headers configured
   - Client-side routing support

## Testing the Deployment

Once deployed, test the connection:

1. Visit https://archon-frontend-production.up.railway.app
2. Open browser DevTools > Network tab
3. Check that API calls go to `/api/*` (proxied to archon-server)
4. Verify WebSocket connection for real-time features

## Troubleshooting

### Build Fails
- Check Railway build logs
- Ensure all npm dependencies are in package.json
- Verify Node version compatibility (using v18)

### API Connection Issues
- Verify archon-server is running at https://archon-server-production.up.railway.app
- Check nginx proxy logs in Railway
- Ensure ARCHON_SERVER_URL environment variable is correct

### 404 Errors on Routes
- Nginx is configured to handle client-side routing
- All routes return index.html except `/api/*` and `/socket.io/*`

## Architecture

```
User Browser
    ↓
[Railway Domain]
https://archon-frontend-production.up.railway.app
    ↓
[Nginx Container]
    ├── Static Files (React App)
    └── Proxy Rules
        ├── /api/* → archon-server
        └── /socket.io/* → archon-server
            ↓
[Archon Server]
https://archon-server-production.up.railway.app
```

## Files Overview

- `Dockerfile`: Multi-stage build for production
- `nginx.conf.template`: Nginx configuration with proxy rules
- `docker-entrypoint.sh`: Runtime environment variable injection
- `railway.json`: Railway-specific configuration
- Source files from archon-ui-main

## Support

If you encounter issues after connecting the repository:
1. Check Railway deployment logs
2. Verify all services are running in the Railway project
3. Ensure archon-server, archon-mcp, and archon-agents are accessible