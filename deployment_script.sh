#!/bin/bash
set -e

# Navigate to the project directory and update the code
cd ifn-636-assignment-1 || { echo "Project directory not found"; exit 1; }
git pull

# Build backend
cd backend || { echo "Backend directory not found"; exit 1; }
bun install
bun run build

# Build frontend
cd ../frontend || { echo "Frontend directory not found"; exit 1; }
bun install
bun run build

# Restart services
pm2 restart all