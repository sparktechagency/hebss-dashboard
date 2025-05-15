import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const teamApi = createApi({
  reducerPath: "teamApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createTeamMember: builder.mutation({
      query: (data) => {
        const formData = new FormData();

        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("position", data.position);
        formData.append("description", data.description);

        if (data.image) {
          formData.append("image", data.image);
        }

        return {
          url: "/team/create",
          method: "POST",
          body: formData,
        };
      },
    }),
    getAllTeamMembers: builder.query({
      query: () => "/team/retrieve/all",
    }),
  }),
});

export const { useCreateTeamMemberMutation, useGetAllTeamMembersQuery } = teamApi;

export default teamApi;
