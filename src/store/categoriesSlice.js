import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosService from "./axiosService";
import { toast } from "react-toastify";

export const getCategoryTree = createAsyncThunk(
    'categories/getCategoryTree',
    async () => {
        const response = await axiosService.get('/products');
        const data = await response.data;
        return data;
    }
);

export const getCategories = createAsyncThunk(
    'categories/getCategories',
    async () => {
        const response = await axiosService.get('/categories');
        const data = await response.data;
        return data;
    }
);

export const addCategory = createAsyncThunk(
    'categories/addCategory',
    async (params) => {
        if (!params.parent) {
            params.parent = '';
        }
        const response = await axiosService.post('/category/add', params);
        const data = await response.data;
        if (data.status === 200) {
            toast.success('Category successfully added!');
        }
        return data;
    }
);

const initialState = {
    tree: {
        items: [],
        isLoading: false,
        hasError: false
    },
    list: {
        items: [],
        isLoading: false,
        hasError: false
    }
};

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: initialState,
    // reducers: {
    //     resetPost(state) {
    //         Object.assign(state.post, initialState.post)
    //     }
    // },
    extraReducers(builder) {
        builder.addCase(getCategoryTree.pending, (state, action) => {
            state.tree.isLoading = true;
            state.tree.hasError = false;
        })
        builder.addCase(getCategoryTree.fulfilled, (state, action) => {
            state.tree.items = action.payload.data;
            state.tree.isLoading = false;
            state.tree.hasError = false;
        })
        builder.addCase(getCategoryTree.rejected, (state, action) => {
            console.warn(`${action.type}:`, action?.error?.message);
            state.tree.isLoading = false;
            state.tree.hasError = true;
        })
        builder.addCase(getCategories.pending, (state, action) => {
            state.list.isLoading = true;
            state.list.hasError = false;
        })
        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.list.items = action.payload.data;
            state.list.isLoading = false;
            state.list.hasError = false;
        })
        builder.addCase(getCategories.rejected, (state, action) => {
            console.warn(`${action.type}:`, action?.error?.message);
            state.list.isLoading = false;
            state.list.hasError = true;
        })
    }
});

// export const { resetPost } = postsSlice.actions;

export default categoriesSlice;