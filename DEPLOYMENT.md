# EC2 production stack

This stack runs the frontend, API, and PostgreSQL on one EC2 instance. Only
Caddy publishes host ports; the API and database remain reachable only through
the Docker network.

## First deployment

Clone the frontend and backend repositories as sibling directories, build both
images from the intended branch, and run the Compose file from the backend
directory.

```bash
docker build -t contact-manager-front:dev ../contact-manager-front
docker build -t contact-manager-back:dev .
cp .env.production.example .env.production
docker compose --env-file .env.production -f compose.production.yml config
docker compose --env-file .env.production -f compose.production.yml up -d
```

Before starting the stack, replace every placeholder in `.env.production`.
Use the same URL-safe PostgreSQL password in `POSTGRES_PASSWORD` and
`DATABASE_URL`. Never commit `.env.production`.

## Verification

```bash
docker compose --env-file .env.production -f compose.production.yml ps
curl http://YOUR_ELASTIC_IP/api/health
```

The PostgreSQL data is stored in the named volume `contact-manager_postgres_data`.
Running `docker compose down` preserves it. Do not use `docker compose down -v`
unless permanent database deletion is intended.
