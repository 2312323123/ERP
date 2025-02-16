# Set git info as environment variables (these will be picked up by docker-compose)
$env:GIT_LOG = git log -1
$env:GIT_REPO = (git config --get remote.origin.url) -replace "git@github.com:", "https://github.com/"

# Build with docker-compose
docker-compose -f ../docker-compose.yml -f ../docker-compose.dev.yml build

# Clean up environment variables
Remove-Item Env:\GIT_LOG
Remove-Item Env:\GIT_REPO 