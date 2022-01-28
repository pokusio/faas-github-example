#!/bin/bash

# /|\- /|\- /|\- /|\- /|\- /|\- /|\- /|\- /|\- /|\- /|\- /|\- /|\- /|\- /|\- /|\- /|\- #
# /|\- /|\- /|\- /|\- /|\- /|\- /|\- /|\- /|\- /|\- /|\- /|\- /|\- /|\- /|\- /|\- /|\- #
# /|\- /|\- /|\- /|\- /|\- /|\- /|\- /|\- /|\- /|\- /|\- /|\- /|\- /|\- /|\- /|\- /|\- #
export FAAS_FUNC_NAME="my-new-awesome-function"
# Below is a local ip address :
# OpenFAAS : I locally run k3d with 3 servers n 3 agents
# Docker Registry : I locally run docker-compose
export DOCKHOST_IP_ADDR="192.168.208.7"
# "OF_TEMPLATE_IMAGE_NAME"  must be same image name as the
# image property in the [<name of yoour faas function>.yml]
export OF_TEMPLATE_IMAGE_NAME="${DOCKHOST_IP_ADDR}:5000/pokus/faas-gh-cli-node16:latest"
# export OF_TEMPLATE_IMAGE_NAME="${DOCKHOST_IP_ADDR}:5000/pokus/faas-${FAAS_FUNC_NAME}:0.0.1-node16"
faas-cli up --build-arg AWESOME=true --image "${OF_TEMPLATE_IMAGE_NAME}" -f ${FAAS_FUNC_NAME}.yml $(pwd)/${FAAS_FUNC_NAME}/handler.js || true
