#!/usr/bin/env bash

export BRANCH=${GITHUB_REF:11}
export PACT_FILES_LOCATION=consumer-spa/cypress/pacts
export VERSION=1.0.0

if [[ -z "${PACT_BROKER_BASE_URL}" ]]; then
    echo "Error, could not find env var PACT_BROKER_BASE_URL"
    exit 1
elif [[ -z "${PACT_BROKER_TOKEN}" ]]; then
    echo "Error, could not find env var PACT_BROKER_TOKEN"
    exit 1
fi

docker run --rm \
    -v $(pwd):/$(pwd) \
    -w $(pwd) \
    -e PACT_BROKER_BASE_URL \
    -e PACT_BROKER_TOKEN \
    pactfoundation/pact-cli:latest \
    pact-broker publish $PACT_FILES_LOCATION \
    --consumer-app-version $VERSION \
    --broker-base-url $PACT_BROKER_BASE_URL \
    --branch main
