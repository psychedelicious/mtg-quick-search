# MTG Quick Search

Unofficial **Magic: The Gathering** browser extension to look up MTG cards.

Available for [Firefox](https://addons.mozilla.org/en-US/firefox/addon/mtg-quick-search/) and [Chrome](https://chrome.google.com/webstore/detail/mtg-quick-search/gdnekehcblnkoaocmkdmpgphjnffigco).

![demo](https://github.com/psychedelicious/mtg-quick-search/blob/master/assets/demo.gif?raw=true)

Please report any issues here.

<!-- MarkdownTOC -->

- [Features](#features)
- [Installation](#installation)
  - [Manual Installation](#manual-installation)
- [Build from source](#build-from-source)
  - [Firefox - Unsigned](#firefox---unsigned)
  - [Firefox - Signed](#firefox---signed)
  - [Chrome](#chrome)
- [Thanks](#thanks)
- [Changelog](#changelog)
  - [v1.0.8](#v108)
  - [v1.0.7](#v107)
  - [v1.0.6](#v106)
  - [v1.0.5](#v105)
  - [v1.0.4](#v104)
  - [v1.0.3](#v103)
  - [v1.0.2](#v102)
  - [v1.0.1](#v101)

<!-- /MarkdownTOC -->

## Features

- Select a card name (or any text) and search for it using:
  - **MTG Quick Search** in the right-click menu
  - `Opt`+`Shift`+`S` (`Alt`+`Shift`+`S` on Windows)
- Links to Gatherer, Scryfall and EDHREC
- Double-faced cards get a flip button to see both sides
- Rebalanced cards get an Alchemy button to see both versions
- `Escape` closes the popups one by one (starting with the one on top)
- Drag from the bottom right corner to resize the card popup
  - Check the extension preferences in the browser to change the default size
- Open a small popup to type in a card name to search for with `Opt`+`Shift`+`E` (`Alt`+`Shift`+`E` on Windows), `Enter` to search, and `Escape` to close

You can open as many cards as you like, move them around, etc - try it out.

## Installation

Available on the [Firefox](https://addons.mozilla.org/en-US/firefox/addon/mtg-quick-search/) and [Chrome](https://chrome.google.com/webstore/detail/mtg-quick-search/gdnekehcblnkoaocmkdmpgphjnffigco) web stores.

### Manual Installation

You can download the [latest signed Firefox build](https://github.com/psychedelicious/mtg-quick-search/releases/download/v1.0.8/mtg_quick_search-1.0.8-firefox-signed.xpi) or [latest Chrome build](https://github.com/psychedelicious/mtg-quick-search/releases/download/v1.0.8/mtg_quick_search-1.0.8-chrome.zip) and install manually in either browser.

## Build from source

The build scripts are bash scripts.

### Firefox - Unsigned

`yarn run build-ff` outputs an unsigned build to `build/firefox/`.

### Firefox - Signed

_You probably don't want to do this - just download the latest signed Firefox release if you want to run the extension on Firefox._

You would do this if you wanted to publish a fork of this extension for some reason - I'd prefer a pull request, though.

This requires Mozilla Add-on API credentials. The build script expects the JWT issuer to be in an environment variable `MOZ_API_ISSUER` and the JWT secret to be in `MOZ_API_SECRET`.

`yarn run build-ff-signed` builds and signs the extension with Mozilla, outputting a zip file to `build/firefox_signed`.

The signed extension can be installed from file per usual.

### Chrome

`yarn run build-chrome` outputs a build to `build/chrome/`.

## Thanks

Uses [Scryfall](https://scryfall.com/)'s generously provided free API.

Thanks to Wizards of the Coast's kind [fan content policy](https://company.wizards.com/en/legal/fancontentpolicy) for allowing me to use the Magic card back image.

## Changelog

### v1.0.8

- Bug fix

### v1.0.7

- Adds free-text search popup
- UI continues to get prettier
- Internal housekeeping

### v1.0.6

- Fixes bug with CSS inheritance

### v1.0.5

- UI icons now prettier
- Internal improvements

### v1.0.4

- Cards can now be resized, and default size can be set in the extension's preferences

### v1.0.3

- Handles rebalanced (Alchemy) cards, allows for toggling between OG and rebalanced versions
- UI improvements

### v1.0.2

- Improved searching: first tries using a normal Scryfall search, if nothing found tries a fuzzy search

### v1.0.1

- Initial release
