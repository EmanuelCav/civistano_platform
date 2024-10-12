import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { IReducerUser } from "@/interface/User";
import { IAncestry } from "@/interface/General";

const initialState: IReducerUser = {
    isLoggedIn: false,
    user: {}
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateAncestry: (state, action: PayloadAction<IAncestry>) => {
            state.isLoggedIn = true,
            state.user.ancestry = action.payload!
        }
    }
})

export const { updateAncestry } = userSlice.actions

export default userSlice.reducer