#!/bin/bash

# copy icons
cp icons/icon16.png dist/icon16.png
cp icons/icon48.png dist/icon48.png
cp icons/icon.svg dist/icon.svg

# copy manifest
cp src/manifestFirefox.json dist/manifest.json

# build
web-ext build --overwrite-dest --source-dir dist/ --artifacts-dir build/firefox_unsigned/
