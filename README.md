# Krishna Bhatt Personal Portfolio

React + Vite website: **https://krishna-bhatt.com**

Repository: https://github.com/blizzard-labs/portfolio-website

For the existing Google Cloud VM, follow **Update the website**. For a fresh Ubuntu VM, complete **Set up a new VM** first, then use the same update commands.

## Connect to the VM

Open **Google Cloud Console → Compute Engine → VM instances → SSH** next to the website VM. Run all **VM** commands in that terminal using the account that owns `~/site`.

Alternatively, install the [Google Cloud CLI](https://cloud.google.com/sdk/docs/install) and run this on your **local computer**, replacing the three values:

```bash
export GCP_PROJECT='YOUR_PROJECT_ID'
export GCP_VM='YOUR_VM_NAME'
export GCP_ZONE='YOUR_VM_ZONE'

gcloud auth login
gcloud compute ssh "$GCP_VM" --project="$GCP_PROJECT" --zone="$GCP_ZONE"
```

[Google Cloud SSH command reference](https://cloud.google.com/sdk/gcloud/reference/compute/ssh).

## Update the website

### 1. Push changes — local computer

Run inside your local `portfolio-website` repository. `git add -A` stages all repository changes; review the diff before committing.

```bash
git status --short
git add -A
git diff --cached
```

```bash
git commit -m "Update portfolio website"
git push origin HEAD
```

Skip this step if your changes are already pushed. The deployment block clones the default branch unless you set `DEPLOY_REF` to another branch or tag. It cannot deploy uncommitted local changes.

### 2. Check the existing setup — VM

The existing deployment is assumed to have a Compose file in `~/site` and a web server mounting `~/site/public` as its document root. The repository does not include that existing server configuration. Confirm the bind mount in the rendered configuration before the first update.

```bash
cd "$HOME/site"
sudo docker compose version
sudo docker compose config
sudo docker compose ps
```

If Git or rsync is missing, install them on the Ubuntu/Debian VM:

```bash
sudo apt-get update
sudo apt-get install -y git rsync
```

### 3. Build and publish — VM

Copy this entire block. Change `SITE_DIR` if the site lives elsewhere. Set `DEPLOY_REF` if you pushed a branch other than the default branch.

The build runs with Node 22 in a temporary Docker container, so the VM does not need Node installed. A failed clone or build stops before changing live files. The repository currently tracks `dist/`, but these commands rebuild it from source with the lockfile on every deployment.

```bash
bash <<'DEPLOY'
set -euo pipefail

SITE_DIR="$HOME/site"
REPO_URL='https://github.com/blizzard-labs/portfolio-website.git'
DEPLOY_REF='' # Empty = default branch; or enter a branch/tag, e.g. main

cd "$SITE_DIR"
sudo docker compose config --quiet
sudo -v

WORK_DIR=$(mktemp -d "$HOME/portfolio-deploy.XXXXXX")
trap 'rm -rf -- "$WORK_DIR"' EXIT

if [ -n "$DEPLOY_REF" ]; then
  git clone --depth 1 --branch "$DEPLOY_REF" "$REPO_URL" "$WORK_DIR/repo"
else
  git clone --depth 1 "$REPO_URL" "$WORK_DIR/repo"
fi
REVISION=$(git -C "$WORK_DIR/repo" rev-parse --short HEAD)

sudo docker run --rm \
  --user "$(id -u):$(id -g)" \
  --env HOME=/tmp \
  --mount "type=bind,source=$WORK_DIR/repo,target=/app" \
  --workdir /app \
  node:22-bookworm-slim \
  sh -c 'npm ci && npm run build'

test -s "$WORK_DIR/repo/dist/index.html"

BACKUP_DIR="$SITE_DIR/backups/$(date -u +%Y%m%dT%H%M%S)-$REVISION-$$"
if [ -d "$SITE_DIR/public" ]; then
  sudo mkdir -p "$BACKUP_DIR"
  sudo cp -a "$SITE_DIR/public/." "$BACKUP_DIR/"
  printf 'Rollback backup: %s\n' "$BACKUP_DIR"
fi

sudo mkdir -p "$SITE_DIR/public"
sudo rsync -a --delete "$WORK_DIR/repo/dist/" "$SITE_DIR/public/"
sudo chmod -R a+rX "$SITE_DIR/public"
sudo docker compose up -d
sudo docker compose restart
sudo docker compose ps
printf 'Published Git revision: %s\n' "$REVISION"
DEPLOY
```

The first run downloads the Node image and dependencies. The VM needs outbound internet access and enough memory for the build. The clone assumes the repository is publicly readable.

`rsync --delete` removes old files only inside the site's `public/` directory. Backups stay in `site/backups/`. Files are copied in place to preserve the existing Docker bind mount; copying and restarting can briefly interrupt requests. A failure after publishing starts requires the rollback below.

### 4. Verify — VM or local computer

```bash
curl -fsSI https://krishna-bhatt.com
```

Open https://krishna-bhatt.com and check the changed content. Hard refresh if an old version appears: `Cmd+Shift+R` on macOS or `Ctrl+Shift+R` on Windows/Linux.

## Roll back an update — VM

Use the **Rollback backup** path printed by the deployment block. List available backups:

```bash
sudo ls -1 "$HOME/site/backups"
```

Replace `PASTE_BACKUP_DIRECTORY_NAME` with one of those directory names, then copy the entire block. Change `SITE_DIR` here too if you used a different path.

```bash
bash <<'ROLLBACK'
set -euo pipefail
SITE_DIR="$HOME/site"
BACKUP_DIR="$SITE_DIR/backups/PASTE_BACKUP_DIRECTORY_NAME"

test -s "$BACKUP_DIR/index.html"
cd "$SITE_DIR"
sudo docker compose config --quiet
sudo rsync -a --delete "$BACKUP_DIR/" "$SITE_DIR/public/"
sudo chmod -R a+rX "$SITE_DIR/public"
sudo docker compose up -d
sudo docker compose restart
sudo docker compose ps
ROLLBACK
```

Backups accumulate. Retain the versions you need and remove older ones manually after verifying the site.

## Set up a new VM

Skip this section for the existing working VM. This alternative uses Caddy and Docker Compose; it does not reproduce the server configuration from the original [hosting tutorial](https://youtu.be/XNf3d1oi2pM).

### 1. Prepare Google Cloud and DNS

In Google Cloud Console:

1. Create an **Ubuntu 24.04 LTS** Compute Engine VM with an external IP and sufficient build memory (2 GB RAM is a practical starting point).
2. Reserve and attach a **static external IP** so DNS stays valid after restarts.
3. Enable **Allow HTTP traffic** and **Allow HTTPS traffic** on the VM. Ensure applicable VPC firewall rules allow inbound TCP **80** and **443**. Keep SSH access available through your chosen Google Cloud SSH method.
4. At your DNS provider, point the **A record** for `krishna-bhatt.com` to the static IP. Remove or correct any AAAA record pointing elsewhere. Wait for DNS to resolve to the VM before expecting HTTPS to work.

Use another domain in the Caddyfile below if needed. Caddy automatically obtains and renews HTTPS certificates once DNS and network access are ready. See [Caddy's HTTPS prerequisites](https://caddyserver.com/docs/quick-starts/https).

### 2. Install dependencies — new Ubuntu VM

This block is for a fresh Ubuntu VM without an existing Docker installation. It uses [Docker's official Ubuntu apt repository](https://docs.docker.com/engine/install/ubuntu/).

```bash
bash <<'INSTALL'
set -euo pipefail
sudo apt-get update
sudo apt-get install -y ca-certificates curl git rsync
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg \
  -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

. /etc/os-release
sudo tee /etc/apt/sources.list.d/docker.sources >/dev/null <<EOF
Types: deb
URIs: https://download.docker.com/linux/ubuntu
Suites: ${UBUNTU_CODENAME:-$VERSION_CODENAME}
Components: stable
Architectures: $(dpkg --print-architecture)
Signed-By: /etc/apt/keyrings/docker.asc
EOF

sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io \
  docker-buildx-plugin docker-compose-plugin
sudo systemctl enable --now docker
sudo docker compose version
INSTALL
```

### 3. Create the web server configuration — new VM

Run once in the SSH terminal. This block refuses to overwrite an existing `~/site` directory. Edit the domain in the Caddyfile if needed.

```bash
bash <<'SETUP'
set -euo pipefail
mkdir "$HOME/site"
cd "$HOME/site"
mkdir public

cat > compose.yaml <<'YAML'
services:
  web:
    image: caddy:2
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./public:/srv:ro
      - ./Caddyfile:/etc/caddy/Caddyfile:ro
      - caddy_data:/data
      - caddy_config:/config
volumes:
  caddy_data:
  caddy_config:
YAML

cat > Caddyfile <<'CADDY'
krishna-bhatt.com {
    root * /srv
    encode gzip
    file_server
}
CADDY

sudo docker compose config --quiet
SETUP
```

Now run **Update the website → Step 3** to build, publish, and start the server, then verify it with Step 4. The named Docker volumes retain Caddy's certificate state between container restarts.

## Troubleshooting — VM

```bash
cd "$HOME/site"
sudo docker compose ps
sudo docker compose logs --tail=100
sudo ss -ltnp | awk 'NR == 1 || /:80 |:443 /'
df -h
free -h
```

- **Build fails:** read the npm error above the failure. An out-of-memory failure may require a larger VM. Live files are unchanged if the build fails.
- **Site is unreachable:** check the external IP, DNS, VPC firewall rules, and container status. Another web server using ports 80/443 prevents the new Caddy setup from starting.
- **HTTPS certificate fails:** check Caddy logs, DNS (including AAAA), and incoming ports 80/443.
- **Old content:** confirm you pushed the intended branch and selected it with `DEPLOY_REF`, then hard refresh. If a CDN is configured, purge its cache too.
- **Permission denied:** use the documented `sudo docker` commands and the SSH account whose home contains the existing `site` directory.

## Local development

Install Node.js **22.12 or newer in the Node 22 series** and npm. This project uses Vite 7; see [Vite's Node requirements](https://vite.dev/guide/).

```bash
npm ci
npm run dev
```

Vite prints the development URL. To check a production build locally:

```bash
npm run build
npm run preview
```

`npm run build` writes `dist/`. `npm run preview` is a local preview server; production on the VM serves those static files through Docker Compose.
