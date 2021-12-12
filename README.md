# MTG Quick Search

Web extension to look up MTG cards. Compatible with FF and Chromium-based browsers (e.g. Chrome, Edge, Brave).

Pending publication to the app store.

Please report any issues here.

## Installation

Until the extension is on the FF and Chrome web stores, you can install it manually. Download the latest release (signed) and [install as described below](#signed).

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

### Unsigned

`yarn run build` builds the extension, outputting a zip file in the `build/` folder.

This unsigned build can be installed in a few ways:

- As a temporary extension on normal Firefox via `about:debugging`.
- As a normal extension on Nightly/Developer Firefox builds, after setting `xpinstall.signatures.required` to `false` in `about:config`.
- As a normal extension on Chrome, after enabling `Developer Mode` on `chrome://extensions/`. Open the `dist` folder instead of the built zip file.

### Signed

`yarn run build:signed` builds and signs the extension, outputting a zip file in the `build/` folder.

This requires Mozilla Add-on API credentials. The build script expects the JWT issuer to be in an environment variable `MOZ_API_ISSUER` and the JWT secret to be in `MOZ_API_SECRET`.

The extension can be installed from file per usual.

## Technical

Built in React. Uses [Scryfall](https://scryfall.com/)'s generously provided free API.
