#!/bin/bash

ROOT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
echo "Root: $ROOT_DIR"

cleanup() {
    echo "Stopping servers..."
    kill $(jobs -p)
    exit
}

trap cleanup SIGINT

echo "Starting Backend ..."
cd $ROOT_DIR/backend && npm run dev &

echo "Starting Frontend ..."
cd $ROOT_DIR/frontend && npm run dev &

wait