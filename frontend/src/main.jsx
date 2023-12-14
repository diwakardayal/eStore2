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
import PrivateRoute from "./components/PrivateRoute.jsx"
import HomeScreen from "./Screen/HomeScreen.jsx"
import { Provider } from "react-redux"
import store from "./store.js"
import ProductScreen from "./Screen/ProductScreen.jsx"
import CartScreen from "./Screen/CartScreen.jsx"
import LoginScreen from "./Screen/LoginScreen.jsx"
import RegisterScreen from "./Screen/RegisterScreen.jsx"
import ShippingAddress from "./Screen/ShippingAddress.jsx"
import PaymentScreen from "./Screen/PaymentScreen.jsx"
import PlaceOrderScreen from "./Screen/PlaceOrderScreen.jsx"
import OrderScreen from "./Screen/OrderScreen.jsx"
import { PayPalScriptProvider } from "@paypal/react-paypal-js"

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route index={true} path="/" element={<HomeScreen />} />
			<Route path="/products/:id" element={<ProductScreen />} />
			<Route path="/cart" element={<CartScreen />} />
			<Route path="/login" element={<LoginScreen />} />
			<Route path="/register" element={<RegisterScreen />} />

			<Route path="" element={<PrivateRoute />}>
				<Route path="/shipping" element={<ShippingAddress />} />
				<Route path="/payment" element={<PaymentScreen />} />
				<Route path="/placeorder" element={<PlaceOrderScreen />} />
				<Route path="/order/:id" element={<OrderScreen />} />
			</Route>
		</Route>,
	),
)

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<PayPalScriptProvider deferLoading={true}>
			<RouterProvider router={router} />
		</PayPalScriptProvider>
	</Provider>,
)
