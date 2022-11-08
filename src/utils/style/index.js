//This method works with style sheet serve as octet-stream like with S3 server (minio for example)
const loadStyleSheetAsText = (url) => {
  fetch(url)
    .then((response) => response.text())
    .then((text) => {
      const styleSheet = document.createElement('style');
      styleSheet.type = 'text/css';
      styleSheet.innerText = text;
      document.head.appendChild(styleSheet);
    });
};

const loadStyleSheetWithLink = (url) => {
  const styleSheet = document.createElement('link');
  styleSheet.rel = 'stylesheet';
  styleSheet.href = url;
  document.head.appendChild(styleSheet);
};

export const addStyleSheet = (url) => {
  try {
    loadStyleSheetWithLink(url);
  } catch (e) {
    loadStyleSheetAsText(url);
  }
};
