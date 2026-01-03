

## Local PostgreSQL (Docker)

### Start / Stop existing PostgreSQL
```bash
docker start pg-local
docker stop pg-local
```

### Create a new PostgreSQL instance (if none exists)

```
docker volume create pgdata

docker run -d \
  --name pg-local \
  -p 5432:5432 \
  -e POSTGRES_USER=app \
  -e POSTGRES_PASSWORD=app_pw \
  -e POSTGRES_DB=appdb \
  -v pgdata:/var/lib/postgresql/data \
  --restart unless-stopped \
  postgres:16

```

