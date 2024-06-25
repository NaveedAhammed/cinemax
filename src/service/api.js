import axios from "axios";

const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

const headers = {
	Authorization: "bearer " + TMDB_TOKEN,
};

export const fetchDataFromApi = async (url, params) => {
	console.log(url);
	try {
		const { data } = await axios.get(url, {
			headers,
			params,
		});
		return data;
	} catch (err) {
		console.log(err);
		return err;
	}
};
