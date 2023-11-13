import { apiSlice } from "./apiSlices"

export const productsApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getProducts: builder.query({
			query: () => ({ url: "/api/products" }),
		}),
		keepUnusedDataFor: 5,
	}),
})

export const { useGetProductsQuery } = productsApiSlice
