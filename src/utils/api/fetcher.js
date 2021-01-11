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
    console.log(error);
    return { error: true, statusText: error.message };
  }
};
