#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

(
  cd "$ROOT_DIR/api"
  echo "Starting API on http://localhost:8080 ..."
  ASPNETCORE_URLS="http://0.0.0.0:8080" dotnet watch run &
)
API_PID=$!

trap 'echo "Stopping API..."; kill $API_PID 2>/dev/null || true' EXIT

cd "$ROOT_DIR/web"
echo "Starting Vite dev server on http://localhost:5173 (proxy /api -> 8080) ..."
npm run dev -- --host --port 5173
