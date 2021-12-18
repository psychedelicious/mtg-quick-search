/*
 * we don't want to add a listener to document whenever a popup is opened,
 * so we use a content script to add a single listener.
 */

document.addEventListener('keydown', (e) => {
  // make array of all the card popups
  const popups = Array.from(
    document.querySelectorAll('.mtg-quick-search-popup')
  );

  const enterCardPopup = document.getElementById('mtgQuickSearchEnterCard');

  if (e.key === 'Escape') {
    if (enterCardPopup) {
      enterCardPopup.remove();
    } else if (popups.length > 0) {
      // sort by z-index, descending, and remove parent (the popup wrapper)
      popups
        .sort((a, b) => b.style.zIndex - a.style.zIndex)[0]
        .parentElement.remove();
    }
  }
});
