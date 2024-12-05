import { InfoUserData, UserInfo } from "@/models";
import { userSlice } from "./states/user";
import { configureStore } from "@reduxjs/toolkit";
import { tokenSlice } from "./states/token";
import { infoSlice } from "./states/info";

export interface AppStore {
    user: UserInfo;
    token: string;
    info: InfoUserData;

}

export default configureStore<AppStore>({
    reducer: {
        user: userSlice.reducer,
        token: tokenSlice.reducer,
        info: infoSlice.reducer,
    }
})