#!/bin/bash
# MTG Quick Search build script
# builds the extension as a standard react app with parcel,
# does some re-arranging so it works as a web extension,
# and builds and optionally signs the extension.

# clean and bundle with parcel, no minification
rm -rf dist/
parcel build src/index.html --no-optimize

# rename built js and css bundles
mv dist/index.*.js dist/mtgQuickSearch.js
mv dist/index.*.css dist/mtgQuickSearch.css

# copy webextension-polyfill
cp node_modules/webextension-polyfill/dist/browser-polyfill.js dist/browser-polyfill.js
cp node_modules/webextension-polyfill/dist/browser-polyfill.js.map dist/browser-polyfill.js.map

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
