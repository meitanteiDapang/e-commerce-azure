helm repo add jetstack https://charts.jetstack.io
helm repo update

kubectl create namespace cert-manager

helm install cert-manager jetstack/cert-manager \
  -n cert-manager \
  --set crds.enabled=true
