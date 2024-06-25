import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../service/api";
export const useFetch = (url) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		setLoading(true);
		setData(null);
		setError(null);

		fetchDataFromApi(url)
			.then((res) => {
				setData(res);
			})
			.catch((err) => {
				console.log(err);
				setError("Something went wrong!");
			})
			.finally(() => {
				setLoading(false);
			});
	}, [url]);

	return { data, loading, error };
};
