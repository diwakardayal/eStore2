import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import "./assets/css/index.css"
import "./assets/css/bootstrap.custom.css"
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom"
import HomeScreen from "./Screen/HomeScreen.jsx"
import { Provider } from "react-redux"
import store from "./store.js"
import ProductScreen from "./Screen/ProductScreen.jsx"

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route index={true} path="/" element={<HomeScreen />} />
			<Route path="/products/:id" element={<ProductScreen />} />
		</Route>,
	),
)

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>,
)
