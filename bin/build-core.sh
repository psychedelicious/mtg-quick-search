#!/bin/bash
# MTG Quick Search build script
# builds the extension as a standard react app with parcel,
# does some re-arranging so it works as a web extension,
# and builds and optionally signs the extension.

# clean and bundle with parcel
rm -rf dist/
parcel build src/mtgQuickSearchFindCard.js src/mtgQuickSearchEnterCard.js --no-source-maps

# rename CSS file (a parcel Namer could do this)
mv dist/mtgQuickSearchFindCard.css dist/mtgQuickSearch.css

# copy webextension-polyfill
cp node_modules/webextension-polyfill/dist/browser-polyfill.js dist/browser-polyfill.js

# copy background scripts
cp src/background.js dist/background.js

# copy content scripts
cp src/add-listeners.js dist/add-listeners.js

# copy options page
cp src/options.html dist/options.html
cp src/options.js dist/options.js
