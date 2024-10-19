import { createAsyncThunk } from "@reduxjs/toolkit";

import { GetEmailActionPropsType } from "@/types/action.types";

import * as userApi from "../api/user.api";
import * as userReducer from "../reducer/user.reducer";

export const getEmail = createAsyncThunk("users/getUser", async (emailData: GetEmailActionPropsType, { dispatch }) => {

    try {

        const data = await userApi.getEmailApi(emailData.data, emailData.id)

        dispatch(userReducer.authUser(data))

        emailData.setIsEmail(false)

        emailData.router.push('/panel')

    } catch (error) {
        console.log(error);
    }

})