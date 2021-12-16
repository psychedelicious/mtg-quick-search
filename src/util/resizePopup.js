const resizePopup = ({ initialX, initialY, width, height, popupUuid }) => {
  const popupElement = document.getElementById(popupUuid);

  const shiftX = initialX - popupElement.getBoundingClientRect().right;
  const shiftY = initialY - popupElement.getBoundingClientRect().bottom;

  const onMouseMove = (e) => {
    /*
     * get the new width and height: distance between left/top edges of
     * popup, and the cursor
     */
    const _width =
      e.clientX - popupElement.getBoundingClientRect().left - shiftX;
    const _height =
      e.clientY - popupElement.getBoundingClientRect().top - shiftY;

    // I don't understand this but it constrains the scale factor
    const scale = Math.min(_width / width, _height / height);

    // scale the popup, minimum scale of 0.25 so you can't make it too small
    popupElement.style.transform = `scale(${Math.max(scale, 0.25)})`;
  };

  // resize the popupElement on mousemove
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

export default resizePopup;
