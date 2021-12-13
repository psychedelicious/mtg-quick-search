#!/bin/bash

# copy icons
cp icons/icon16.png dist/icon16.png
cp icons/icon48.png dist/icon48.png
cp icons/icon128.png dist/icon128.png

# copy manifest
cp src/manifestChrome.json dist/manifest.json

# build
web-ext build --overwrite-dest --source-dir dist/ --artifacts-dir build/chrome/
