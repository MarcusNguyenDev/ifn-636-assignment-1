# CI/CD Pipeline

This document outlines the CI/CD process for the Restaurant Management System and explains how to run the project in development mode locally.

## Overview

The CI/CD pipeline is designed to automate testing and deployment using GitHub Actions. It is triggered on pushes to the `main` and `stagging` branches. The pipeline consists of two jobs:

- **Test Job:** Verifies code integrity by running tests.
- **Deploy Job:** Deploys the latest code to the production environment when changes are pushed to the `main` branch.

## Pipeline Workflow

### Trigger
- **On Push:**  
  The pipeline is triggered when code is pushed to either the `main` or `stagging` branches.

### Jobs

#### 1. Test Job
- **Environment:**  
  Runs on `ubuntu-latest`.
- **Steps:**
  - **Checkout Code:** Uses `actions/checkout@v3` to clone the repository.
  - **Run Tests:**  
    Currently, no tests are implemented. The step outputs a message and exits with a success status.

#### 2. Deploy Job
- **Conditional Execution:**  
  This job only runs on the `main` branch.
- **Dependencies:**  
  It runs after the successful completion of the test job.
- **Environment:**  
  Runs on `ubuntu-latest`.
- **Steps:**
  - **Checkout Code:** Retrieves the latest code.
  - **Setup SSH Key:**
    - Creates an SSH key file from the secret `SSH_PRIVATE_KEY`.
    - Sets appropriate file permissions and adds the key to the SSH agent.
  - **Add Server to Known Hosts:**
    - Uses `ssh-keyscan` to add the server host to the list of known hosts, ensuring a secure connection.
  - **SSH and Deploy:**
    - Establishes an SSH connection to the server.
    - Executes a deployment script that:
      - Navigates to the project directory.
      - Pulls the latest code.
      - Installs backend dependencies with `bun install --frozen-lockfile`.
      - Sets up backend environment variables.
      - Installs and builds frontend dependencies.
      - Restarts the application using `pm2`.

Below is the relevant GitHub Actions workflow configuration:

```yaml
name: CI/CD Pipeline

on:
  push:
    branches:
      - main
      - stagging

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v3

      - name: Run Tests
        run: |
          echo "No tests implemented yet, skipping..."
          exit 0
  deploy:
    if: github.ref == 'refs/heads/main'
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v3

      - name: Setup SSH Key
        run: |
          mkdir -p ~/.ssh/
          echo "${{ secrets.SSH_PRIVATE_KEY }}" > ~/.ssh/DeployKey
          chmod 600 ~/.ssh/DeployKey
          eval $(ssh-agent -s)
          ssh-add ~/.ssh/DeployKey

      - name: Add Server to Known Hosts
        run: ssh-keyscan -H ${{ secrets.SERVER_HOST }} >> ~/.ssh/known_hosts

      - name: SSH and Deploy
        run: |
          ssh -i ~/.ssh/DeployKey ${{ secrets.SERVER_USER }}@${{ secrets.SERVER_HOST }} << 'ENDSSH'
          export PATH="/home/ubuntu/.bun/bin:/home/ubuntu/.nvm/versions/node/v22.14.0/bin:$PATH"
          cd ifn-636-assignment-1 && git pull && cd backend && bun install --frozen-lockfile && echo "${{ secrets.BE_ENV }}" > .env && cd ../frontend && bun install --frozen-lockfile && bun run build && echo "${{ secrets.FE_ENV }}" > .env && pm2 restart all
          ENDSSH
```

# Project Setup Instructions

Follow the steps below to set up and run the Restaurant Management System in development mode.

## Prerequisites

- **Node.js** and **bun** installed globally  
  (Bun is used as the package manager and runtime. Install via https://bun.sh)

- **MongoDB** instance running locally or accessible via connection string

### Script
```bash
git clone https://github.com/MarcusNguyenDev/ifn-636-assignment-1.git
cd ifn-636-assignment-1

cd backend
npm install
npm run dev

cd ../frontend
npm install
npm run dev
```