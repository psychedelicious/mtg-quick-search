const getMaxZIndex = () => {
  const popups = Array.from(
    document.querySelectorAll('.mtg-quick-search-popup')
  );

  if (popups.length === 0) {
    return 999;
  }

  return parseInt(
    popups.sort((a, b) => b.style.zIndex - a.style.zIndex)[0].style.zIndex
  );
};

export default getMaxZIndex;
