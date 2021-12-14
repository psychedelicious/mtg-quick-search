# MTG Quick Search

Web extension to look up MTG cards. Compatible with FF and Chromium-based browsers (e.g. Chrome, Edge, Brave - but I've only tested on [Ungoogled Chromium](https://github.com/Eloston/ungoogled-chromium)).

![demo](https://github.com/psychedelicious/mtg-quick-search/blob/master/assets/demo.gif?raw=true)

Pending publication to the Firefox and Chrome extension stores.

Please report any issues here.

- [MTG Quick Search](#mtg-quick-search)
  - [Usage](#usage)
  - [Installation](#installation)
    - [Firefox](#firefox)
    - [Chrome](#chrome)
  - [Build from source](#build-from-source)
    - [Firefox - Unsigned](#firefox---unsigned)
    - [Firefox - Signed](#firefox---signed)
    - [Chrome](#chrome-1)
  - [Technical](#technical)
  - [Changelog](#changelog)
    - [v1.0.3](#v103)
    - [v1.0.2](#v102)
    - [v1.0.1](#v101)

## Usage

Select a card name (or any text) and search for it using:

- The **MTG Quick Search** right-click menu button
- Keyboard shortcut `Opt`+`Shift`+`S` (`Alt`+`Shift`+`S` on Windows)

Cards that have been rebalanced have a button to see the original versions.

A flip button shows you both sides of double-faced cards.

`Escape` closes the popups one by one.

You can open as many cards as you like, move them around, etc - try it out.

## Installation

Until the extension is on the FF and Chrome web stores, you can install it manually.

### Firefox

- Download the latest signed Firefox build ([direct link](https://github.com/psychedelicious/mtg-quick-search/releases/download/v1.0.3/mtg_quick_search-1.0.3-firefox-signed.xpi))
- In Firefox, click Tools > Add-ons and Themes > gear icon > Install Add-on from File... > select the downloaded file.

### Chrome

- Download the latest Chrome build ([direct link](https://github.com/psychedelicious/mtg-quick-search/releases/download/v1.0.3/mtg_quick_search-1.0.3-chrome.zip))
- Unzip it
- In Chrome, click Chrome > Preferences > Extensions > enable Developer Mode > Load unpacked > select the unzipped folder

Steps should be the same for other Chromium browsers (e.g. Edge, Brave, Ungoogled Chromium
).

## Build from source

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

## Technical

Built in React. Uses [Scryfall](https://scryfall.com/)'s generously provided free API.

## Changelog

### v1.0.3

- Handles rebalanced (Alchemy) cards, allows for toggling between OG and rebalanced versions
- UI improvements

### v1.0.2

- Improved searching: first tries using a normal Scryfall search, if nothing found tries a fuzzy search

### v1.0.1

- Initial release
