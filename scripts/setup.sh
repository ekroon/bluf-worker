#!/bin/bash
set -e

# Create basic directories
mkdir -p src public scripts .github/workflows

# Generate .env.example if missing
if [ ! -f .env.example ]; then
  cat <<'EOT' > .env.example
CF_ACCOUNT_ID=
CF_API_TOKEN=
EOT
fi

# Install dependencies and build for offline use
npm install
npm run build

echo "Setup complete. You can now work offline."
