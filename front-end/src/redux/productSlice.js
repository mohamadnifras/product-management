import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axiosInstance from "../api/axiosInstance"
import { handleError } from "../utils/handleError"

const initialState = {
    loading: false,
    success: false,
    error: null,
    products: [],
    product: null,
    total: 0,
    page: 1,
    pages: 1,
    wishlist: [],
    wishlistLoading: false,
}

export const createProduct = createAsyncThunk("product/createProduct", async (formData, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post("/product/product", formData);
        return response.data
    } catch (error) {
        return rejectWithValue(handleError(error.response?.data || error.message))
    }
});

export const fetchProduct = createAsyncThunk(
    "product/fetchProduct",
    async ({ page, limit }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/product/product?page=${page}&limit=${limit}`);
            return response.data
        } catch (error) {
            return rejectWithValue(handleError(error))
        }

    });

export const getProductById = createAsyncThunk("product/getProductById", async (id, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`/product/${id}`);
        return response.data.product;
    } catch (error) {
        return rejectWithValue(handleError(error?.data?.message || "Failed to fetch product"))
    }
});

export const createWishlist = createAsyncThunk("product/createWishlist", async (productId, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post("/wishlist/", { productId });
        return response.data
    } catch (error) {
        return rejectWithValue(handleError(error))
    }
})

export const getWishlist = createAsyncThunk("product/getWishlist", async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get("/wishlist/");
        return response.data
    } catch (error) {
        return rejectWithValue(handleError(error))
    }
})

export const removeWishlist = createAsyncThunk("product/removeWishlist", async (productId, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.delete(`/wishlist/${productId}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(handleError(error))
    }
})


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
                state.products.push(action.payload);
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.data || [];
                state.total = action.payload.total || 0;
                state.page = action.payload.page || 1;
                state.pages = action.payload.totalPages || 1;
            })
            .addCase(fetchProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload;
            })
            .addCase(getProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(createWishlist.pending, (state) => {
                state.wishlistLoading = true;
            })
            .addCase(createWishlist.fulfilled, (state, action) => {
                state.wishlistLoading = false;

                state.wishlist.push(action.payload.wishlist || action.payload);
            })
            .addCase(createWishlist.rejected, (state, action) => {
                state.wishlistLoading = false;
                state.error = action.payload;
            })


            .addCase(getWishlist.pending, (state) => {
                state.wishlistLoading = true;
            })
            .addCase(getWishlist.fulfilled, (state, action) => {
                state.wishlistLoading = false;
                state.wishlist = action.payload.wishlist || action.payload.data || [];
            })
            .addCase(getWishlist.rejected, (state, action) => {
                state.wishlistLoading = false;
                state.error = action.payload;
            })


            .addCase(removeWishlist.pending, (state) => {
                state.wishlistLoading = true;
            })
            .addCase(removeWishlist.fulfilled, (state, action) => {
                state.wishlistLoading = false;
                state.wishlist = state.wishlist.filter(
                    (item) => item.product._id !== action.payload.productId
                );
            })
            .addCase(removeWishlist.rejected, (state, action) => {
                state.wishlistLoading = false;
                state.error = action.payload;
            });

    }
})

export default productSlice.reducer