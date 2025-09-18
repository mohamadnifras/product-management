import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axiosInstance from "../api/axiosInstance"
import { handleError } from "../utils/handleError";

const initialState = {
    user: null,
    loading: false,
    error: null,
}

export const signUp = createAsyncThunk("auth/signUp", async (userData, { rejectWithValue }) => {
    console.log("signUp :", userData)
    try {
        const response = await axiosInstance.post("/auth/sign-up",userData);
        console.log("response:", response)
        return response.data
    } catch (error) {
        return rejectWithValue(handleError(error))
    }
})

export const signIn = createAsyncThunk("auth/signIn", async (userData, { rejectWithValue }) => {
    try {
        const response =  axiosInstance.post("/auth/sign-in", userData);
        return (await response).data.user
    } catch (error) {
        return rejectWithValue(handleError(error))
    }
});

export const fetchUserDetails = createAsyncThunk(
    'auth/fetchUserDetails',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/auth/me")
            return response.data.user;
        } catch (error) {
            if (error.response?.status === 401) {
                return rejectWithValue("Please login with your credentials ")
            }
            return rejectWithValue(handleError(error))
        }
    }
);

export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/auth/logout")
            return response.data;
        } catch (error) {
            return rejectWithValue(handleError(error))
        }
    }

)

export const refreshToken = createAsyncThunk(
    'auth/refreshToken',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("");
            return response.data;
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);


const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signUp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(signUp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(signIn.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(signIn.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchUserDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false
                state.user = null
                state.error = null
            })
    }
});

export default authSlice.reducer