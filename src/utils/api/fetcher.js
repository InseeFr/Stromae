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

export const fetcherFile = async (url, token, filename) => {
  try {
    const response = await fetch(url, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      method: 'GET',
    });
    const { ok, status, statusText } = response;
    if (ok) {
      try {
        const blob = await response.blob();
        const file = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = file;
        a.download = filename;
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
