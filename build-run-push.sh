#!/bin/bash
set -e

REPOSITORY="${REPOSITORY:=docker.io}"
REGISTRY="${REGISTRY:=spectralone}"
IMAGE="${IMAGE:=ppo}"
VERSION="${VERSION:=latest}"
TAG=$REPOSITORY/$REGISTRY/$IMAGE:$VERSION

SCRIPT=`basename "$0"`
COMMAND=$1

if [[ -z "$COMMAND" ]]; then
    echo <<-EOF "
Docker Utility Script
Usage: $SCRIPT COMMAND

Commands:
    build       Build an image from a Dockerfile
    run         Run a command in a new container
    push        Push an image or a repository to a registry
    login       Log in to a Docker registry

Environment variables:
    REPOSITORY  Repository server address and port number (default: $REPOSITORY)
    REGISTRY    Registry name (default: $REGISTRY)
    IMAGE       Image name (default: $IMAGE)
    VERSION     Version number (default: $VERSION)

'$SCRIPT' without any paramaters prints this help. "
EOF
    exit 1
fi

echo TAG=$TAG

if [[ "$COMMAND" == "build" ]]; then
    docker build --rm --force-rm --tag $TAG .
elif [[ "$COMMAND" == "run" ]]; then
    docker run --rm -it --name $IMAGE $TAG
elif [[ "$COMMAND" == "push" ]]; then
    docker push $TAG
elif [[ "$COMMAND" == "login" ]]; then
    docker login $REPOSITORY
fi
