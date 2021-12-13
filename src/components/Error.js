import * as classes from '../styles/styles.module.scss';

const Error = ({ code, searchTerm, z, closePopup }) => {
  const scryfallUrl = encodeURI(
    `https://scryfall.com/search?q=${searchTerm}&unique=cards&as=grid&order=name`
  );

  const trimmedSearchTerm =
    searchTerm.length > 100 ? searchTerm.substr(0, 100) + '...' : searchTerm;

  const message =
    code === 404 ? 'No confident match for:' : 'Unknown error for:';

  return (
    <div className={classes.mtgQuickSearchError}>
      <div>{message}</div>
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
