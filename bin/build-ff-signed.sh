#!/bin/bash

# copy icons
cp assets/icon16.png dist/icon16.png
cp assets/icon48.png dist/icon48.png
cp assets/icon.svg dist/icon.svg

# copy manifest
cp src/manifestFirefox.json dist/manifest.json

# build
web-ext sign --source-dir dist/ --artifacts-dir build/firefox_signed/ --api-key=$MOZ_API_ISSUER --api-secret=$MOZ_API_SECRET
