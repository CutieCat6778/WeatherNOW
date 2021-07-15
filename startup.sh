#!/bin/bash

# Build
echo "--- BUILDING ---"

docker build ./frontend -t weatherapp/frontend
docker build ./backend -t weatherapp/backend

echo "--- FISNIHED BUILDING ---"

# Run
echo "--- EXECUTING IMAGES ---"

docker run -d -it -p 8080:80/tcp --name react-frontend weatherapp/frontend
docker run -d -it -p 49610:49610/tcp --name react-backend weatherapp/backend

echo "--- FINSIHED EXECUTION ---"

# Confirm
echo "--- DOCKER PROCESS ARE RUNNING ---"
echo "visit http://10.8.2.75:8080 for the results"