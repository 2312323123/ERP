#!/bin/bash

# Check if service name is provided
if [ -z "$1" ]; then
    echo "Please provide a service name"
    echo "Usage: ./prod-rebuild-and-rerun-one-service.sh <service_name>"
    exit 1
fi

SERVICE_NAME=$1

# Set git info as environment variables (these will be picked up by docker-compose)
export GIT_LOG=$(git log -1)
export GIT_REPO=$(git config --get remote.origin.url | sed 's/git@github.com:/https:\/\/github.com\//')

# Remove and rebuild the service
echo "Rebuilding service: $SERVICE_NAME"
docker-compose -f ../docker-compose.yml -f ../docker-compose.prod.yml rm -svf $SERVICE_NAME
docker-compose -f ../docker-compose.yml -f ../docker-compose.prod.yml build $SERVICE_NAME
docker-compose -f ../docker-compose.yml -f ../docker-compose.prod.yml up -d $SERVICE_NAME

# Clean up environment variables
unset GIT_LOG
unset GIT_REPO 