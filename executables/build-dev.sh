#!/bin/bash

# Set git info as environment variables (these will be picked up by docker-compose)
export GIT_LOG=$(git log -1)
export GIT_REPO=$(git config --get remote.origin.url | sed 's/git@github.com:/https:\/\/github.com\//')

# Build with docker-compose
docker-compose -f ../docker-compose.yml -f ../docker-compose.dev.yml build

# Clean up environment variables
unset GIT_LOG
unset GIT_REPO 