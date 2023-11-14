import { apiSlice } from "./apiSlices"

export const productsApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getProducts: builder.query({
			query: () => ({ url: "/api/products" }),
			keepUnusedDataFor: 5,
		}),
		getProductDetails: builder.query({
			query: productId => ({
				url: `/api/products/${productId}`,
			}),
			keepUnusedDataFor: 5,
		}),
	}),
})

export const { useGetProductsQuery, useGetProductDetailsQuery } = productsApiSlice
