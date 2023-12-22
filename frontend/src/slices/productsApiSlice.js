import { apiSlice } from "./apiSlices"

export const productsApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getProducts: builder.query({
			query: () => ({ url: "/api/products" }),
			providesTags: ["Product"],
			keepUnusedDataFor: 5,
		}),
		getProductDetails: builder.query({
			query: productId => ({
				url: `/api/products/${productId}`,
			}),
			keepUnusedDataFor: 5,
		}),
		createProduct: builder.mutation({
			query: () => ({
				url: "/api/products/",
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
			}),
			invalidatesTags: ["Product"],
		}),
		updateProduct: builder.mutation({
			query: data => ({
				url: `/api/products/${data._id}`,
				method: "PUT",
				body: data,
				headers: { "Content-Type": "application/json" },
				credentials: "include",
			}),
			invalidatesTags: ["Product"],
		}),
	}),
})

export const {
	useGetProductsQuery,
	useGetProductDetailsQuery,
	useCreateProductMutation,
	useUpdateProductMutation,
} = productsApiSlice
