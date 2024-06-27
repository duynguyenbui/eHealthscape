#!/bin/zsh

if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <container-name> <database-name>"
    exit 1
fi

CONTAINER_NAME=$1
DB_NAME=$2
BACKUP_DIR="/Users/buiduynguyen/Documents/C_Sharp/eHealthscape/backup"
TIMESTAMP=$(date +"%Y%m%d%H%M%S")
BACKUP_FILE="${BACKUP_DIR}/${DB_NAME}_${TIMESTAMP}.tar"

if [ ! -d "$BACKUP_DIR" ]; then
    echo "Creating backup directory: $BACKUP_DIR"
    mkdir -p "$BACKUP_DIR"
fi

docker exec "${CONTAINER_NAME}" pg_dump -U postgres -F t "${DB_NAME}" > "${BACKUP_FILE}"

if [ $? -ne 0 ]; then
    echo "Database dump failed."
    exit 1
fi

docker cp "${BACKUP_FILE}" "${CONTAINER_NAME}":/

if [ $? -ne 0 ]; then
    echo "Failed to copy the backup file into the container."
    exit 1
fi

docker exec "${CONTAINER_NAME}" rm -f "/${DB_NAME}_${TIMESTAMP}.tar"

if [ $? -ne 0 ]; then
    echo "Fai led to remove the backup file from the container."
    exit 1
fi

echo "Backup successful: ${BACKUP_FILE}"