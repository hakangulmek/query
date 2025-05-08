"use client";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

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
  endpoints: (builder) => ({
    fetchUsers: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
    }),
    addUser: builder.mutation({
      query: () => ({
        url: "/users",
        method: "POST",
        body: {
          name: "Can",
        },
      }),
    }),
    removeUser: builder.mutation({
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
