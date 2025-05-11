import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";

const pause = (duration: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, duration);
  });
};

const fotoApi = createApi({
  reducerPath: "fotos",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
    fetchFn: async (...args) => {
      await pause(1000);
      return fetch(...args);
    },
  }),
  tagTypes: ["Foto", "UserFoto"],
  endpoints: (builder) => ({
    fetchFotos: builder.query({
      providesTags: (result = [], error, album) => {
        if (!result) return [{ type: "UserFoto", id: album.id }];
        const tags = result.map((foto) => {
          return { type: "Foto" as const, id: foto.id };
        });
        tags.push({ type: "UserFoto" as const, id: album.id });
        return tags;
      },
      query: (album) => {
        return {
          url: "/fotos",
          method: "GET",
          params: {
            albumId: album.id,
          },
        };
      },
    }),
    addFoto: builder.mutation({
      invalidatesTags: (result, error, album) => {
        return [{ type: "UserFoto" as const, id: album.id }];
      },
      query: (album) => {
        return {
          url: "/fotos",
          method: "POST",
          body: {
            albumId: album.id,
            url: faker.image.url(),
            releaseYear: faker.date.past().getFullYear(),
            genre: faker.music.genre(),
          },
        };
      },
    }),
    deleteFoto: builder.mutation({
      invalidatesTags: (result, error, foto) => {
        return [{ type: "UserFoto" as const, id: foto.userId }];
      },
      query: (foto) => {
        return {
          url: `/fotos/${foto.id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const { useFetchFotosQuery, useAddFotoMutation, useDeleteFotoMutation } =
  fotoApi;

export { fotoApi };
