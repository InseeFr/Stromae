import axios, { AxiosError } from "axios";

function errorHandler(error: AxiosError) {
  if (axios.isAxiosError(error)) {
    if (!error?.response) {
      console.error("No Server Response");
    } else if (error.response?.status === 400) {
      console.error("Missing Username or Password");
    } else if (error.response?.status === 401) {
      console.error("Unauthorized");
    } else {
      console.error("Login Failed");
    }
    throw error;
  } else {
    throw new Error("different error than axios");
  }
}

function jwtHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    "Content-type": "application/json; charset=utf-8",
  };
}

function publicHeader() {
  return { "Content-type": "application/json; charset=utf-8" };
}

export async function publicRequest<T>(method: string, url: string) {
  try {
    const headers = publicHeader();
    const { data } = await axios<T>({ method, url, headers });
    return data;
  } catch (error: AxiosError | any) {
    errorHandler(error);
    throw new Error("Failled!");
  }
}

export async function authenticatedRequest<T>(
  method: string,
  url: string,
  token: string
) {
  try {
    const headers = jwtHeaders(token);
    const { data } = await axios<T>({ method, url, headers });
    return data;
  } catch (error: AxiosError | any) {
    errorHandler(error);
    throw new Error("Failled!");
  }
}
