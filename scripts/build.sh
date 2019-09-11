#!/bin/bash
set -ev

if [ "${GITHUB_API_TOKEN}" ]; then
  npm run lint
  npm run build
  cp README.md dist/
  cd dist
  ls -l -a
fi