// api.ts file with Redux Toolkit Query setup
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";

const pause = (duration: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, duration);
  });
};

const albumsApi = createApi({
  reducerPath: "albums",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
    fetchFn: async (...args) => {
      await pause(1000);
      return fetch(...args);
    },
  }),
  tagTypes: ["Album", "UserAlbum"],
  endpoints: (builder) => ({
    fetchAlbums: builder.query({
      providesTags: (result = [], error, user) => {
        // Add default value for result
        if (!result) return [{ type: "UserAlbum", id: user.id }];

        const tags = result.map((album) => {
          return { type: "Album" as const, id: album.id };
        });
        tags.push({ type: "UserAlbum" as const, id: user.id });
        return tags;
      },
      query: (user) => {
        return {
          url: "/albums",
          method: "GET",
          params: {
            userId: user.id,
          },
        };
      },
    }),
    addAlbum: builder.mutation({
      // Changed from addAlbums to addAlbum for consistency
      invalidatesTags: (result, error, user) => {
        return [{ type: "UserAlbum" as const, id: user.id }];
      },
      query: (user) => {
        return {
          url: "/albums",
          method: "POST",
          body: {
            userId: user.id,
            title: faker.commerce.productName(),
            releaseYear: faker.date.past().getFullYear(),
            genre: faker.music.genre(),
          },
        };
      },
    }),
    removeAlbum: builder.mutation({
      // Changed from removeAlbums to removeAlbum for consistency
      invalidatesTags: (result, error, album) => {
        return [{ type: "Album" as const, id: album.id }];
      },
      query: (album) => {
        return {
          url: `/albums/${album.id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export { albumsApi };
export const {
  useFetchAlbumsQuery,
  useAddAlbumMutation, // Changed hook name to match endpoint name
  useRemoveAlbumMutation, // Changed hook name to match endpoint name
} = albumsApi;
