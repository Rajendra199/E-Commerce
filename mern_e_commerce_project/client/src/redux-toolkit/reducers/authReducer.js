import { createSlice } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';

const localStorageAdminToken = window.localStorage.getItem('admin-token');

function verifyToken(){
  if(localStorageAdminToken){
    const decodeToken = jwtDecode(localStorageAdminToken);
    const expireIn = new Date(decodeToken.exp * 1000);
    if(new Date() > expireIn){
      localStorage.removeItem('admin-token');
      return null;
    }else{
      return localStorageAdminToken;
    }
  }else{
    return null;
  }
}

const initialState = {
    adminToken: verifyToken()
} 

const authReducer = createSlice({
  name: 'authReducer',
  initialState: initialState,
  reducers: {
    setAdminToken: (state, action) => {
      state.adminToken = action.payload
    },
    logout: (state) => {
      localStorage.removeItem('admin-token')
      state.adminToken = null;
    }
  }
});

export const { setAdminToken, logout } = authReducer.actions;
export default authReducer.reducer;