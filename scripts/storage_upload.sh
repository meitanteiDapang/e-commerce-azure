#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
# shellcheck source=../setup.sh
source "$ROOT_DIR/setup.sh"

STORAGE_DIR="${STORAGE_DIR:-$ROOT_DIR/storage}"

ACCOUNT_NAME="${AZURE_STORAGE_ACCOUNT:-}"
if [[ -z "$ACCOUNT_NAME" ]]; then
  echo "No storage account found. Set AZURE_STORAGE_ACCOUNT or check az-inventory." >&2
  exit 1
fi

AUTH_ARGS=()
if [[ -z "${AZURE_STORAGE_CONNECTION_STRING:-}" ]]; then
  AUTH_ARGS+=(--auth-mode "${AZURE_STORAGE_AUTH_MODE:-login}")
fi

if [[ ! -d "$STORAGE_DIR" ]]; then
  echo "Storage directory not found: $STORAGE_DIR" >&2
  exit 1
fi

found_any=0
while IFS= read -r container_dir; do
  found_any=1
  container_name="$(basename "$container_dir")"
  az storage blob upload-batch \
    --account-name "$ACCOUNT_NAME" \
    --destination "$container_name" \
    --source "$container_dir" \
    --overwrite true \
    "${AUTH_ARGS[@]}" \
    --only-show-errors
done < <(find "$STORAGE_DIR" -mindepth 1 -maxdepth 1 -type d | sort)

if [[ "$found_any" -eq 0 ]]; then
  echo "No containers found under: $STORAGE_DIR" >&2
  exit 1
fi
