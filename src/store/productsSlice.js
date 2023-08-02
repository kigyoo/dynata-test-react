import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosService from "./axiosService";
import { toast } from "react-toastify";

export const addProduct = createAsyncThunk(
    'products/addProduct',
    async (params) => {
        const response = await axiosService.post('/product/add', params);
        const data = await response.data;
        if (data.status === 200) {
            toast.success('Product successfully added!');
        }
        return data;
    }
);

const productsSlice = createSlice({
    name: 'products',
    initialState: []
});


export default productsSlice;