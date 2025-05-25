#!/bin/bash
set -euo pipefail

# Ensure required directories exist
mkdir -p src public scripts .github/workflows

# Generate example environment file if missing
if [ ! -f .env.example ]; then
  cat <<'EOT' > .env.example
CF_ACCOUNT_ID=your-account-id
CF_API_TOKEN=your-api-token
EOT
fi

# Install dependencies while network access is available
npm install

# Build the TypeScript sources for offline use
npm run build

echo "Setup complete."
