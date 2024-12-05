
import { clearLocalStorage, persistLocalStorage } from "@/utilities";
import {createSlice} from "@reduxjs/toolkit"



export const TokenKey = 'token';

export const tokenSlice = createSlice({
    name: "token",
    initialState: localStorage.getItem('token') ?? "",
    reducers: {
        createToken: (_state, action)=> {
            persistLocalStorage<string>(TokenKey, action.payload);
            return action.payload;
        },
        // updateToken: (state, action) => {
        //     console.log("[3] ", localStorage.getItem('token'))
        //     console.log("[4] ", JSON.parse(localStorage.getItem('token') as string))
        //     const result = { ...state, ...action.payload };
        //     persistLocalStorage<string>(TokenKey, result);
        //     return result;
        // },
        resetToken: () => {
            clearLocalStorage(TokenKey);
            return "";
        }
    }
})

export const { createToken, 
    // updateToken, 
    resetToken } = tokenSlice.actions;

export default tokenSlice.reducer;