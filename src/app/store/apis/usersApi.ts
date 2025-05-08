"use client";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";

const pause = (duration: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, duration);
  });
};
const usersApi = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
    fetchFn: async (...args) => {
      await pause(1000);
      return fetch(...args);
    },
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    fetchUsers: builder.query({
      providesTags: (result) => (result ? [{ type: "User" }] : []),
      query: () => ({
        url: "/users",
        method: "GET",
      }),
    }),
    addUser: builder.mutation({
      invalidatesTags: [{ type: "User" }],
      query: () => ({
        url: "/users",
        method: "POST",
        body: {
          name: faker.name.fullName(),
        },
      }),
    }),
    removeUser: builder.mutation({
      invalidatesTags: [{ type: "User" }],
      query: (user) => ({
        url: `/users/${user.id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export { usersApi };
export const { useFetchUsersQuery, useAddUserMutation, useRemoveUserMutation } =
  usersApi;
