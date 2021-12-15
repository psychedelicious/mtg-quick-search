import { useEffect, useState } from 'react';
import preloadImage from '../util/preloadImage';
import Card from './Card';
import Loading from './Loading';
import Error from './Error';
import * as classes from '../styles/styles.module.scss';
import getMaxZIndex from '../util/getMaxZIndex';

const Popup = ({
  searchTerm,
  x,
  y,
  uuid,
  parentUuid,
  z,
  width = 244,
  height = 340,
  scale,
}) => {
  const [requestStatus, setRequestStatus] = useState('pending');
  const [cardJson, setCardJson] = useState({});
  const [alternateCardJson, setAlternateCardJson] = useState({});
  const [hasRebalancedCard, setHasRebalancedCard] = useState(false);
  const [shouldShowAlternateCard, setShouldShowAlternateCard] = useState(false);
  const [errorCode, setErrorCode] = useState('');
  const [zIndex, setZIndex] = useState(z);
  const [shouldShowChangeScaleButton, setShouldShowChangeScaleButton] =
    useState(false);

  const popupUuid = `mtg-quick-search-popup-${uuid}`;

  useEffect(() => {
    browser.storage.local.get('changeScale').then((data) => {
      setShouldShowChangeScaleButton(data.changeScale);
    });
  }, []);

  useEffect(() => {
    let isNamed = false;
    let card, altCard, altUri;
    const searchUri = encodeURI(
      `https://api.scryfall.com/cards/search?q=${searchTerm}`
    );
    const namedUri = encodeURI(
      `https://api.scryfall.com/cards/named?fuzzy=${searchTerm}`
    );
    fetch(searchUri)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else if (response.status == 404) {
          isNamed = true;
          return fetch(namedUri).then((response) => {
            if (!response.ok) {
              setErrorCode(response.status);
              throw Error();
            }
            return response.json();
          });
        }
        setErrorCode(response.status);
        throw Error();
      })
      .then((json) => {
        card = isNamed ? json : json.data[0];

        setCardJson(card);

        if (card.hasOwnProperty('all_parts')) {
          // it may be rebalanced
          let possibleAlternateCardName =
            card.name.slice(0, 2) === 'A-'
              ? card.name.slice(2)
              : `A-${card.name}`;
          let filtered = card.all_parts.filter(
            (part) => part.name === possibleAlternateCardName
          );
          if (filtered.length === 1) {
            setHasRebalancedCard(true);
            altUri = filtered[0].uri;
            return fetch(altUri)
              .then((response) => {
                if (!response.ok) {
                  setErrorCode(response.status);
                  throw Error();
                }
                return response.json();
              })
              .then((json) => {
                altCard = json;
                setAlternateCardJson(json);
              });
          }
        }
      })
      .then(() => {
        const imageUris = [];

        if (card.hasOwnProperty('card_faces')) {
          card.card_faces.forEach((face) => {
            imageUris.push(face.image_uris.normal);
          });
        } else {
          imageUris.push(card.image_uris.normal);
        }

        if (altCard) {
          if (altCard.hasOwnProperty('card_faces')) {
            altCard.card_faces.forEach((face) => {
              imageUris.push(face.image_uris.normal);
            });
          } else {
            imageUris.push(altCard.image_uris.normal);
          }
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

  const toggleCard = () => {
    setShouldShowAlternateCard(!shouldShowAlternateCard);
  };

  // https://javascript.info/mouse-drag-and-drop
  const handleMouseDown = (e) => {
    if (e.buttons === 1) {
      e.stopPropagation();

      if (zIndex <= getMaxZIndex() - 2) {
        setZIndex(getMaxZIndex() + 2);
      }
      const popupElement = document.getElementById(popupUuid);

      const shiftX = e.clientX - popupElement.getBoundingClientRect().left;
      const shiftY = e.clientY - popupElement.getBoundingClientRect().top;

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

  // https://javascript.info/mouse-drag-and-drop
  const handleResize = (e) => {
    if (e.buttons === 1) {
      e.stopPropagation();

      if (zIndex <= getMaxZIndex() - 2) {
        setZIndex(getMaxZIndex() + 2);
      }

      const popupElement = document.getElementById(popupUuid);

      const shiftX = e.clientX - popupElement.getBoundingClientRect().right;
      const shiftY = e.clientY - popupElement.getBoundingClientRect().bottom;

      const onMouseMove = (e) => {
        const _width =
          e.clientX - popupElement.getBoundingClientRect().left - shiftX;
        const _height =
          e.clientY - popupElement.getBoundingClientRect().top - shiftY;

        // I don't understand this but it constrains the dimensions
        const _ratio = Math.min(_width / width, _height / height);
        popupElement.style.transform = `scale(${Math.max(_ratio, 0.25)})`;
      };

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

  const handleChangeScale = (e) => {
    e.stopPropagation();
    const popup = document.getElementById(popupUuid);
    const newScale =
      Math.round(
        (100 * popup.getBoundingClientRect().width) / popup.offsetWidth
      ) / 100;
    browser.storage.local
      .set({ scale: newScale, changeScale: false })
      .then(() => setShouldShowChangeScaleButton(false));
  };

  return (
    <div
      id={popupUuid}
      className={`${classes.mtgQuickSearch} mtg-quick-search-popup`}
      style={{
        top: `${y}px`,
        left: `${x}px`,
        zIndex: zIndex,
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      {requestStatus === 'success' &&
        (shouldShowAlternateCard && hasRebalancedCard ? (
          <Card
            cardJson={alternateCardJson}
            z={zIndex}
            closePopup={closePopup}
            toggleCard={toggleCard}
            hasRebalancedCard={hasRebalancedCard}
          />
        ) : (
          <Card
            cardJson={cardJson}
            z={zIndex}
            closePopup={closePopup}
            toggleCard={toggleCard}
            hasRebalancedCard={hasRebalancedCard}
          />
        ))}

      {requestStatus === 'error' && (
        <Error
          code={errorCode}
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
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {shouldShowChangeScaleButton && (
          <div
            onClick={handleChangeScale}
            className={classes.mtgQuickSearchChangeScaleButton}
          >
            Set as default size
          </div>
        )}
      </div>

      <div
        className={classes.mtgQuickSearchResize}
        onMouseDown={handleResize}
        onDragStart={handleDragStart}
        onClick={(e) => e.stopPropagation()}
      ></div>
    </div>
  );
};

export default Popup;
