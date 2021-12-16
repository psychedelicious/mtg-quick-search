import ReactDOM from 'react-dom';
import Popup from './components/Popup';
import { v4 as uuidv4 } from 'uuid';
import getMaxZIndex from './util/getMaxZIndex';
import getSelection from './util/getSelection';

/*
 * mozilla's polyfill for chrome's extension API.
 *
 * we have to use the polyfill here in addition to manifest.json,
 * because this file is bundled by parcel.
 */
var browser = require('webextension-polyfill');

let { text: searchTerm, x, y } = getSelection();

// only do the thing if we have a selection
if (searchTerm.length > 0) {
  // we need each popup to be unique, give them a uuid
  const uuid = uuidv4();
  const parentUuid = `mtg-quick-search-parent-${uuid}`;

  // create a parent div into which react will render the popup
  const parent = document.createElement('div');
  parent.id = parentUuid;
  document.body.appendChild(parent);

  /*
   * get the max z-index of existant card popups, add 2 to it, so that this
   * card popup will be layered on top of the other ones.
   *
   * add 2 because we have some buttons, which need to by above this popup,
   * but below the others
   */
  const zIndex = getMaxZIndex() + 2;

  /*
   * shift the card popup to be in the window, accounting for the edge case
   * where the pixel location of the selection is outside the visible window.
   *
   * if the popup was made outside the visible window, it would not be
   * recoverable, because it uses css position: fixed.
   */
  const { innerWidth, innerHeight } = window;
  x = x > innerWidth - 100 ? innerWidth - 100 : x;
  y = y > innerHeight - 100 ? innerHeight - 100 : y;

  /*
   * grab the saved scale value before anything else happens, to avoid
   * the popup briefly rendering at a potentially different scale while the
   * async call to browser.storage.local resolves
   */
  browser.storage.local.get('scale').then((data) =>
    // render the popup in the unique parent element
    ReactDOM.render(
      <Popup
        searchTerm={searchTerm}
        x={x}
        y={y}
        uuid={uuid}
        parentUuid={parentUuid}
        z={zIndex}
        scale={data.scale}
      />,
      parent
    )
  );
}
