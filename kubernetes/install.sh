#!/bin/zsh 

helm install postgres ./charts/postgres/
helm install redis ./charts/redis/
helm install speech ./charts/speech/
helm install healthrc ./charts/healthrc/
helm install bff ./charts/bff/

helm upgrade --install ingress-nginx ingress-nginx \
  --repo https://kubernetes.github.io/ingress-nginx \
  --namespace ingress-nginx --create-namespace
  
kubectl create secret tls ehealthscape-app-tls --key ./certs/server.key --cert ./certs/server.crt
kubectl apply -f ./charts/nginx/ingress.yaml