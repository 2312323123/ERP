#!/bin/bash

set -e
set -u

# Create backup_test database and user
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE DATABASE backup_test;
    CREATE USER $BACKUP_TEST_USER WITH ENCRYPTED PASSWORD '$BACKUP_TEST_PASSWORD';
    GRANT ALL PRIVILEGES ON DATABASE backup_test TO $BACKUP_TEST_USER;
    \c backup_test
    GRANT ALL ON SCHEMA public TO $BACKUP_TEST_USER;
EOSQL

# Create backup_test_only_psql database and user
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE DATABASE backup_test_only_psql;
    CREATE USER $BACKUP_TEST_ONLY_PSQL_USER WITH ENCRYPTED PASSWORD '$BACKUP_TEST_ONLY_PSQL_PASSWORD';
    GRANT ALL PRIVILEGES ON DATABASE backup_test_only_psql TO $BACKUP_TEST_ONLY_PSQL_USER;
    \c backup_test_only_psql
    GRANT ALL ON SCHEMA public TO $BACKUP_TEST_ONLY_PSQL_USER;
EOSQL 