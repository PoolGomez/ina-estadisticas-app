import { InfoUserData } from "@/models";
import { clearLocalStorage, persistLocalStorage } from "@/utilities";
import {createSlice} from "@reduxjs/toolkit"


export const EmptyDataState = {
    name: "",
    email: "",
    rol: "",
};
export const InfoKey = 'info';

export const infoSlice = createSlice({
    name: "info",
    initialState: localStorage.getItem('info') ? JSON.parse(localStorage.getItem('info') as string) : EmptyDataState,
    reducers: {
        createInfo: (_state, action)=> {
            persistLocalStorage<InfoUserData>(InfoKey, action.payload);
            return action.payload;
        },
        updateInfo: (state, action) => {
            const result = { ...state, ...action.payload };
            persistLocalStorage<InfoUserData>(InfoKey, result);
            return result;
        },
        resetInfo: () => {
            clearLocalStorage(InfoKey);
            return EmptyDataState;
        }
    }
})

export const { createInfo, updateInfo, resetInfo } = infoSlice.actions;

export default infoSlice.reducer;