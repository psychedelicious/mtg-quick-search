# MTG Quick Search

Web extension to look up MTG cards. Compatible with FF and Chromium-based browsers (e.g. Chrome, Edge, Brave).

![example](https://github.com/psychedelicious/mtg-quick-search/blob/master/images/example.gif?raw=true)

Pending publication to the Firefox and Chrome extension stores.

Please report any issues here.

- [MTG Quick Search](#mtg-quick-search)
  - [Installation](#installation)
    - [Firefox](#firefox)
    - [Chrome](#chrome)
  - [Usage](#usage)
  - [Build from source](#build-from-source)
    - [Firefox - Unsigned](#firefox---unsigned)
    - [Firefox - Signed](#firefox---signed)
    - [Chrome](#chrome-1)
  - [Technical](#technical)

## Installation

Until the extension is on the FF and Chrome web stores, you can install it manually. [Download from Releases](https://github.com/psychedelicious/mtg-quick-search/releases/tag/latest).

### Firefox

- Download the latest signed Firefox release
- Click Tools > Add-ons and Themes > gear icon > Install Add-on from File... > select the zip

### Chrome

- Download the latest Chrome release
- Unzip it to its own folder
- Click Chrome > Preferences > Extensions > enable Developer Mode > Load unpacked > select the unzipped folder

## Usage

Select a card name (or any text) and search for it using:

- The **MTG Quick Search** right-click menu button
- Keyboard shortcut `Opt`+`Shift`+`S` (`Alt`+`Shift`+`S` on Windows)

The search only displays a card if there is exactly one match. You can try searching Scryfall if there are no matches, multiple matches, or something else goes awry.

- X => close popup
- G => open card on Gatherer
- S => open card on Scryfall
- E => open card on EDHREC
- ↺ => flip card (if it is double-faced)
- `Escape` => close popup

You can open as many cards as you like, move them around, etc - try it out.

## Build from source

### Firefox - Unsigned

`yarn run build-ff` outputs an unsigned build to `build/firefox/`.

### Firefox - Signed

You probably don't want to do this - just download the latest signed Firefox release if you want to run the extension on Firefox.

You would do this if you wanted to publish a fork of this extension for some reason - I'd prefer a pull request, though.

This requires Mozilla Add-on API credentials. The build script expects the JWT issuer to be in an environment variable `MOZ_API_ISSUER` and the JWT secret to be in `MOZ_API_SECRET`.

`yarn run build-ff-signed` builds and signs the extension with Mozilla, outputting a zip file to `build/firefox_signed`.

The signed extension can be installed from file per usual.

### Chrome

`yarn run build-chrome` outputs a build to `build/chrome/`.

## Technical

Built in React. Uses [Scryfall](https://scryfall.com/)'s generously provided free API.
