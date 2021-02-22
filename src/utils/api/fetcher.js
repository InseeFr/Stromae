export const fetcher = async (url, token, method, body) => {
  const headers = { Accept: 'application/json' };
  try {
    const response = await fetch(url, {
      headers: token
        ? { ...headers, Authorization: `Bearer ${token}` }
        : headers,
      method: method,
      body: body,
    });
    const { ok, status, statusText } = response;
    if (ok) {
      try {
        const data = await response.json();
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

const getFilenameFromHeader = header => {
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
        a.download = getFilenameFromHeader(headers.get('Content-Disposition'));
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
