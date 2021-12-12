import * as classes from '../styles/styles.module.scss';

const Loading = () => {
  return (
    <div className={classes.mtgQuickSearchLoadingContainer}>
      <div className={classes.mtgQuickSearchSpinnerFadingCircle}>
        <div
          className={`${classes.mtgQuickSearchSpinnerCircle1} ${classes.mtgQuickSearchSpinnerCircle}`}
        ></div>
        <div
          className={`${classes.mtgQuickSearchSpinnerCircle2} ${classes.mtgQuickSearchSpinnerCircle}`}
        ></div>
        <div
          className={`${classes.mtgQuickSearchSpinnerCircle3} ${classes.mtgQuickSearchSpinnerCircle}`}
        ></div>
        <div
          className={`${classes.mtgQuickSearchSpinnerCircle4} ${classes.mtgQuickSearchSpinnerCircle}`}
        ></div>
        <div
          className={`${classes.mtgQuickSearchSpinnerCircle5} ${classes.mtgQuickSearchSpinnerCircle}`}
        ></div>
      </div>
    </div>
  );
};

export default Loading;
