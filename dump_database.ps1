# Database dump script for Compass Connect (PowerShell version)
# Run this script to get a full database dump

# Docker database connection parameters
# Update these values based on your Docker setup
$DockerContainerName = "supabase_db_tbmsmazatvzphvluucib"  # Your actual container name
$PostgresUser = "postgres"                                 # Default Supabase user
$PostgresDb = "postgres"                                   # Default Supabase database
$PostgresPassword = "your_password"                       # Not needed for local Supabase

# Output file
$OutputFile = "database_structure_dump.sql"

Write-Host "Creating database structure dump..." -ForegroundColor Green
Write-Host "Container: $DockerContainerName"
Write-Host "Database: $PostgresDb"
Write-Host "Output: $OutputFile"
Write-Host ""

# Check if Docker container is running
$containerRunning = docker ps | Select-String $DockerContainerName
if (-not $containerRunning) {
    Write-Host "Error: Docker container '$DockerContainerName' is not running" -ForegroundColor Red
    Write-Host "Please check your container name and ensure it's running"
    exit 1
}

# Create the dump
try {
    docker exec $DockerContainerName pg_dump -U $PostgresUser -d $PostgresDb --schema-only --no-owner --no-privileges | Out-File -FilePath $OutputFile -Encoding utf8
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Database structure dump created successfully: $OutputFile" -ForegroundColor Green
        Write-Host ""
        Write-Host "To also dump the data, run:" -ForegroundColor Yellow
        Write-Host "docker exec $DockerContainerName pg_dump -U $PostgresUser -d $PostgresDb > data_dump.sql"
        Write-Host ""
        Write-Host "To see just the interests table structure:" -ForegroundColor Yellow
        Write-Host "docker exec $DockerContainerName psql -U $PostgresUser -d $PostgresDb -c \"\\d interests\""
        Write-Host ""
        Write-Host "To see sample data from interests table:" -ForegroundColor Yellow
        Write-Host "docker exec $DockerContainerName psql -U $PostgresUser -d $PostgresDb -c \"SELECT * FROM interests LIMIT 3;\""
    } else {
        Write-Host "❌ Failed to create database dump" -ForegroundColor Red
        Write-Host "Please check your Docker container and database connection parameters"
        exit 1
    }
} catch {
    Write-Host "❌ Error running dump command: $_" -ForegroundColor Red
    exit 1
}

# Alternative commands you can run manually
Write-Host ""
Write-Host "Alternative manual commands:" -ForegroundColor Cyan
Write-Host "1. List all tables:"
Write-Host "   docker exec $DockerContainerName psql -U $PostgresUser -d $PostgresDb -c \"\\dt\""
Write-Host ""
Write-Host "2. Describe interests table:"
Write-Host "   docker exec $DockerContainerName psql -U $PostgresUser -d $PostgresDb -c \"\\d interests\""
Write-Host ""
Write-Host "3. Get column information:"
Write-Host "   docker exec $DockerContainerName psql -U $PostgresUser -d $PostgresDb -c \"SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'interests';\""
