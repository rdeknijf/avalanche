+++
title = "PostgreSQL benchmark over Cloud Proxy in GKE: socket vs port"
date = 2019-07-13
description = "Sockets are always faster, right? Right, let's check that quickly."
draft = false
+++

In my bubble it's always been common knowledge that a database connection over a Unix socket is faster
than that same connection over a TCP connection.

But does this boat still float when using the Google recommended way to access Cloud SQL 
from GKE: with Google Cloud Proxy as a sidecar in a pod? *Since Cloud Proxy moves data over a TCP tunnel, 
speed should be identical.*

So to save everyone a little time, I did some very minimal benchmarking:

# Setup

(If you want to replicate this; remember to fill in `connection_name`, `username` and `password`.)

## Unix Socket
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: pgbench
spec:
  selector:
    matchLabels:
      app: pgbench
  template:
    metadata:
      labels:
        app: pgbench
    spec:
      containers:
        - name: cloudsql-proxy
          image: gcr.io/cloudsql-docker/gce-proxy
          command: ["/cloud_sql_proxy",
                    "--dir=/cloudsql",
                    "-instances=<connection_name>",
                    "-credential_file=/secrets/cloudsql/service-account-credentials.json"]
          volumeMounts:
            - name: cloudsql-instance-credentials
              mountPath: /secrets/cloudsql
              readOnly: true
            - name: cloudsql-sockets
              mountPath: /cloudsql
        - name: benchapp
          image: postgres
          command: ["pgbench", "-h", "/cloudsql", "-U", "<username>", "-d", "<dbname>", "-c", "5", "-T", "30"]
          volumeMounts:
            - name: cloudsql-sockets
              mountPath: /cloudsql
      volumes:
        - name: cloudsql-instance-credentials
          secret:
            secretName: service-account-credentials
        - name: cloudsql-sockets
          emptyDir: {}
```

## TCP Port
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: pgbench
spec:
  selector:
    matchLabels:
      app: pgbench
  template:
    metadata:
      labels:
        app: pgbench
    spec:
      containers:
        - name: cloudsql-proxy
          image: gcr.io/cloudsql-docker/gce-proxy
          command: ["/cloud_sql_proxy",
                    "-instances=<connection_name>=tcp:127.0.0.1:5432",
                    "-credential_file=/secrets/cloudsql/service-account-credentials.json"]
          volumeMounts:
            - name: cloudsql-instance-credentials
              mountPath: /secrets/cloudsql
              readOnly: true
        - name: pgbench
          image: postgres
          command: ["pgbench", "-h", "localhost:5432", "-U", "<username>", "-d", "<dbname>", "-c", "5", "-T", "30"]
      volumes:
        - name: cloudsql-instance-credentials
          secret:
            secretName: service-account-credentials
```

# Benchmark

## Unix Socket

First test:

    transaction type: TPC-B (sort of)
    scaling factor: 1
    query mode: simple
    number of clients: 5
    number of threads: 1
    duration: 30 s
    number of transactions actually processed: 10410
    latency average: 14.415 ms
    tps = 346.862388 (including connections establishing)
    tps = 347.051570 (excluding connections establishing)
    
Second test:

    transaction type: TPC-B (sort of)
    scaling factor: 1
    query mode: simple
    number of clients: 5
    number of threads: 1
    duration: 30 s
    number of transactions actually processed: 9852
    latency average: 15.321 ms
    tps = 326.351848 (including connections establishing)
    tps = 326.511321 (excluding connections establishing)

## TCP

First test:

    transaction type: TPC-B (sort of)
    scaling factor: 1
    query mode: simple
    number of clients: 5
    number of threads: 1
    duration: 30 s
    number of transactions actually processed: 9496
    latency average: 15.803 ms
    tps = 316.396207 (including connections establishing)
    tps = 316.564728 (excluding connections establishing)

Second test:

    transaction type: TPC-B (sort of)
    scaling factor: 1
    query mode: simple
    number of clients: 5
    number of threads: 1
    duration: 30 s
    number of transactions actually processed: 9474
    latency average: 15.840 ms
    tps = 315.652811 (including connections establishing)
    tps = 315.813361 (excluding connections establishing)

# Conclusion

In my 2(!) tests sockets are about 7% faster, which surprised me a bit. I expected the Cloud Proxy
tunnel to equalize the performance, but there's still a measurable difference.

I leave it up to you to decide whether that's enough to switch if you're currently using TCP. You
should probably benchmark it in your own cluster with your actual workload, but at least now you
know what to expect.