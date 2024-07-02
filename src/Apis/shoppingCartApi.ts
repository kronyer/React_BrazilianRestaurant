import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { menuItemModel } from "../Interfaces";


const shoppingCartApi = createApi({
    reducerPath:"shoppingCartApi",
    baseQuery: fetchBaseQuery({
        baseUrl:"https://redmangoapi.azurewebsites.net/api/"
    }),
    tagTypes: ["ShoppingCarts"],
    endpoints: (builder) => ({
        getShoppingCart: builder.query({
            query: (userId) =>({
               url: `shoppingcart`,
               params:{
                userId:userId
               }
            }),
            providesTags:["ShoppingCarts"]
        }),
        updateShoppingCart: builder.mutation({
            query:({menuItemId, updateQuantityBy, userId}) => ({
                url:"shoppingcart",
                method:"POST",
                params:{
                    menuItemId, updateQuantityBy, userId //mesmos nomes nao precisa dar o isso:aquilo
                }
            }),
            invalidatesTags:["ShoppingCarts"]
        })
    })
})


export const{useGetShoppingCartQuery, useUpdateShoppingCartMutation} = shoppingCartApi
export default shoppingCartApi