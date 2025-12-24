#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
# shellcheck source=../setup.sh
source "$ROOT_DIR/setup.sh"

echo "RG=$RG"
echo "AKS=$AKS"
echo "ACR_NAME=$ACR_NAME"

# Require an Azure login (interactive login not handled here)
if ! az account show >/dev/null 2>&1; then
  echo "Not logged in. Please run 'az login' (or ensure your OIDC/session is active) and retry." >&2
  exit 1
fi

echo "Fetching AKS credentials..."
az aks get-credentials -g "$RG" -n "$AKS"

echo "Attaching ACR to AKS (idempotent)..."
az aks update -g "$RG" -n "$AKS" --attach-acr "$ACR_NAME"

echo "Done: kubecontext set and ACR attached."
