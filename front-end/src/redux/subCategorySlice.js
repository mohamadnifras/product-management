import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axiosInstance from "../api/axiosInstance"
import { handleError } from "../utils/handleError"

const initialState = {
    subCategories: [],
    loading: false,
    error: null,
};

export const createSubCategory = createAsyncThunk(
    "subCategory/createSubCategory",
    async ({ name, categoryName }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/product/subCategory", { name, categoryName });
            return response.data;
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

export const fetchSubCategories = createAsyncThunk(
    "subCategory/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/product/subCategory")
            return response.data.data;
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

const subCategorySlice = createSlice({
    name: "subCategory",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
// create subcategory
      .addCase(createSubCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
        .addCase(createSubCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.subCategories.push(action.payload);
        })
        .addCase(createSubCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        // fetch subcategories
        .addCase(fetchSubCategories.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchSubCategories.fulfilled, (state, action) => {
            state.loading = false;
            state.subCategories = action.payload;
        })
        .addCase(fetchSubCategories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
}
})

export default subCategorySlice.reducer