// manage empty response during PUT or POST request
const readJsonResponse = async (response) => {
  try {
    return await response.json();
  } catch (e) {
    return {};
  }
};

export const fetcher = async (url, token, method, body) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  try {
    const response = await fetch(url, {
      headers: token
        ? { ...headers, Authorization: `Bearer ${token}` }
        : headers,
      method,
      body: body ? JSON.stringify(body) : null,
    });
    const { ok, status, statusText } = response;
    if (ok) {
      try {
        const data = await readJsonResponse(response);
        return { data, status, statusText };
      } catch (error) {
        return { error: true, status, statusText: error.message };
      }
    } else {
      return { error: true, status, statusText };
    }
  } catch (error) {
    // network error
    return { error: true, statusText: error.message };
  }
};

const getFilenameFromHeader = (header) => {
  const res = /filename="(.*)"/.exec(header);
  return res && res.length > 0 ? res[1] : 'default.pdf';
};

export const fetcherFile = async (url, token) => {
  try {
    const response = await fetch(url, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      method: 'GET',
    });
    const { ok, status, statusText, headers } = response;
    if (ok) {
      try {
        const blob = await response.blob();
        const file = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = file;
        a.download = getFilenameFromHeader(headers.get('Content-disposition'));
        a.click();
        a.remove();
        return { status, statusText };
      } catch (error) {
        return { error: true, status, statusText: error.message };
      }
    } else {
      return { error: true, status, statusText };
    }
  } catch (error) {
    // network error
    return { error: true, statusText: error.message };
  }
};

export const getFetcherForLunatic = (token) => (url, options) => {
  const otherHeader = options?.headers || {};
  return fetch(url, {
    ...options,
    headers: token
      ? { ...otherHeader, Authorization: `Bearer ${token}` }
      : otherHeader,
  }).then((r) => r.json());
};
