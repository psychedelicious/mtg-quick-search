/*
 * assets/flip_icon.svg
 *
 * from material ui icons
 */
const FlipIcon = ({ width = '1em', height = '1em', fill = 'black' }) => {
  return (
    <div style={{ width: width, height: height, fill: fill }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={fill}>
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path
          style={{
            fillRule: 'nonzero',
            stroke: fill,
            strokeWidth: '0.5pt',
          }}
          d="M12 7C6.48 7 2 9.24 2 12c0 2.24 2.94 4.13 7 4.77V20l4-4-4-4v2.73c-3.15-.56-5-1.9-5-2.73 0-1.06 3.04-3 8-3s8 1.94 8 3c0 .73-1.46 1.89-4 2.53v2.05c3.53-.77 6-2.53 6-4.58 0-2.76-4.48-5-10-5z"
        />
      </svg>
    </div>
  );
};

export default FlipIcon;
