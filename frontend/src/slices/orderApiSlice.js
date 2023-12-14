import { apiSlice } from "./apiSlices"

export const orderApliSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		createOrder: builder.mutation({
			query: order => ({
				url: `/api/orders`,
				method: "POST",
				body: order,
				headers: { "Content-Type": "application/json" },
				credentials: "include",
			}),
		}),
		getOrderDetails: builder.query({
			query: id => ({
				url: `/api/orders/${id}`,
				headers: { "Content-Type": "application/json" },
				credentials: "include",
			}),
			keepUnusedDataFor: 5,
		}),
		payOrder: builder.mutation({
			query: ({ orderId, details }) => ({
				url: `/api/orders/${orderId}/pay`,
				method: "PUT",
				body: { ...details },
				headers: { "Content-Type": "application/json" },
				credentials: "include",
			}),
		}),
		getPayPalClientId: builder.query({
			query: () => ({
				url: `/api/config/paypal`,
				headers: { "Content-Type": "application/json" },
				credentials: "include",
			}),
			keepUnusedDataFor: 5,
		}),
	}),
})

export const {
	useCreateOrderMutation,
	useGetOrderDetailsQuery,
	usePayOrderMutation,
	useGetPayPalClientIdQuery,
} = orderApliSlice
