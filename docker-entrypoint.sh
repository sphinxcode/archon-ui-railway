#!/bin/sh
set -e

# Set default PORT if not provided by Railway
export PORT=${PORT:-80}

# Construct the archon-server URL from Railway service URL or use provided env var
if [ -z "$ARCHON_SERVER_URL" ]; then
    if [ -n "$RAILWAY_SERVICE_ARCHON_SERVER_URL" ]; then
        export ARCHON_SERVER_URL="https://${RAILWAY_SERVICE_ARCHON_SERVER_URL}"
        export ARCHON_SERVER_HOST="${RAILWAY_SERVICE_ARCHON_SERVER_URL}"
    else
        # Fallback to localhost for local development
        export ARCHON_SERVER_URL="http://localhost:8181"
        export ARCHON_SERVER_HOST="localhost"
    fi
else
    # Extract hostname from ARCHON_SERVER_URL for SSL SNI
    # Remove protocol (http:// or https://)
    TEMP_HOST=$(echo "$ARCHON_SERVER_URL" | sed 's|^https\?://||')
    # Remove port if present
    TEMP_HOST=$(echo "$TEMP_HOST" | sed 's|:[0-9]*||')
    # Remove path if present
    export ARCHON_SERVER_HOST=$(echo "$TEMP_HOST" | sed 's|/.*||')
fi

# Ensure the URL has proper protocol
if ! echo "$ARCHON_SERVER_URL" | grep -q "^https\?://"; then
    export ARCHON_SERVER_URL="https://$ARCHON_SERVER_URL"
fi

echo "Starting Archon UI on port $PORT"
echo "Connecting to Archon Server at: $ARCHON_SERVER_URL"
echo "Using hostname for SSL: $ARCHON_SERVER_HOST"

# Substitute environment variables in nginx config
envsubst '${PORT} ${ARCHON_SERVER_URL} ${ARCHON_SERVER_HOST}' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf

# Debug: Show the generated nginx config
echo "Generated nginx configuration:"
cat /etc/nginx/conf.d/default.conf | head -20

# Start nginx
exec "$@"