#!/bin/bash
cp src/manifestChrome.json dist/manifest.json
web-ext build --overwrite-dest --source-dir dist/ --artifacts-dir build/chrome/
