import ReactDOM from 'react-dom';
import Popup from './components/Popup';
import { v4 as uuidv4 } from 'uuid';
import getMaxZIndex from './util/getMaxZIndex';
import getSelection from './util/getSelection';

let { text: searchTerm, x, y } = getSelection();

if (searchTerm.length > 0) {
  // remove popups based on z-index
  window.addEventListener('keydown', (e) => {
    const popups = Array.from(
      document.querySelectorAll('.mtg-quick-search-popup')
    );

    if (e.key === 'Escape' && popups.length > 0) {
      e.stopImmediatePropagation();

      popups
        .sort((a, b) => b.style.zIndex - a.style.zIndex)[0]
        .parentElement.remove();
    }

    if (popups.length === 0) {
      window.removeEventListener('keydown', this);
    }
  });

  const uuid = uuidv4();
  const parentUuid = `mtg-quick-search-parent-${uuid}`;
  const parent = document.createElement('div');
  parent.id = parentUuid;
  document.body.appendChild(parent);
  const zIndex = getMaxZIndex() + 2;

  ReactDOM.render(
    <Popup
      searchTerm={searchTerm}
      x={x}
      y={y}
      uuid={uuid}
      parentUuid={parentUuid}
      z={zIndex}
    />,
    parent
  );
}
