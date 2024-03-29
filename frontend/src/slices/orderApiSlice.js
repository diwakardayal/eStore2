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
		getMyOrders: builder.query({
			query: () => ({
				url: "/api/orders/mine",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
			}),
			keepUnusedDataFor: 5,
		}),
		getOrders: builder.query({
			query: () => ({
				url: "/api/orders",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
			}),
		}),
		deliverOrder: builder.mutation({
			query: orderId => ({
				url: `/api/orders/${orderId}/deliver`,
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
			}),
		}),
	}),
})

export const {
	useCreateOrderMutation,
	useGetOrderDetailsQuery,
	usePayOrderMutation,
	useGetPayPalClientIdQuery,
	useGetMyOrdersQuery,
	useGetOrdersQuery,
	useDeliverOrderMutation,
} = orderApliSlice
