import axios from 'axios';
import { setInterceptors } from './common/interceptors.js';

function config(url) {
	const instance = axios.create({
		baseURL: `${process.env.VUE_APP_API_URL}${url}`,
		headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
	});
	return setInterceptors(instance);
}

export const instance = config();
export const borderInstance = config('cm');
export const videoInstance = config('tc');
