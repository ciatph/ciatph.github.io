#!/bin/bash
set -ev

if [ "${GITHUB_API_TOKEN}" ]; then
  npm run lint

  # Build only from `vue-version` branch
  if [ "${TRAVIS_BRANCH}" = 'vue-version' -a "${TRAVIS_PULL_REQUEST}" = 'false' ]; then
    npm run build
    cp README.md dist/
    cd dist
    ls -l -a
  fi
fi