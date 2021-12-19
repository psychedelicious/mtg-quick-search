#!/bin/bash

# copy icons
cp assets/icon16x16.png dist/icon16x16.png
cp assets/icon48x48.png dist/icon48x48.png
cp assets/icon128x128_padding.png dist/icon128x128_padding.png

# copy manifest
cp src/manifestChrome.json dist/manifest.json

# build
web-ext build --overwrite-dest --source-dir dist/ --artifacts-dir build/chrome/
