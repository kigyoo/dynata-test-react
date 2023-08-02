import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from './categoriesSlice';
import cartSlice from "./cartSlice";
import productsSlice from "./productsSlice";

export const store = configureStore({
    reducer: {
        categories: categoriesSlice.reducer,
        cart: cartSlice.reducer,
        products: productsSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
            immutableCheck: false,
        }),
});