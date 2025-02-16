# Check if service name is provided
param(
    [Parameter(Mandatory=$true)]
    [string]$ServiceName
)

# Set git info as environment variables (these will be picked up by docker-compose)
$env:GIT_LOG = git log -1
$env:GIT_REPO = (git config --get remote.origin.url) -replace "git@github.com:", "https://github.com/"

# Remove and rebuild the service
Write-Host "Rebuilding service: $ServiceName"
docker-compose -f ../docker-compose.yml -f ../docker-compose.dev.yml rm -svf $ServiceName
docker-compose -f ../docker-compose.yml -f ../docker-compose.dev.yml build $ServiceName
docker-compose -f ../docker-compose.yml -f ../docker-compose.dev.yml up -d $ServiceName

# Clean up environment variables
Remove-Item Env:\GIT_LOG
Remove-Item Env:\GIT_REPO