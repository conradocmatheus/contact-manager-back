# EC2 production stack

This stack runs the frontend, API, and PostgreSQL on one EC2 instance. Only
Caddy publishes host ports; the API and database remain reachable only through
the Docker network.

## First deployment

The GitHub Actions workflows publish images after their tests pass. Clone the
backend repository, create the production environment file, and start the stack
from the backend directory.

```bash
cp .env.production.example .env.production
docker compose --env-file .env.production -f compose.production.yml config
docker compose --env-file .env.production -f compose.production.yml pull
docker compose --env-file .env.production -f compose.production.yml up -d
```

Before starting the stack, replace every placeholder in `.env.production`.
Use the same URL-safe PostgreSQL password in `POSTGRES_PASSWORD` and
`DATABASE_URL`. Never commit `.env.production`.

## Deploy triggered by GitHub Actions

The CI/CD workflows publish a validated image and, only for `master`, connect to
the EC2 host to execute `deploy/update-containers.sh`. The script pulls both
application images, recreates only the API and frontend, and validates the API
health endpoint. See `PIPELINE_CICD.md` for the required GitHub Environment
variables and secrets.

Before SSH, the production job assumes a least-privilege AWS role through
GitHub OIDC and authorizes only the current runner IPv4 (`/32`) in the EC2
Security Group. The workflow stores the returned security-group rule ID and
revokes that exact rule in an `always()` cleanup step. Keep the normal operator
SSH rule restricted to `My IP`; do not expose port 22 to `0.0.0.0/0`.

The deployment script uses a file lock, so frontend and backend workflows cannot
update the Compose stack concurrently.

## Timer fallback

The systemd timer can be kept as a temporary fallback before the direct pipeline
deploy is configured. Install it with:

```bash
sudo cp deploy/contact-manager-update.service /etc/systemd/system/
sudo cp deploy/contact-manager-update.timer /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now contact-manager-update.timer
```

The timer checks the `api` and `frontend` images every two minutes. Compose only
recreates a service when its image changes. It never pulls or recreates the
PostgreSQL service, so the named database volume remains intact.

Inspect the timer and its latest deployment log with:

```bash
systemctl status contact-manager-update.timer
journalctl -u contact-manager-update.service -n 100 --no-pager
```

Production must use `:master` for both images. SHA tags such as
`:sha-1a2b3c4` can be used for a pinned deployment or rollback.

Disable the timer after the GitHub Actions deploy is verified, so every
production update remains visible in the Actions history:

```bash
sudo systemctl disable --now contact-manager-update.timer
```

## Verification

```bash
docker compose --env-file .env.production -f compose.production.yml ps
curl http://YOUR_ELASTIC_IP/api/health
```

The PostgreSQL data is stored in the named volume `contact-manager_postgres_data`.
Running `docker compose down` preserves it. Do not use `docker compose down -v`
unless permanent database deletion is intended.

## Manual build fallback

If the registry is temporarily unavailable, clone the frontend and backend as
sibling directories and build the branch images directly on the EC2 instance:

```bash
docker build -t contact-manager-front:dev ../contact-manager-front
docker build -t contact-manager-back:dev .
```
