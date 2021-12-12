const preloadImage = (uri) => {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = encodeURI(uri);
  });
};

export default preloadImage;
