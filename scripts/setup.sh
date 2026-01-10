#!/bin/bash
source ./validate-db.sh

# --- Configuration ---
export BACKEND_PORT="5001"
export FRONTEND_PORT="5173"
export DB_NAME="test"
export DB_USER="anlam"
export DB_PASS=""
export DB_HOST="localhost"
export DB_PORT="5432"
BACKUP_PATH="../Data/imdp_app"


# Function to write to log file without ANSI colors
log_to_file() {
    echo -e "$1" | sed 's/\x1b\[[0-9;]*m//g'""
}

echo "🧹 Cleaning up old server instances..." ""

#kill the running ports from failing install at the last setup
npx kill-port $DB_PORT || true
npx kill-port $FRONTEND_PORT || true

# Waiting for the ports released
sleep 1


echo "🚀 Starting Movies Lab Local Installation..." ""
echo "📝 Checking for .env files..." ""

if [ ! -f "../backend/.env" ]; then
    echo "🏗️ Creating backend/.env with default values..." ""
    cat <<EOT >> ../backend/.env
DB_LOCAL_USER=$DB_USER
DB_LOCAL_PASSWORD=$DB_PASS
DB_LOCAL_NAME=$DB_NAME
DB_LOCAL_HOST=$DB_HOST
DB_LOCAL_PORT=$DB_PORT
PORT=$BACKEND_PORT
EOT
    echo "✅ ../backend/.env created." ""
else
    echo "ℹ️  ../backend/.env already exists, skipping." ""
fi

echo "🚀 Starting Movies Lab Local Installation..." ""

# 1. Install Frontend Dependencies
echo "📦 Installing Frontend dependencies..." ""
cd frontend && npm install
cd ..

# 2. Install Backend Dependencies
echo "📦 Installing Backend dependencies..." ""
cd backend && npm install
cd ..
# --- 3. Database Setup (PostgreSQL) ---
echo "🐘 Setting up PostgreSQL..."

# Create Database if it doesn't exist
createdb -U $DB_USER $DB_NAME 2>/dev/null || echo "⚠️ Database already exists." ""

echo "🧐 Validating database..." ""
if ! validate_database; then
    echo "🔄 Restoring IMDB data from folder: $BACKUP_PATH..." "" ""

    if [ -d "$BACKUP_PATH" ]; then
        pg_restore -U $DB_USER -d $DB_NAME --clean --if-exists "$BACKUP_PATH"
        echo "✅ Data restored successfully." ""
    else
        echo "❌ Backup folder not found at $BACKUP_PATH!" ""
    fi
    validate_database
else
    echo "echo "✅ Database is ready and valid!" "  
    exit 1
fi

# 4. Launching the Lab
echo "🌟 Setup Complete! Starting services..."  

# run processes in the background
cd backend && npm run dev & 
cd frontend && npm run dev &

echo "🛰️  Backend and Frontend are launching. Check your terminal for URLs." ""
wait