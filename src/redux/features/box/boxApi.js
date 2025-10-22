import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const boxApi = createApi({
  reducerPath: "boxApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Boxes"],
  endpoints: (builder) => ({
    // get all boxes
    getAllBox: builder.query({
      query: () => "/box/retrieve",
      // provide tag for each box and a LIST tag
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map((b) => ({ type: "Boxes", id: b._id })),
              { type: "Boxes", id: "LIST" },
            ]
          : [{ type: "Boxes", id: "LIST" }],
      // optional: refetch when component mounts to be safe
      // keepUnusedDataFor: 60,
    }),

    // get single box
    getBoxById: builder.query({
      query: (boxId) => `/box/retrieve/${boxId}`,
      providesTags: (result, error, id) => [{ type: "Boxes", id }],
    }),

    getCurrentBox: builder.query({
      query: (boxId) => `/box/retrieve/${boxId}`,
      providesTags: (result, error, id) => [{ type: "Boxes", id }],
    }),

    getBoxByUserId: builder.query({
      query: (userId) => `/box/current/${userId}`,
      providesTags: (result) =>
        result && result.data ? [{ type: "Boxes", id: result.data._id }] : [],
    }),

    getBookById: builder.query({
      query: (bookId) => `/books/${bookId}`,
    }),

    // update box with invalidation + optimistic cache update
    updateBox: builder.mutation({
      query: ({ _id, data }) => ({
        url: `/box/customize/${_id}`,
        method: "PATCH",
        body: data,
      }),
      // invalidate the single box and the list
      invalidatesTags: (result, error, { _id }) => [
        { type: "Boxes", id: _id },
        { type: "Boxes", id: "LIST" },
      ],
      // optimistic patch — update getAllBox cache immediately
      async onQueryStarted({ _id, data }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          boxApi.util.updateQueryData("getAllBox", undefined, (draft) => {
            try {
              if (!draft || !draft.data) return;
              const idx = draft.data.findIndex((b) => b._id === _id);
              if (idx !== -1) {
                // merge updated fields into draft box
                draft.data[idx] = { ...draft.data[idx], ...data };
              }
            } catch (e) {
              // ignore
            }
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    getBoxByCategoryId: builder.query({
      query: (categoryId) => `/box/retrieve/category/${categoryId}`,
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? result.data.map((b) => ({ type: "Boxes", id: b._id }))
          : [],
    }),
  }),
});

export const {
  useGetAllBoxQuery,
  useGetBoxByIdQuery,
  useGetCurrentBoxQuery,
  useUpdateBoxMutation,
  useGetBoxByUserIdQuery,
  useGetBoxByCategoryIdQuery,
  useGetBookByIdQuery,
} = boxApi;

export default boxApi;
