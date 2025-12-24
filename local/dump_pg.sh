docker exec pg-local pg_dump \
  -U app \
  -d appdb \
  > backups/appdb.sql
