import * as classes from '../styles/styles.module.scss';
import MtgCardBack from './encoded_images/MtgCardBack';

/*
 * simple loading screen, mtg card back with some animation
 *
 * unfortunately it's a pain to integrate the web extension API's
 * 'web-accessible-resources' with a bundler and React, so I'm taking the easy
 * route and just embedding the loading image directly.
 */
const Loading = () => {
  return (
    <div className={classes.loadingImageDiv}>
      <MtgCardBack />
    </div>
  );
};

export default Loading;
