## INGRESS

If you have Helm, you can deploy the ingress controller with the following command:

```zsh
    helm upgrade --install ingress-nginx ingress-nginx \
      --repo https://kubernetes.github.io/ingress-nginx \
      --namespace ingress-nginx --create-namespace
```

It will install the controller in the `ingress-nginx` namespace, creating that namespace if it doesn't already exist.

### Info

This command is idempotent:

- If the ingress controller is not installed, it will install it.
- If the ingress controller is already installed, it will upgrade it.

If you want a full list of values that you can set while installing with Helm, then run:

```zsh
helm show values ingress-nginx --repo https://kubernetes.github.io/ingress-nginx
```

### SSL

This command will create server ssl key:

```zsh
mkcert -key-file server.key -cert-file server.crt api.ehealthscape.com
```

Create kubernetes secrets:
```zsh
kubectl create secret tls ehealthscape-app-tls --key server.key --cert server.crt
```

Show all secrets in your cluster:
```zsh
kubectl get secrets
```