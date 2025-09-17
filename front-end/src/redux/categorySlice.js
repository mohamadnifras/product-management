import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axiosInstance from "../api/axiosInstance"
import { handleError } from "../utils/handleError"

const initialState = {
    categories: [],
    loading: false,
    error: null,

}

export const createCategory = createAsyncThunk("category/createCategory", async (name, { rejectWithValue }) => {
    console.log("redux:",name)
    try {
        const response = await axiosInstance.post("/product/category", {name});
        console.log("response:",response)
        return response.data
    } catch (error) {
        return rejectWithValue(handleError(error))
    }
});

export const fetchCategories = createAsyncThunk("cetegory/fetchCategories", async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get("/product/category");
        console.log(response)
        return response.data.data
    } catch (error) {
        return rejectWithValue(handleError(error))
    }
})
const categorySlice = createSlice({
    name: "category",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Create category
            .addCase(createCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.categories.push(action.payload); // add new category
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Fetch categories
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
        },

    });

export default categorySlice.reducer