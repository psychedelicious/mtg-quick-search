/*
 * gets the selected text and its pixel position on the page.
 *
 * does not get selection in input fields!
 *
 * atStart: if true, returns coord of the beginning of the selection,
 *          if false, returns coord of the end of the selection
 *
 * modified to account for edge case when text was selected but has no range
 *
 * https://stackoverflow.com/questions/6846230/coordinates-of-selected-text-in-browser-page
 */
const getSelection = (atStart = false) => {
  const selectionObj = { text: '', x: 0, y: 0 };

  const sel = document.getSelection();
  selectionObj.text = sel.toString().trim();

  // check if selection exists
  if (sel.rangeCount) {
    // get range
    let range = sel.getRangeAt(0).cloneRange();
    if (range.getClientRects) {
      // get client rect
      range.collapse(atStart);
      let rects = range.getClientRects();
      if (rects.length > 0) {
        // return coord
        selectionObj.x = rects[0].x;
        selectionObj.y = rects[0].y;
      }
    }
  }
  return selectionObj;
};

export default getSelection;
