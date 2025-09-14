#!/bin/bash
# Complete deployment script for Archon UI on Railway

set -e

echo "🚀 Archon UI Railway Deployment Script"
echo "====================================="

# Step 1: Clone Archon repository
echo "
📥 Step 1: Cloning Archon repository..."
if [ -d "archon-source" ]; then
    echo "   Removing existing archon-source directory..."
    rm -rf archon-source
fi
git clone https://github.com/coleam00/Archon.git archon-source

# Step 2: Copy UI source files
echo "
📋 Step 2: Copying UI source files..."
cp -r archon-source/archon-ui-main/src ./
cp -r archon-source/archon-ui-main/public ./
cp archon-source/archon-ui-main/package*.json ./
cp archon-source/archon-ui-main/index.html ./
cp archon-source/archon-ui-main/vite.config.ts ./
cp archon-source/archon-ui-main/tsconfig*.json ./
cp archon-source/archon-ui-main/tailwind.config.js ./
cp archon-source/archon-ui-main/postcss.config.js ./
cp archon-source/archon-ui-main/.eslintrc.cjs ./ 2>/dev/null || true
cp archon-source/archon-ui-main/biome.json ./ 2>/dev/null || true

# Copy test directory if it exists
if [ -d "archon-source/archon-ui-main/tests" ]; then
    cp -r archon-source/archon-ui-main/tests ./
fi

# Step 3: Clean up
echo "
🧹 Step 3: Cleaning up temporary files..."
rm -rf archon-source

# Step 4: Git operations
echo "
📤 Step 4: Committing changes..."
git add .
git commit -m "Add Archon UI source files for Railway deployment" || echo "No changes to commit"

# Step 5: Push to GitHub
echo "
🚀 Step 5: Pushing to GitHub..."
git push origin main

echo "
✅ Deployment preparation complete!"
echo ""
echo "Next steps:"
echo "1. Go to Railway dashboard"
echo "2. Create a new service from this GitHub repository"
echo "3. Set the following environment variables:"
echo "   - ARCHON_SERVER_URL=https://archon-server-production.up.railway.app"
echo "4. Deploy and your UI should connect to the server!"
echo ""
echo "Repository: https://github.com/sphinxcode/archon-ui-railway"