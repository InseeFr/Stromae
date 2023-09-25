import axios, { AxiosError } from 'axios';

export const HTTP_VERBS = {
	get: 'get',
	post: 'post',
	put: 'put',
};

function errorHandler(error: AxiosError) {
	if (axios.isAxiosError(error)) {
		if (!error?.response) {
			// eslint-disable-next-line no-console
			console.error('No Server Response');
		} else if (error.response?.status === 400) {
			// eslint-disable-next-line no-console
			console.error('Missing Username or Password');
		} else if (error.response?.status === 401) {
			// eslint-disable-next-line no-console
			console.error('Unauthorized');
		} else if (error.response?.status === 404) {
			// eslint-disable-next-line no-console
			console.error('Missing resource');
		} else {
			// eslint-disable-next-line no-console
			console.error('Login Failed');
		}
		throw error;
	} else {
		throw new Error('different error than axios');
	}
}

function publicHeader() {
	return { 'Content-type': 'application/json; charset=utf-8' };
}

export async function getRequest<T>(url: string) {
	try {
		const headers = publicHeader();
		const { data } = await axios<T>({ method: HTTP_VERBS.get, url, headers });
		return data;
	} catch (error: AxiosError | any) {
		errorHandler(error);
		throw new Error(`Request fail : ${url}`);
	}
}

export async function getBlob(url: string) {
	try {
		const headers = publicHeader();
		const { data } = await axios<BlobPart>({
			method: HTTP_VERBS.get,
			url,
			headers,
			responseType: 'blob',
		});
		return data;
	} catch (error: AxiosError | any) {
		errorHandler(error);
		throw new Error(`Request fail : ${url}`);
	}
}

export async function putRequest<T>(url: string, data: T) {
	try {
		const headers = publicHeader();
		await axios<T>({ method: HTTP_VERBS.put, url, headers, data });
	} catch (error: AxiosError | any) {
		errorHandler(error);
		throw new Error(`Request fail : ${url}`);
	}
}
