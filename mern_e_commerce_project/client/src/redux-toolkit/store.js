import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import authService from './services/authService';
import authReducer from './reducers/authReducer';
import categoryService from './services/createService';
import categoryReducer from './reducers/categoryReducer';

const store = configureStore({
    reducer: {
        [authService.reducerPath]: authService.reducer,
        [categoryService.reducerPath]: categoryService.reducer,
        "authReducer": authReducer,
        "categoryReducer": categoryReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([categoryService.middleware])
});

export default store;