export const addDecimals = nums => {
	return (Math.round(nums * 100) / 100).toFixed(2)
}

export const updateCart = state => {
	// Calculate items price
	state.itemPrice = addDecimals(
		state.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
	)

	// Calculate shipping price If the price is more than $100 shipping then free or else $10
	state.shippingPrice = addDecimals(state.itemPrice > 100 ? 0 : 10)

	// Calculate tax price 15% tax
	state.taxPrice = addDecimals(Number(state.itemPrice * 0.15).toFixed(2))

	// Calculate total price
	state.totalPrice = addDecimals(
		(Number(state.itemPrice) + Number(state.shippingPrice) + Number(state.taxPrice)).toFixed(2),
	)

	localStorage.setItem("cart", JSON.stringify(state))

	return state
}
