#!/usr/bin/env bash
set -e

# Create expected directories
mkdir -p src public scripts .github/workflows

# Provide example environment file if missing
if [ ! -f .env.example ]; then
  cat <<'EOT' > .env.example
CF_ACCOUNT_ID=
CF_API_TOKEN=
EOT
fi

# Install dependencies and build project
if [ -f package.json ]; then
  npm ci
  npm run build
fi

echo "Project scaffolded and built."
