import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { menuItemModel } from "../Interfaces";


const menuItemApi = createApi({
    reducerPath:"menuItemApi",
    baseQuery: fetchBaseQuery({
        baseUrl:"https://redmangoapi.azurewebsites.net/api/"
    }),
    tagTypes: ["MenuItems"],
    endpoints: (builder) => ({
        getMenuItems: builder.query({
            query: () => ({
                url:"menuitem"
            }),
            providesTags:["MenuItems"]
        }),
        getMenuItemById: builder.query({
            query: (id) =>({
               url: `menuItem/${id}`
            }),
            providesTags:["MenuItems"]
        })
    })
})


export const{useGetMenuItemsQuery, useGetMenuItemByIdQuery} = menuItemApi
export default menuItemApi