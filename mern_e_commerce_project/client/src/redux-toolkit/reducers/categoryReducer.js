import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    success: ""
}

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        addCategory: (state, action) => {
            state.success = action.payload
        },
        clearCategory: (state) => {
            state.success = ""
        }
    }
});


export const {addCategory, clearCategory} = categorySlice.actions;
export default categorySlice.reducer;