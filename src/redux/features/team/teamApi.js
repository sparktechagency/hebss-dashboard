import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const teamApi = createApi({
  reducerPath: "teamApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://10.0.60.55:5003/v1`,
  }),
  endpoints: (builder) => ({
    createTeamMember: builder.mutation({
      query: (data) => ({
        url: "/team/create",
        method: "POST",
        body: data,
      }),
    }),
    getAllTeamMembers:builder.query({
        query:()=>"/team/retrieve/all"
    })
  }),
});

export const { useCreateTeamMemberMutation,useGetAllTeamMembersQuery } = teamApi;

export default teamApi;
