import { useState } from 'react';
import findCard from '../findCard';
import * as classes from '../styles/styles.module.scss';
import MtgQuickSearchIcon from './encoded_images/MtgQuickSearchIcon';

const EnterCardPopup = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    findCard({ searchTerm, x: 0, y: 0 });
    document.getElementById('mtgQuickSearchEnterCardPopup').remove();
  };

  return (
    <div className={`${classes.base} ${classes.enterCardPopup}`}>
      <form onSubmit={handleSubmit}>
        <label className={classes.enterCardFormLabel}>
          <MtgQuickSearchIcon />
          <input
            autoFocus
            type="text"
            value={searchTerm}
            onChange={handleChange}
          />
        </label>
      </form>
    </div>
  );
};

export default EnterCardPopup;
