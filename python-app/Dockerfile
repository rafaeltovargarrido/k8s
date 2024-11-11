FROM python:3.9-slim

LABEL org.opencontainers.image.source="https://github.com/rafaeltovargarrido/k8s"

WORKDIR /app

COPY . .

RUN pip install -r requirements.txt


CMD ["python", "app.py"]