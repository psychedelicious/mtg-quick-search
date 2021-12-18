/*
 * assets/arena_icon.svg
 *
 * from the keyrune project https://keyrune.andrewgioia.com/
 */
const MtgQuickSearchIcon = ({ width = '1em', height = '1em' }) => {
  return (
    <div style={{ width: width, height: height, padding: 0 }}>
      <svg
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          fillRule: 'evenodd',
          clipRule: 'evenodd',
          strokeLineJoin: 'round',
          strokeMiterlimit: 2,
        }}
      >
        <g
          id="Layer1"
          transform="matrix(0.0144603,0,0,0.0144603,-0.652472,-1.54588)"
        >
          <g transform="matrix(0.941099,0,0,0.941099,71.4012,78.8921)">
            <path d="M2964.18,216.519C2964.18,157.697 2916.42,109.94 2857.6,109.94L685.709,109.94C626.886,109.94 579.13,157.697 579.13,216.519L579.13,3326.79C579.13,3385.61 626.886,3433.37 685.709,3433.37L2857.6,3433.37C2916.42,3433.37 2964.18,3385.61 2964.18,3326.79L2964.18,216.519Z" />
          </g>
          <g transform="matrix(0.862914,0,0,0.887964,209.918,173.029)">
            <path
              d="M2964.18,213.512C2964.18,156.349 2916.42,109.94 2857.6,109.94L685.709,109.94C626.886,109.94 579.13,156.349 579.13,213.512L579.13,3329.8C579.13,3386.96 626.886,3433.37 685.709,3433.37L2857.6,3433.37C2916.42,3433.37 2964.18,3386.96 2964.18,3329.8L2964.18,213.512Z"
              style={{ fill: 'rgb(133,98,72)' }}
            />
          </g>
        </g>
        <g
          id="Layer2"
          transform="matrix(0.0129468,-0.00644053,0.00644053,0.0129468,-3.15117,7.76915)"
        >
          <g transform="matrix(0.941099,-5.55112e-17,5.55112e-17,0.941099,-947.56,-238.548)">
            <circle cx="2259.47" cy="1511.72" r="915.187" />
          </g>
          <g transform="matrix(1.24321,-7.3331e-17,6.21381e-17,1.05345,-919.007,-375.828)">
            <path d="M1918.7,1813.4C1918.7,1738.09 1866.89,1676.94 1803.07,1676.94L1571.8,1676.94C1507.98,1676.94 1456.17,1738.09 1456.17,1813.4L1456.17,3562.85C1456.17,3638.17 1507.98,3699.32 1571.8,3699.32L1803.07,3699.32C1866.89,3699.32 1918.7,3638.17 1918.7,3562.85L1918.7,1813.4Z" />
          </g>
          <g transform="matrix(0.80343,-1.16402e-16,9.86352e-17,0.680798,-179.049,888.657)">
            <path
              d="M1803.07,3699.32C1964.96,3774.33 1549.85,2142.76 1554.35,1755.28C1566.59,1742.17 1568.94,1720.51 1559.9,1704.18C1550.86,1687.85 1533.11,1681.69 1518.02,1689.65C1481.67,1714.7 1456.17,1760.57 1456.17,1813.4L1456.17,3562.85C1456.17,3638.17 1507.98,3699.32 1571.8,3699.32L1803.07,3699.32Z"
              style={{ fill: 'url(#_Linear1)' }}
            />
          </g>
          <g transform="matrix(0.817192,4.03907e-18,-4.03907e-18,0.817192,-667.595,-51.2352)">
            <circle
              cx="2259.47"
              cy="1511.72"
              r="915.187"
              style={{ fill: 'url(#_Radial2)' }}
            />
          </g>
        </g>
        <defs>
          <linearGradient
            id="_Linear1"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(49.2123,1465.28,-1241.63,58.0769,1523.57,2087.71)"
          >
            <stop offset="0" style={{ stopColor: 'black', stopOpacity: 1 }} />
            <stop
              offset="1"
              style={{ stopColor: 'rgb(42,54,68)', stopOpacity: 1 }}
            />
          </linearGradient>
          <radialGradient
            id="_Radial2"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(29.906,962.873,-962.873,29.906,1742.8,1133.36)"
          >
            <stop offset="0" style={{ stopColor: 'white', stopOpacity: 1 }} />
            <stop
              offset="1"
              style={{ stopColor: 'rgb(0,186,255)', stopOpacity: 1 }}
            />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};

export default MtgQuickSearchIcon;
