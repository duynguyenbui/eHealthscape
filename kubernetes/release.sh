#!/bin/zsh 

# Release all resources
kubectl delete all --all

# Release nginx
kubectl delete all --all -n ingress-nginx
