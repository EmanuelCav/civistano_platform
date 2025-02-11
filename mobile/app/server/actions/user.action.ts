import { createAsyncThunk } from "@reduxjs/toolkit";

import * as ActionPropsTypes from "../../types/action.types";
import { StackNavigation } from "../../types/props.types";

import * as userApi from "../api/user.api";
import * as userReducer from "../reducer/user.reducer";

export const getEmail = createAsyncThunk("users/getEmail", async (emailData: ActionPropsTypes.GetEmailActionPropsType, { dispatch }) => {

    try {

        const data = await userApi.getEmailApi(emailData.data, emailData.id)

        dispatch(userReducer.authUser(data))

        emailData.navigate.navigate('PrivateScreen')

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

export const logoutAction = createAsyncThunk("users/logout", async (navigate: StackNavigation, { dispatch }) => {

    try {

        navigate.navigate('Auth')

        dispatch(userReducer.logoutUser())

    } catch (error) {
        console.log(error);
    }

})

export const createAncestryUser = createAsyncThunk("users/createAncestry", async (userData: ActionPropsTypes.CreateAncestryUserActionPropsType, { dispatch }) => {

    try {

        const data = await userApi.createAncestryUserApi(userData.id, userData.token)

        dispatch(userReducer.actionUser(data))

        userData.setIsCompleteAncestry(false)

    } catch (error) {
        console.log(error);
    }

})

export const updateAncestryUser = createAsyncThunk("users/updateAncestry", async (userData: ActionPropsTypes.UpdateAncestryUserActionPropsType, { dispatch }) => {

    try {

        const data = await userApi.updateAncestryUserApi(userData.userData, userData.id, userData.token)

        dispatch(userReducer.actionUser(data))

        userData.setIsUpdateProfile(false)

    } catch (error) {
        console.log(error);
    }

})

export const checkAncestryUser = createAsyncThunk("users/checkAncestry", async (userData: ActionPropsTypes.CheckAncestryUserActionPropsType, { dispatch }) => {

    try {

        const data = await userApi.checkAncestryApi(userData.aid, userData.cid, userData.token)

        dispatch(userReducer.actionUser(data))

    } catch (error) {
        console.log(error);
    }

})

export const addAncestryUser = createAsyncThunk("users/addAncestry", async (userData: ActionPropsTypes.AddAncestryUserActionPropsType, { dispatch }) => {

    try {

        const data = await userApi.createAncestryUserApi(userData.id, userData.token)

        dispatch(userReducer.actionUser(data))

        userData.setIsRestart(false)

    } catch (error) {
        console.log(error);
    }

})

export const removeAncestryUser = createAsyncThunk("users/removeAncestry", async (userData: ActionPropsTypes.RemoveAncestryUserActionPropsType, { dispatch }) => {

    try {

        const data = await userApi.removeAncestryUserApi(userData.token)

        dispatch(userReducer.actionUser(data.user))

        userData.setIsRemoveAncestry(false)

    } catch (error) {
        console.log(error);
    }

})

export const restartAncestryUser = createAsyncThunk("users/restartAncestry", async (userData: ActionPropsTypes.RestartAncestryUserActionPropsType, { dispatch }) => {

    try {

        const data = await userApi.restartAncestryUserApi(userData.token)

        dispatch(userReducer.actionUser(data.user))

        userData.setIsRestart(false)

    } catch (error) {
        console.log(error);
    }

})

export const removeUser = createAsyncThunk("users/remove", async (userData: ActionPropsTypes.RemoveUserActionPropsType, { dispatch }) => {

    try {

        userData.navigate.navigate("Auth")

        await userApi.removeUserApi(userData.id, userData.token)

        dispatch(userReducer.logoutUser())


    } catch (error) {
        console.log(error);
    }

})

export const loginUser = createAsyncThunk("users/login", async (userData: ActionPropsTypes.LoginUserActionPropsType, { dispatch }) => {

    try {

        const token = await userApi.loginApi(userData.emailData)

        dispatch(userReducer.tokenUser(token))

        userData.setIsLoggedIn(true)

    } catch (error) {
        console.log(error);
    }

})

export const codeUser = createAsyncThunk("users/code", async (userData: ActionPropsTypes.CodeUserActionPropsType, { dispatch }) => {

    try {

        const data = await userApi.codeApi(userData.codeData, userData.token)

        dispatch(userReducer.authUser(data))

        userData.navigate.navigate("PrivateScreen")

    } catch (error) {
        console.log(error);
    }

})