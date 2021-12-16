import { useState } from 'react';
import * as classes from '../styles/styles.module.scss';
import AlchemyIcon from './icons/AlchemyIcon';
import CloseIcon from './icons/CloseIcon';
import EdhrecIcon from './icons/EdhrecIcon';
import FlipIcon from './icons/FlipIcon';
import GathererIcon from './icons/GathererIcon';
import ScryfallIcon from './icons/ScryfallIcon';

const Card = ({ cardJson, closePopup, z, toggleCard, hasRebalancedCard }) => {
  const [shouldShowBack, setShouldShowBack] = useState(false);

  let frontImageUri, backImageUri;

  const isDoubleFaced = cardJson.hasOwnProperty('card_faces');

  const isRebalanced = cardJson.name.slice(0, 2) === 'A-' ? true : false;

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
          className={classes.mtgQuickSearchCircleButton}
          title="Close popup (escape)"
          onClick={closePopup}
        >
          <CloseIcon fill="rgb(141, 19, 19)" />
        </div>
        {hasRebalancedCard && (
          <div
            title={isRebalanced ? 'Show original' : 'Show rebalanced'}
            className={classes.mtgQuickSearchCircleButton}
            onClick={toggleCard}
          >
            <AlchemyIcon fill="black" />
          </div>
        )}
        {isDoubleFaced && (
          <div
            title={!shouldShowBack ? 'Show back' : 'Show front'}
            className={classes.mtgQuickSearchCircleButton}
            onClick={flipCard}
          >
            <FlipIcon />
          </div>
        )}
        {cardJson.scryfall_uri && (
          <a href={cardJson.scryfall_uri} target="_blank">
            <div
              className={classes.mtgQuickSearchCircleButton}
              title="Open on Scryfall"
            >
              <ScryfallIcon />
            </div>
          </a>
        )}
        {cardJson.related_uris.edhrec && (
          <a href={cardJson.related_uris.edhrec} target="_blank">
            <div
              className={classes.mtgQuickSearchCircleButton}
              title="Open on EDHREC"
            >
              <EdhrecIcon />
            </div>
          </a>
        )}
        {cardJson.related_uris.gatherer && (
          <a href={cardJson.related_uris.gatherer} target="_blank">
            <div
              className={classes.mtgQuickSearchCircleButton}
              title="Open on Gatherer"
            >
              <GathererIcon />
            </div>
          </a>
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
