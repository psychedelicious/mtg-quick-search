import ReactDOM from 'react-dom';
import EnterCardPopup from './components/EnterCardPopup';

const enterCard = () => {
  // there should only ever be one of these
  const parentId = 'mtgQuickSearchEnterCard';

  if (document.getElementById(parentId)) {
    return false;
  }

  // create a parent div into which react will render the popup
  const parent = document.createElement('div');

  parent.id = parentId;
  document.body.appendChild(parent);

  ReactDOM.render(<EnterCardPopup />, parent);
};

export default enterCard;
