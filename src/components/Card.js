import { useState } from 'react';
import * as classes from '../styles/styles.module.scss';

const Card = ({ cardJson, closePopup, z }) => {
  const [shouldShowBack, setShouldShowBack] = useState(false);

  let frontImageUri, backImageUri;

  const isDoubleFaced = cardJson.hasOwnProperty('card_faces');

  const flipCard = () => {
    setShouldShowBack(!shouldShowBack);
  };

  if (isDoubleFaced) {
    frontImageUri = cardJson.card_faces[0].image_uris.normal;
    backImageUri = cardJson.card_faces[1].image_uris.normal;
  } else {
    frontImageUri = cardJson.image_uris.normal;
    backImageUri = '';
  }

  return (
    <div className={classes.mtgQuickSearchContainer}>
      <div
        className={classes.mtgQuickSearchCircleButtonContainer}
        style={{ zIndex: z + 1 }}
      >
        <div
          className={`${classes.mtgQuickSearchCircleButton} ${classes.mtgQuickSearchCircleButtonRed}`}
          title="Close popup (escape)"
          onClick={closePopup}
        >
          ✕
        </div>
        <div
          className={classes.mtgQuickSearchCircleButton}
          title="Open on Gatherer"
          onClick={() =>
            window.open(encodeURI(cardJson.related_uris.gatherer), '_blank')
          }
        >
          G
        </div>
        <div
          className={classes.mtgQuickSearchCircleButton}
          title="Open on Scryfall"
          onClick={() =>
            window.open(encodeURI(cardJson.scryfall_uri), '_blank')
          }
        >
          S
        </div>
        <div
          className={classes.mtgQuickSearchCircleButton}
          title="Open on EDHREC"
          onClick={() =>
            window.open(encodeURI(cardJson.related_uris.edhrec), '_blank')
          }
        >
          E
        </div>
        {isDoubleFaced && (
          <div
            title={!shouldShowBack ? 'Show back' : 'Show front'}
            className={classes.mtgQuickSearchCircleButton}
            onClick={flipCard}
          >
            {!shouldShowBack ? '↻' : '↺'}
          </div>
        )}
      </div>

      {!shouldShowBack && (
        <div>
          <img
            className={classes.mtgQuickSearchCardImage}
            src={frontImageUri}
          />
        </div>
      )}

      {shouldShowBack && (
        <div>
          <img className={classes.mtgQuickSearchCardImage} src={backImageUri} />
        </div>
      )}
    </div>
  );
};

export default Card;
