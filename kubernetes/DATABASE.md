# Instruction to Deploy DATABASE to a Cluster

## Postgres

### 1. Ensure Kubernetes is Installed
Make sure Kubernetes is installed on your machine (e.g., via Docker Desktop).

**Navigate to your directory:**
```sh
cd kubernetes
```

### 2. Create Secret
Inside the `kubernetes/secrets` directory, run:
```sh
kubectl create -f dev-secrets.yaml
```

### 3. Deploy PostgreSQL
Inside the `kubernetes/infrastructure` directory, run:
```sh
kubectl create -f dev-pvc.yaml
```
```sh
kubectl create -f postgres-pvc.yaml
```

## Redis

Create the Redis Insight deployment with persistant storage
```sh
kubectl apply -f redisinsight.yaml
```
Once the deployment has been successfully applied and the deployment is complete, access Redis Insight. This can be accomplished by exposing the deployment as a K8s Service or by using port forwarding, as in the example below:
```sh
kubectl port-forward deployment/redisinsight 5540
```
Open your browser and point to http://localhost:5540



