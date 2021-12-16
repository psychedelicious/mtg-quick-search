import { useEffect, useState } from 'react';
import Card from './Card';
import Loading from './Loading';
import Error from './Error';
import * as classes from '../styles/styles.module.scss';
import getMaxZIndex from '../util/getMaxZIndex';
import requestScryfallCard from '../util/requestScryfallCard';
import movePopup from '../util/movePopup';
import resizePopup from '../util/resizePopup';
/*
 * The main component for the card popup
 *
 * fetches card data, displays it, handles movement, etc
 */
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
  // used values: 'pending', 'error', 'success', can js do enums?
  const [requestStatus, setRequestStatus] = useState('pending');
  const [cardJson, setCardJson] = useState({});
  const [alternateCardJson, setAlternateCardJson] = useState({});
  const [hasRebalancedCard, setHasRebalancedCard] = useState(false);
  const [shouldShowAlternateCard, setShouldShowAlternateCard] = useState(false);
  const [error, setError] = useState(null);
  const [zIndex, setZIndex] = useState(z);
  const [shouldShowChangeScaleButton, setShouldShowChangeScaleButton] =
    useState(false);

  // unique popup css id (not parent!)
  const popupUuid = `mtg-quick-search-popup-${uuid}`;

  useEffect(() => {
    // check if the user has asked to set a default popup scale
    browser.storage.local.get('changeScale').then((data) => {
      setShouldShowChangeScaleButton(data.changeScale);
    });
  }, []);

  useEffect(() => {
    // fetch the card from scryfall & set state
    requestScryfallCard(searchTerm)
      .then(({ cardJson, altCardJson, hasRebalanced }) => {
        setCardJson(cardJson);
        setAlternateCardJson(altCardJson);
        setHasRebalancedCard(hasRebalanced);
        setRequestStatus('success');
      })
      .catch((error) => {
        setError(error);
        setRequestStatus('error');
      });
  }, []);

  // totally remove the unique parent element
  const closePopup = () => {
    document.getElementById(parentUuid).remove();
  };

  // toggles if we should show the alternate (i.e. rebalanced) card
  const toggleCard = () => {
    setShouldShowAlternateCard(!shouldShowAlternateCard);
  };

  // moves the popup
  const handleMoveMouseDown = (e) => {
    if (e.buttons === 1) {
      e.stopPropagation();

      // shift the popup to the top of the popups if it isn't already there
      if (zIndex <= getMaxZIndex() - 2) {
        setZIndex(getMaxZIndex() + 2);
      }

      // handle moving the popup around
      movePopup({ initialX: e.clientX, initialY: e.clientY, popupUuid });
    }
  };

  // resizes the popup
  const handleResizeMouseDown = (e) => {
    if (e.buttons === 1) {
      e.stopPropagation();

      // move the popup to the top of the popups if it isn't already there
      if (zIndex <= getMaxZIndex() - 2) {
        setZIndex(getMaxZIndex() + 2);
      }

      // handle resizing the popup
      resizePopup({
        initialX: e.clientX,
        initialY: e.clientY,
        width,
        height,
        popupUuid,
      });
    }
  };

  // trick to stop any drag interactions so our manual implementation works
  const handleDragStart = () => false;

  // stores new default scale factor in local storage
  const handleChangeScale = (e) => {
    e.stopPropagation();
    const popup = document.getElementById(popupUuid);

    // easiest to compute the current scale from dimensions
    const newScale =
      Math.round(
        (100 * popup.getBoundingClientRect().width) / popup.offsetWidth
      ) / 100;

    // store the new value and update state
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
          message={error.message}
          searchTerm={searchTerm}
          z={zIndex}
          closePopup={closePopup}
        />
      )}

      {requestStatus === 'pending' && <Loading />}

      <div
        className={classes.mtgQuickSearchDrag}
        onMouseDown={handleMoveMouseDown}
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
        onMouseDown={handleResizeMouseDown}
        onDragStart={handleDragStart}
        onClick={(e) => e.stopPropagation()}
      ></div>
    </div>
  );
};

export default Popup;
