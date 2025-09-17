import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axiosInstance from "../api/axiosInstance"
import { handleError } from "../utils/handleError"

const initialState = {
    loading: false,
    success: false,
    error: null,
    products: [],
    total: 0,
    page: 1,
    pages: 1,
}

export const createProduct = createAsyncThunk("product/createProduct", async (formData, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post("/product/product", formData);
        return response.data
    } catch (error) {
        return rejectWithValue(handleError(error.response?.data || error.message))
    }
});

export const fetchSubCategories = createAsyncThunk(
    "product/fetchSubCategories",
    async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/product/product?page=${page}&limit=${limit}`);
            return response.data
        } catch (error) {
            return rejectWithValue(handleError(error))
        }

    });
const productSlice = createSlice({
    name: "products",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createProduct.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.products.push(action.payload.data);
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchSubCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSubCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products;
                state.total = action.payload.total;
                state.page = action.payload.page;
                state.pages = action.payload.pages;
            })
            .addCase(fetchSubCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
})

export default productSlice.reducer