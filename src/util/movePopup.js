/*
 * moves the card popup around the screen.
 *
 * adapted from https://javascript.info/mouse-drag-and-drop
 */
const movePopup = ({ initialX, initialY, popupUuid }) => {
  const popupElement = document.getElementById(popupUuid);

  // this accounts for the cursor position when first clicking the popup
  const shiftX = initialX - popupElement.getBoundingClientRect().left;
  const shiftY = initialY - popupElement.getBoundingClientRect().top;

  moveAt(initialX, initialY);

  // moves the popupElement at (pageX, pageY) coordinates
  // taking initial shifts into account
  function moveAt(pageX, pageY) {
    popupElement.style.left = pageX - shiftX + 'px';
    popupElement.style.top = pageY - shiftY + 'px';
  }

  function onMouseMove(e) {
    moveAt(e.clientX, e.clientY);
  }

  // move the popupElement on mousemove
  document.addEventListener('mousemove', onMouseMove);

  // remove the mousemove listener on mouseup, but only once
  document.addEventListener(
    'mouseup',
    () => {
      document.removeEventListener('mousemove', onMouseMove);
    },
    { once: true }
  );
};

export default movePopup;
