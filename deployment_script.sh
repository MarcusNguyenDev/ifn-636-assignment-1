#!/bin/bash
set -e

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