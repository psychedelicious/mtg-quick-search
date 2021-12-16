/*
 * assets/close_icon.svg
 *
 * from material ui icons
 */

const CloseIcon = ({ width = '1em', height = '1em', fill = 'black' }) => {
  return (
    <div style={{ width: width, height: height, fill: fill }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={fill}>
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path
          style={{
            fillRule: 'nonzero',
            stroke: fill,
            strokeWidth: '0.95pt',
          }}
          d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
        />
      </svg>
    </div>
  );
};

export default CloseIcon;
