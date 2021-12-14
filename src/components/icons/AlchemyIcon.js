// from the keyrune project https://keyrune.andrewgioia.com/

const AlchemyIcon = ({ width = '1em', height = '1em', fill = 'black' }) => {
  return (
    <div style={{ width: width, height: height, fill: fill }}>
      <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <g id="Arena" transform="matrix(0.823838,0,0,0.823838,2.8187,2.8186)">
          <path
            fill={fill}
            d="M21.319,3.617C21.492,3.8 21.572,4.04 21.559,4.339C21.148,4.654 20.982,5.164 21.06,5.868C27.572,22.398 30.326,26.401 31.781,27.806C31.995,28.191 31.995,28.383 31.781,28.383L20.611,28.383C20.312,28.383 20.207,28.191 20.295,27.806C20.805,27.052 21.06,26.225 21.06,25.326C21.06,23.976 12.537,5.126 11.681,4.651C11.11,4.334 11.024,3.989 11.421,3.617L21.319,3.617ZM4.583,19.841C4.461,19.861 4.44,19.908 4.434,20.03C4.434,22.365 2.711,24.487 0.254,27.655C-0.007,27.868 -0.007,28.055 0.254,28.218L7.489,28.218C7.68,28.218 7.716,28.081 7.711,28.013C7.535,25.957 7.168,23.876 6.298,21.989C6.027,21.402 5.329,19.998 4.583,19.84L4.583,19.841ZM8.559,5.659C8.559,5.659 8.186,5.919 8.15,7.214C7.996,12.686 7.583,14.478 7.583,14.478L6.737,14.578C6.737,14.578 6.375,13.434 6.273,11.369C6.17,9.302 6.119,7.708 5.838,7.71C5.554,7.71 5.476,9.404 5.371,11.344C5.271,13.284 5.014,14.902 5.014,14.902L4.09,15.201C4.09,15.201 3.728,13.933 3.523,12.814C3.318,11.693 3.266,10.424 3.112,10.424C2.958,10.424 2.726,11.294 2.623,13.584C2.52,15.872 2.496,16.319 2.496,16.319C2.496,16.319 5.53,17.415 6.712,20.253C7.895,23.089 8.195,25.551 8.204,25.825C8.219,26.249 8.561,26.303 8.561,26.303C8.561,26.303 8.858,26.249 8.918,25.825C8.956,25.554 9.226,23.089 10.409,20.253C11.59,17.415 14.625,16.319 14.625,16.319C14.625,16.319 14.6,15.872 14.498,13.584C14.395,11.293 14.163,10.424 14.009,10.424C13.853,10.424 13.804,11.693 13.598,12.814C13.393,13.932 13.031,15.201 13.031,15.201L12.107,14.902C12.107,14.902 11.848,13.283 11.745,11.344C11.645,9.404 11.567,7.71 11.281,7.71C11.002,7.708 10.948,9.303 10.846,11.369C10.743,13.434 10.384,14.578 10.384,14.578L9.536,14.478C9.536,14.478 9.125,12.686 8.971,7.214C8.935,5.919 8.562,5.659 8.562,5.659L8.559,5.659Z"
          />
        </g>
      </svg>
    </div>
  );
};

export default AlchemyIcon;
