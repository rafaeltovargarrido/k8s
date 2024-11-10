# Guia de comandos Clase 1.

Esta guía describe los pasos para crear un clúster de Kubernetes usando Minikube, y desplegar una serie de apps.


## Requisitos previos
- **Minikube** instalado en tu máquina.
- **kubectl** instalado para gestionar el clúster de Kubernetes.
- **Helm** gestión de paquetes en k8s..

---

### Commando 1: Crear un Clúster Minikube

Inicia un clúster de Minikube con la configuración de memoria y CPU especificada.

```bash
minikube start --memory=16384 --cpus=4
```


### Commando 2: Crear un namespace

```bash
kubectl create namespace test
```

### Commando 3: Crear un Pod

```bash
kubectl apply -f k8s/manifiestos/c1/pod.yaml
```

### Commando 4: Crear un deployment y servicio


```bash
kubectl apply -f k8s/manifiestos/c1/httpbin.yaml
```

### Commando 5: Crear un deployment y servicio


```bash
kubectl apply -f k8s/manifiestos/c1/httpbin.yaml
```

### Commando 6: Obtener los pods, deployments y svc.

```bash
kubectl get pods,deployments,service
```

### Commando 7: uso de k9s.

```bash
k9s
```

### Commando 8: Verificar logs de un pod.

```bash
kubectl logs [POD_NAME]
```
### Commando 9: .

```bash

```



helm repo index charts/ --url https://rafaeltovargarrido.github.io/k8s/charts

helm package ./charts/nginx -d charts/