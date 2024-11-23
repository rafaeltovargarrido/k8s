local k = import "github.com/grafana/jsonnet-libs/ksonnet-util/kausal.libsonnet";

{
  local deployment = k.apps.v1.deployment,
  local container = k.core.v1.container,
  local port = k.core.v1.containerPort,
  local service = k.core.v1.service,

  prometheus: {
    deployment: deployment.new(
      name="prometheus", replicas=1,
      containers=[
        container.new("prometheus", "prom/prometheus")
        + container.withPorts([port.new("api", 9090)]),
      ],
    ),
    service: k.util.serviceFor(self.deployment),
  },
  grafana: {
    deployment: deployment.new(
      name="grafana", replicas=1,
      containers=[
        container.new("grafana", "grafana/grafana")
        + container.withPorts([port.new("ui", 3000)]),
      ],
    ),
    service:
      k.util.serviceFor(self.deployment)
      + service.mixin.spec.withType("NodePort"),
  },
}