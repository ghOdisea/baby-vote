# API Template

## Template con TS y Express

Template for API, with controllers, services, error handling middleware, Server running.
Missing Testing and Front end.

cat backend/src/db/init.sql | docker exec -i some-postgres \
  psql -U postgres -d postgres -v ON_ERROR_STOP=1
