#!/bin/bash

# --- Configuration ---
DB_NAME="imdb_app"
DB_USER="anlam"
BACKUP_PATH="./data/imdp_app"

echo "🚀 Starting Movies Lab Local Installation..."

# 1. Install Frontend Dependencies
echo "📦 Installing Frontend dependencies..."
cd frontend && npm install
cd ..

# 2. Install Backend Dependencies
echo "📦 Installing Backend dependencies..."
cd backend && npm install
cd ..

# 3. Database Setup (PostgreSQL)
echo "🐘 Setting up PostgreSQL..."

# Check if Postgres is installed
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL not found. Please install it first (e.g., 'brew install postgresql' or 'sudo apt install postgresql')."
    exit 1
fi

# Create Database if it doesn't exist
echo "🛠️ Creating database: $DB_NAME"
createdb -U $DB_USER $DB_NAME 2>/dev/null || echo "⚠️ Database already exists, continuing..."

# Restore Backup
echo "🔄 Restoring IMDB data from $BACKUP_PATH..."
if [ -f "$BACKUP_PATH" ]; then
    psql -U $DB_USER -d $DB_NAME -f "$BACKUP_PATH"
    echo "✅ Data restored successfully."
else
    echo "❌ Backup file not found at $BACKUP_PATH!"
fi

# 4. Launching the Lab
echo "🌟 Setup Complete! Starting services..."

# We use '&' to run processes in the background
cd backend && npm run dev & 
cd frontend && npm run dev &

echo "🛰️  Backend and Frontend are launching. Check your terminal for URLs."
wait