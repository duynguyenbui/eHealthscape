# Instruction to Deploy PostgreSQL Data to a Cluster

## 1. Ensure Kubernetes is Installed
Make sure Kubernetes is installed on your machine (e.g., via Docker Desktop).

**Navigate to your directory:**
```sh
cd kubernetes
```

## 2. Create Secret
Inside the `kubernetes/secrets` directory, run:
```sh
kubectl create -f dev-secrets.yaml
```

## 3. Deploy PostgreSQL
Inside the `kubernetes/infrastructure` directory, run:
```sh
kubectl create -f dev-pvc.yaml
```
```sh
kubectl create -f postgres-pvc.yaml
```