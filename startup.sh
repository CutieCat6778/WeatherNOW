#!/bin/bash

if [[ "$1" == "start" ]]; then
    # Build
    echo "--- BUILDING ---"

    docker build ./frontend -t weatherapp/frontend
    docker build ./backend -t weatherapp/backend

    echo "--- FISNIHED BUILDING ---"

    # Run
    echo "--- EXECUTING IMAGES ---"

    docker run -d -it -p 8080:80/tcp --name react-frontend weatherapp/frontend
    docker run -d -it -p 49160:49160/tcp --name react-backend weatherapp/backend

    echo "--- FINSIHED EXECUTION ---"

    # Confirm
    echo "--- DOCKER PROCESS ARE RUNNING ---"
    echo "visit http://10.8.2.75:8080 for the results"
elif [[ "$1" == "restart" ]]; then
    # Build
    echo "--- DELETING OLD PROCESSES ---"
    docker rm -f react-backend react-frontend

    echo "--- DELETING OLD IMAGES ---"
    docker rmi -f weatherapp/backend weatherapp/frontend

    echo "--- BUILDING ---"

    docker build ./frontend -t weatherapp/frontend
    docker build ./backend -t weatherapp/backend

    echo "--- FISNIHED BUILDING ---"

    # Run
    echo "--- EXECUTING IMAGES ---"

    docker run -d -it -p 8080:80/tcp --name react-frontend weatherapp/frontend
    docker run -d -it -p 49160:49160/tcp --name react-backend weatherapp/backend

    echo "--- FINSIHED EXECUTION ---"

    # Confirm
    echo "--- DOCKER PROCESS ARE RUNNING ---"
    echo "visit http://10.8.2.75:8080 for the results"
elif [[ "$1" == "delete" ]]; then
    echo "--- DELETING OLD PROCESSES ---"
    docker rm -f react-backend react-frontend

    echo "--- DELETING OLD IMAGES ---"
    docker rmi -f weatherapp/backend weatherapp/frontend
else 
    echo "INVALID OPTIONS"
fi