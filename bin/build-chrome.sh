#!/bin/bash

# copy icons
cp assets/icon16.png dist/icon16.png
cp assets/icon48.png dist/icon48.png
cp assets/icon128.png dist/icon128.png

# copy manifest
cp src/manifestChrome.json dist/manifest.json

# build
web-ext build --overwrite-dest --source-dir dist/ --artifacts-dir build/chrome/
