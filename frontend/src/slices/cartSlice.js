import { createSlice } from "@reduxjs/toolkit"
import { updateCart } from "../utlis/cartUtlis"

const initialState = localStorage.getItem("cart")
	? JSON.parse(localStorage.getItem("cart"))
	: { cartItems: [], shippingAddress: {}, paymentMethod: "paypal" }

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action) => {
			// The item to add to the cart
			const item = action.payload

			// Check if the item is already in the cart
			const existItem = state.cartItems.find(x => x._id === item._id)

			if (existItem) {
				state.cartItems = state.cartItems.map(x => (x._id === existItem._id ? item : x))
			} else {
				state.cartItems = [...state.cartItems, item]
			}

			updateCart(state)
		},
		removeFromCart: (state, action) => {
			state.cartItems = state.cartItems.filter(x => x._id !== action.payload)
			console.log("state.cartItems", action.payload)
			return updateCart(state)
		},
		saveShippingAddress: (state, action) => {
			state.shippingAddress = action.payload
			return updateCart(state)
		},
	},
})
export const { addToCart, removeFromCart, saveShippingAddress } = cartSlice.actions
export default cartSlice.reducer
