// get the max z-index among the card popups
const getMaxZIndex = () => {
  const popups = Array.from(
    document.querySelectorAll('.mtg-quick-search-popup')
  );

  /*
   * default z-index is 999, this feels like a reasonable value to almost
   * always have the popup on top
   */
  if (popups.length === 0) {
    return 999;
  }

  return parseInt(
    popups.sort((a, b) => b.style.zIndex - a.style.zIndex)[0].style.zIndex
  );
};

export default getMaxZIndex;
