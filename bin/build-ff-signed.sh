#!/bin/bash
cp src/manifestFirefox.json dist/manifest.json
web-ext sign --source-dir dist/ --artifacts-dir build/firefox_signed/ --api-key=$MOZ_API_ISSUER --api-secret=$MOZ_API_SECRET
