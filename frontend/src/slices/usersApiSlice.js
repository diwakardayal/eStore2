import { apiSlice } from "./apiSlices"

export const usersApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		login: builder.mutation({
			query: data => ({ url: "/api/users/auth", method: "POST", body: data }),
		}),
		register: builder.mutation({
			query: data => ({ url: "/api/users", method: "POST", body: data }),
		}),
		logout: builder.mutation({
			query: () => ({
				url: "/api/users/logout",
				method: "POST",
			}),
		}),
	}),
})

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } = usersApiSlice
