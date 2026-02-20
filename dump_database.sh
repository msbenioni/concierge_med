#!/bin/bash

# Database dump script for Compass Connect
# Run this script to get a full database dump

# Docker database connection parameters
# Update these values based on your Docker setup
DOCKER_CONTAINER_NAME="compass-connect-db"  # Change to your container name
POSTGRES_USER="postgres"                     # Change to your PostgreSQL user
POSTGRES_DB="compass_connect"               # Change to your database name
POSTGRES_PASSWORD="your_password"            # Change to your password

# Output file
OUTPUT_FILE="database_structure_dump.sql"

echo "Creating database structure dump..."
echo "Container: $DOCKER_CONTAINER_NAME"
echo "Database: $POSTGRES_DB"
echo "Output: $OUTPUT_FILE"
echo ""

# Check if Docker container is running
if ! docker ps | grep -q $DOCKER_CONTAINER_NAME; then
    echo "Error: Docker container '$DOCKER_CONTAINER_NAME' is not running"
    echo "Please check your container name and ensure it's running"
    exit 1
fi

# Create the dump
docker exec $DOCKER_CONTAINER_NAME pg_dump \
    -U $POSTGRES_USER \
    -d $POSTGRES_DB \
    --schema-only \
    --no-owner \
    --no-privileges \
    > $OUTPUT_FILE

if [ $? -eq 0 ]; then
    echo "✅ Database structure dump created successfully: $OUTPUT_FILE"
    echo ""
    echo "To also dump the data, run:"
    echo "docker exec $DOCKER_CONTAINER_NAME pg_dump -U $POSTGRES_USER -d $POSTGRES_DB > data_dump.sql"
    echo ""
    echo "To see just the interests table structure:"
    echo "docker exec $DOCKER_CONTAINER_NAME psql -U $POSTGRES_USER -d $POSTGRES_DB -c \"\\d interests\""
else
    echo "❌ Failed to create database dump"
    echo "Please check your Docker container and database connection parameters"
    exit 1
fi
