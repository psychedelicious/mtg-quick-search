/*
  
  if we get 1 or more matches (404), we take the first one.

  if there are no matches, we can try cards/named, which returns
  exactly one card using a fuzzy search.

  if we still get no matches, bail out with an Error.

  next, we need to determine if a card has a rebalanced version,
  and fetch it if there is one. 

  finally, we use a trick to preload all the images.
*/

const requestScryfallCard = async (searchTerm) => {
  let json = null;
  let hasRebalanced = false;
  let cardJson = {};
  let altCardJson = {};
  const imageUris = [];

  const searchUri = encodeURI(
    `https://api.scryfall.com/cards/search?q=${searchTerm}`
  );

  const namedUri = encodeURI(
    `https://api.scryfall.com/cards/named?fuzzy=${searchTerm}`
  );

  // search api call returns an array of cards that match
  const searchResponse = await fetch(searchUri);

  if (!searchResponse.ok) {
    // we have a problem & need to try other api call
    if (searchResponse.status === 404) {
      const namedResponse = await fetch(namedUri);
      if (!namedResponse.ok) {
        throw new Error(namedResponse.statusText);
      } else {
        json = await namedResponse.json();
      }
    } else {
      throw new Error(searchResponse.statusText);
    }
  } else {
    json = await searchResponse.json();
  }

  /*
   * the first api call yields an obj w/ data prop = Array of cards,
   * while the second yields a single object
   */

  cardJson = json.hasOwnProperty('data') ? json.data[0] : json;

  /*
   * handle possibility of a rebalanced card - cards have prop 'all_parts'
   * if there are other related cards. rebalanced cards have the same name
   * but with 'A-' prepended. we may have returned the rebalanced card,
   * or the original card - api does not tell us this explicitly.
   *
   * figure out if the card we got has a rebalanced version, and fetch the
   * other version of it if so, regardless of whether or not it is itself
   * rebalanced or original.
   */

  if (cardJson.hasOwnProperty('all_parts')) {
    // compute the alternate card name
    let possibleAlternateCardName =
      cardJson.name.slice(0, 2) === 'A-'
        ? cardJson.name.slice(2)
        : `A-${cardJson.name}`;

    // check if the cardJson has that alt name as a related part
    let filtered = cardJson.all_parts.filter(
      (part) => part.name === possibleAlternateCardName
    );

    // fetch the alternate card if we have one
    if (filtered.length === 1) {
      hasRebalanced = true;
      const altResponse = await fetch(filtered[0].uri);
      if (!altResponse.ok) {
        throw new Error(altResponse.statusText);
      } else {
        altCardJson = await altResponse.json();
      }
    }
  }

  /*
   * build array of card image URIs:
   * double-sided cards have a 'card_faces' prop
   * single-sided cards have an 'image_uris' prop
   */

  [cardJson, altCardJson].forEach((json) => {
    if (json.hasOwnProperty('card_faces')) {
      json.card_faces.forEach((face) => {
        imageUris.push(face.image_uris.normal);
      });
    } else if (json.hasOwnProperty('image_uris')) {
      imageUris.push(json.image_uris.normal);
    }
  });

  // preload all of the images
  await Promise.all(
    imageUris.map((uri) => {
      return new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = () => resolve();
        img.onerror = reject;
        img.src = encodeURI(uri);
      });
    })
  );

  return { cardJson, altCardJson, hasRebalanced };
};

export default requestScryfallCard;
