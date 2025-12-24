#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

: "${AZURE_SUBSCRIPTION_ID:=cc332703-50a3-4b74-996c-0b3dbe031910}"
: "${AZURE_TENANT_ID:=9eecb244-ff49-463e-8604-2b98d42fa287}"
: "${RG:=rg-ecommerce-dev}"
: "${ACR_NAME:=acrecommercedev629}"
: "${AKS:=aks-ecommerce-dev}"
: "${AZURE_STORAGE_ACCOUNT:=storageecommerce629}"

export ROOT_DIR
export AZURE_SUBSCRIPTION_ID
export AZURE_TENANT_ID
export RG
export ACR_NAME
export AKS
export AZURE_STORAGE_ACCOUNT
