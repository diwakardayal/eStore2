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
import CartScreen from "./Screen/CartScreen.jsx"
import LoginScreen from "./Screen/LoginScreen.jsx"

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route index={true} path="/" element={<HomeScreen />} />
			<Route path="/products/:id" element={<ProductScreen />} />
			<Route path="/cart" element={<CartScreen />} />
			<Route path="/login" element={<LoginScreen />} />
		</Route>,
	),
)

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>,
)
