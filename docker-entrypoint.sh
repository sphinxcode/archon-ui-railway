#!/bin/sh
set -e

# Set default PORT if not provided by Railway
export PORT=${PORT:-80}

# Construct the archon-server URL from Railway service URL or use provided env var
if [ -z "$ARCHON_SERVER_URL" ]; then
    if [ -n "$RAILWAY_SERVICE_ARCHON_SERVER_URL" ]; then
        export ARCHON_SERVER_URL="https://${RAILWAY_SERVICE_ARCHON_SERVER_URL}"
    else
        # Fallback to localhost for local development
        export ARCHON_SERVER_URL="http://localhost:8181"
    fi
fi

# Ensure the URL has proper protocol
if ! echo "$ARCHON_SERVER_URL" | grep -q "^https\?://"; then
    export ARCHON_SERVER_URL="https://$ARCHON_SERVER_URL"
fi

echo "Starting Archon UI on port $PORT"
echo "Connecting to Archon Server at: $ARCHON_SERVER_URL"

# Substitute environment variables in nginx config
envsubst '${PORT} ${ARCHON_SERVER_URL}' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf

# Start nginx
exec "$@"