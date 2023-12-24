import { apiSlice } from "./apiSlices"

export const usersApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		login: builder.mutation({
			query: data => ({
				url: "/api/users/auth",
				method: "POST",
				body: data,
				headers: { "Content-Type": "application/json" },
				credentials: "include",
			}),
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
		profile: builder.mutation({
			query: data => ({
				url: "/api/users/profile",
				method: "PUT",
				body: data,
				headers: { "Content-Type": "application/json" },
				credentials: "include",
			}),
		}),
		getUsers: builder.query({
			query: () => ({
				url: "/api/users",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
			}),
			providesTags: ["Users"],
			keepUnusedDataFor: 5,
		}),
		deleteUser: builder.mutation({
			query: userId => ({
				url: `/api/users/${userId}`,
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
			}),
			providesTags: ["Users"],
		}),
	}),
})

export const {
	useLoginMutation,
	useLogoutMutation,
	useRegisterMutation,
	useProfileMutation,
	useGetUsersQuery,
	useDeleteUserMutation,
} = usersApiSlice
