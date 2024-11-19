import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
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

        const data = await userApi.getUserApi(userData.id, userData.token)

        dispatch(userReducer.authUser(data))

    } catch (error) {
        // dispatch(userReducer.logoutUser())
        // userData.router.push('/')
        console.log(error);
        
    }

})

export const logout = createAsyncThunk("users/logout", async (router: AppRouterInstance, { dispatch }) => {

    try {

        dispatch(userReducer.logoutUser())

        router.push('/')

    } catch (error) {
        console.log(error);
    }

})

export const createAncestryUser = createAsyncThunk("users/createAncestry", async (userData: ActionPropsTypes.CreateAncestryUserPropsType, { dispatch }) => {

    try {

        const data = await userApi.createAncestryUserApi(userData.id, userData.token)

        dispatch(userReducer.actionUser(data))

        userData.setIsCompleteAncestry(false)

    } catch (error) {
        console.log(error);
    }

})

export const updateAncestryUser = createAsyncThunk("users/updateAncestry", async (userData: ActionPropsTypes.UpdateAncestryUserPropsType, { dispatch }) => {

    try {

        const data = await userApi.updateAncestryUserApi(userData.userData, userData.id, userData.token)

        dispatch(userReducer.actionUser(data))

        userData.setIsUpdateProfile(false)

    } catch (error) {
        console.log(error);
    }

})