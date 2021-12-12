import * as classes from '../styles/styles.module.scss';

const messageMap = {
  ambiguous: 'Multiple matches found for:',
  not_found: 'No matches found for:',
  unknown: 'Unknown error searching for:',
};

const Error = ({ errorMessage, searchTerm, z, closePopup }) => {
  const scryfallUrl = encodeURI(
    `https://scryfall.com/search?q=${searchTerm}&unique=cards&as=grid&order=name`
  );

  const trimmedSearchTerm =
    searchTerm.length > 100 ? searchTerm.substr(0, 100) + '...' : searchTerm;

  return (
    <div className={classes.mtgQuickSearchError}>
      <div>{messageMap[errorMessage]}</div>
      <div style={{ fontStyle: 'italic', padding: '1em' }}>
        {trimmedSearchTerm}
      </div>
      <div
        className={classes.mtgQuickSearchErrorLink}
        style={{ zIndex: z + 1 }}
      >
        <a href={scryfallUrl} target="_blank">
          Search on Scryfall
        </a>
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
