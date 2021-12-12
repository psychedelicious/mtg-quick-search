import { useEffect, useState } from 'react';
import preloadImage from '../util/preloadImage';
import Card from './Card';
import Loading from './Loading';
import Error from './Error';
import * as classes from '../styles/styles.module.scss';
import getMaxZIndex from '../util/getMaxZIndex';

const Popup = ({ searchTerm, x, y, uuid, parentUuid, z }) => {
  const [requestStatus, setRequestStatus] = useState('pending');
  const [cardJson, setCardJson] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [zIndex, setZIndex] = useState(z);

  const popupUuid = `mtg-quick-search-popup-${uuid}`;

  useEffect(() => {
    fetch(encodeURI(`https://api.scryfall.com/cards/named?fuzzy=${searchTerm}`))
      .then((response) => {
        cachedResponse = response;
        if (!response.ok && response.status !== 404) {
          setErrorMessage('unknown');
          throw Error('unknown');
        }
        return response.json();
      })
      .then((json) => {
        if (json.status === 404) {
          if (json.type === 'ambiguous') {
            setErrorMessage('ambiguous');
            throw Error('ambiguous');
          }
          setErrorMessage('not_found');
          throw Error('not_found');
        }

        setCardJson(json);

        const imageUris = [];
        if (json.hasOwnProperty('card_faces')) {
          json.card_faces.forEach((face) => {
            imageUris.push(face.image_uris.normal);
          });
        } else {
          imageUris.push(json.image_uris.normal);
        }
        return Promise.all(imageUris.map((uri) => preloadImage(uri)));
      })
      .then(() => setRequestStatus('success'))
      .catch(() => {
        setRequestStatus('error');
      });
  }, []);

  const closePopup = () => {
    document.getElementById(parentUuid).remove();
  };

  // https://javascript.info/mouse-drag-and-drop
  const handleMouseDown = (e) => {
    if (e.buttons === 1) {
      e.stopPropagation();

      if (zIndex <= getMaxZIndex() - 2) {
        setZIndex(getMaxZIndex() + 2);
      }
      const popupElement = document.getElementById(popupUuid);

      let shiftX = e.clientX - popupElement.getBoundingClientRect().left;
      let shiftY = e.clientY - popupElement.getBoundingClientRect().top;

      moveAt(e.clientX, e.clientY);

      // moves the popupElement at (pageX, pageY) coordinates
      // taking initial shifts into account
      function moveAt(pageX, pageY) {
        popupElement.style.left = pageX - shiftX + 'px';
        popupElement.style.top = pageY - shiftY + 'px';
      }

      function onMouseMove(e) {
        moveAt(e.clientX, e.clientY);
      }

      // move the popupElement on mousemove
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener(
        'mouseup',
        () => {
          document.removeEventListener('mousemove', onMouseMove);
        },
        { once: true }
      );
    }
  };

  const handleDragStart = () => false;

  return (
    <div
      id={popupUuid}
      className={`${classes.mtgQuickSearch} mtg-quick-search-popup`}
      style={{ top: `${y}px`, left: `${x}px`, zIndex: zIndex }}
    >
      {requestStatus === 'success' && (
        <Card cardJson={cardJson} closePopup={closePopup} z={zIndex} />
      )}
      {requestStatus === 'error' && (
        <Error
          errorMessage={errorMessage}
          searchTerm={searchTerm}
          z={zIndex}
          closePopup={closePopup}
        />
      )}
      {requestStatus === 'pending' && <Loading />}
      <div
        className={classes.mtgQuickSearchDrag}
        onMouseDown={handleMouseDown}
        onDragStart={handleDragStart}
        onClick={(e) => e.stopPropagation()}
      ></div>
    </div>
  );
};

export default Popup;
