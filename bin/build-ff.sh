#!/bin/bash
cp src/manifestFirefox.json dist/manifest.json
web-ext build --overwrite-dest --source-dir dist/ --artifacts-dir build/firefox_unsigned/
