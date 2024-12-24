import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { IReducerUser, IUser, IUserInfo } from "../../interface/User";
import { IAncestry } from "../../interface/General";

const initialState: IReducerUser = {
    isLoggedIn: false,
    user: {}
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateAncestry: (state, action: PayloadAction<IAncestry>) => {
            state.user.ancestry = action.payload
        },
        authUser: (state, action: PayloadAction<IUserInfo>) => {
            state.isLoggedIn = true,
            state.user = action.payload
        },
        actionUser: (state, action: PayloadAction<IUser>) => {
            state.user.user = action.payload
        },
        logoutUser: (state) => {
            state.isLoggedIn = false,
            state.user = {}
        },
        tokenUser: (state, action: PayloadAction<string>) => {
            state.user.token = action.payload
        }
    }
})

export const { updateAncestry, authUser, logoutUser, actionUser, tokenUser } = userSlice.actions

export default userSlice.reducer