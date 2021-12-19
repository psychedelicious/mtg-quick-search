#!/bin/bash

# copy icons
cp assets/icon16x16.png dist/icon16x16.png
cp assets/icon48x48.png dist/icon48x48.png
cp assets/icon96x96.png dist/icon96x96.png

# copy manifest
cp src/manifestFirefox.json dist/manifest.json

# build
web-ext sign --source-dir dist/ --artifacts-dir build/firefox_signed/ --api-key=$MOZ_API_ISSUER --api-secret=$MOZ_API_SECRET
