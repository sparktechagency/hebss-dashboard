import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const getAuthToken = () => {
//   return localStorage.getItem("authToken");
// };

const teamApi = createApi({
  reducerPath: "teamApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://10.0.60.55:5003/v1`,
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

        // Add other form data fields
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("position", data.position);
        formData.append("description", data.description);

        // Add image or any other fields
        if (data.image) {
          formData.append("image", data.image);
        }

        return {
          url: "/team/create",
          method: "POST",
          body: formData, // Using FormData for file uploads
        };
      },
    }),
    getAllTeamMembers: builder.query({
      query: () => "/team/retrieve/all",
    }),
  }),
});

export const { useCreateTeamMemberMutation, useGetAllTeamMembersQuery } =
  teamApi;

export default teamApi;
