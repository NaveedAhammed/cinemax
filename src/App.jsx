import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import AppLayout from "./AppLayout";
import Explore from "./pages/explore/Explore";
import Details from "./pages/details/Details";
import SearchResults from "./pages/searchResults/SearchResults";

const router = createBrowserRouter([
	{
		element: <AppLayout />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/explore/:mediaType",
				element: <Explore />,
			},
			{
				path: "/:mediaType/:id",
				element: <Details />,
			},
			{
				path: "/search",
				element: <SearchResults />,
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
