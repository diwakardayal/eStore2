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
import OrderListScreen from "./Screen/admin/OrderListScreen.jsx"
import OrderScreen from "./Screen/OrderScreen.jsx"
import ProfileScreen from "./Screen/ProfileScreen.jsx"
import { PayPalScriptProvider } from "@paypal/react-paypal-js"
import AdminRoute from "./components/AdminRoute.jsx"
import ProductListScreen from "./Screen/admin/ProductListScreen.jsx"
import ProductEditScreen from "./Screen/admin/ProductEditScreen.jsx"
import UserListScreen from "./Screen/admin/UserListScreen.jsx"
import UserEditScreen from "./Screen/admin/UserEditScreen.jsx"

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
				<Route path="/profile" element={<ProfileScreen />} />
			</Route>

			<Route path="" element={<AdminRoute />}>
				<Route path="/admin/orderlist" element={<OrderListScreen />} />
				<Route path="/admin/productlist" element={<ProductListScreen />} />
				<Route path="/admin/product/:id/edit" element={<ProductEditScreen />} />
				<Route path="/admin/userlist" element={<UserListScreen />} />
				<Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
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
