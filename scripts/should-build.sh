#!/bin/bash

# Vercel Ignored Build Step
# This script determines if a build should be run
# Exit with 1 to build, 0 to skip

echo "🔍 Checking if build should run..."

# Get the current branch
BRANCH=$(git rev-parse --abbrev-ref HEAD)

echo "📍 Current branch: $BRANCH"

# Always build on main branch
if [[ "$BRANCH" == "main" ]]; then
  echo "✅ Building on main branch"
  exit 1
fi

# Always build on production deployments
if [[ "$VERCEL_ENV" == "production" ]]; then
  echo "✅ Building production deployment"
  exit 1
fi

# Build on preview deployments
echo "✅ Building preview deployment"
exit 1
