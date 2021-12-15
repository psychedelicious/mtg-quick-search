document
  .getElementById('mtgQuickSearchChangeScaleButton')
  .addEventListener('click', () => {
    browser.storage.local.set({ changeScale: true });
  });

document
  .getElementById('mtgQuickSearchResetScaleButton')
  .addEventListener('click', () => {
    browser.storage.local.set({ scale: 1 });
  });
