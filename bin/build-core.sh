#!/bin/bash
# MTG Quick Search build script
# builds the extension as a standard react app with parcel,
# does some re-arranging so it works as a web extension,
# and builds and optionally signs the extension.

BuildCore() {
  # clean and bundle with parcel
  rm -rf dist/
  parcel build src/index.html --no-source-maps

  # rename built js and css bundles
  mv dist/index.*.js dist/mtgQuickSearch.js
  mv dist/index.*.css dist/mtgQuickSearch.css

  # copy icons
  mkdir dist/icons
  cp icons/icon16.png dist/icons/icon16.png
  cp icons/icon48.png dist/icons/icon48.png
  cp icons/icon128.png dist/icons/icon128.png

  # copy webextension-polyfill
  cp node_modules/webextension-polyfill/dist/browser-polyfill.min.js dist/browser-polyfill.min.js

  # copy background script
  cp src/background.js dist/background.js

  # wrap code in an IIFE (required to prevent redeclaration of variables)
  printf '(() => {' | cat - dist/mtgQuickSearch.js >temp
  mv temp dist/mtgQuickSearch.js
  printf "\n" >>dist/mtgQuickSearch.js
  printf '})()' >>dist/mtgQuickSearch.js
  printf "\n" >>dist/mtgQuickSearch.js

  # remove index.html (only there to be a target for parcel)
  rm dist/index.html
}
