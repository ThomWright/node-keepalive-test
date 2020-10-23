#!/usr/bin/env bash

set -o errexit
set -o pipefail
set -o nounset
# set -o xtrace

docker run --rm \
  --name keepalive-test-server \
  -v "$PWD"/dist:/app/dist \
  -p 8080:8080 \
  --init \
  -t \
  node-keepalive-test
