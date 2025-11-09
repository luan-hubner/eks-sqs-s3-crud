```
kubectl create secret generic app-secrets \
	--from-literal=AWS_ACCESS_KEY_ID=<YOUR_KEY_ID> \
	--from-literal=AWS_SECRET_ACCESS_KEY=<YOUR_ACCESS_KEY> \
	--from-literal=DATABASE_URL=<YOUR_DATABASE_URL>
```

`kubectl apply -f configmap.yml`
`kubectl apply -f service.yml`
`kubectl apply -f deployment.yml`
