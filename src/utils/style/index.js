const loadStyleSheetAsText = async url => {
  const response = await fetch(url);
  const text = await response.text();
  return text;
};

const loadStyleSheetWithLink = url => {
  const styleSheet = document.createElement('link');
  styleSheet.rel = 'stylesheet';
  styleSheet.href = url;
  document.head.appendChild(styleSheet);
};

export const addStyleSheet = async url => {
  loadStyleSheetWithLink(url);
};
