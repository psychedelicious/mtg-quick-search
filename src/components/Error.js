import * as classes from '../styles/styles.module.scss';

// simple error component, just shows the err message and link to scryfall
const Error = ({ message, searchTerm, z, closePopup }) => {
  // create url for scryfall search
  const scryfallUrl = encodeURI(
    `https://scryfall.com/search?q=${searchTerm}&unique=cards&as=grid&order=name`
  );

  // trim search term to 100 chars so we don't have to deal with overflow
  const trimmedSearchTerm =
    searchTerm.length > 100 ? searchTerm.substr(0, 100) + '...' : searchTerm;

  return (
    <div className={classes.mtgQuickSearchError}>
      <div>{`Error: ${message}`}</div>
      <div>Searched for:</div>
      <div className={classes.mtgQuickSearchErrorSearchTerm}>
        {trimmedSearchTerm}
      </div>
      <div>
        <div
          className={classes.mtgQuickSearchErrorLink}
          style={{ zIndex: z + 1 }}
        >
          <a href={scryfallUrl} target="_blank">
            Search on Scryfall
          </a>
        </div>
      </div>
      <div
        className={`${classes.mtgQuickSearchCircleButton} ${classes.mtgQuickSearchCircleButtonRed}`}
        title="Close popup (escape)"
        style={{ zIndex: z + 1 }}
        onClick={closePopup}
      >
        ✕
      </div>
    </div>
  );
};

export default Error;
