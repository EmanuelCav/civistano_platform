import { createAsyncThunk } from "@reduxjs/toolkit";

import * as ActionPropsTypes from "@/types/action.types";

import * as userApi from "../api/user.api";
import * as userReducer from "../reducer/user.reducer";

export const getEmail = createAsyncThunk("users/getEmail", async (emailData: ActionPropsTypes.GetEmailActionPropsType, { dispatch }) => {

    try {

        const data = await userApi.getEmailApi(emailData.data, emailData.id)

        dispatch(userReducer.authUser(data))

        emailData.router.push('/panel')

        emailData.setIsEmail(false)

    } catch (error) {
        console.log(error);
    }

})

export const getUser = createAsyncThunk("users/getUser", async (userData: ActionPropsTypes.GetUserActionPropsType, { dispatch }) => {

    try {

        console.log(userData.token);
        

        const data = await userApi.getUserApi(userData.id, userData.token)

        dispatch(userReducer.authUser(data))

    } catch (error) {
        userData.router.push('/')
    }

})