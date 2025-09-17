import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../redux/authSlice"
import categoryReducer  from "../redux/categorySlice"
import subCategoryReducer  from "../redux/subCategorySlice"
import productReducer from "../redux/productSlice"


const store = configureStore({
    reducer: {
        auth: authReducer,
        category: categoryReducer,
        subCategory: subCategoryReducer,
        products: productReducer,
    }
});

export default store