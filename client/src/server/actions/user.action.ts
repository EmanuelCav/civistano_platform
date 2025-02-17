import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { createAsyncThunk } from "@reduxjs/toolkit";

import * as ActionPropsTypes from "@/types/action.types";

import * as userApi from "../api/user.api";
import * as userReducer from "../reducer/user.reducer";

import { dangerMessage, successMessage } from "@/helper/message";

export const getEmail = createAsyncThunk("users/getEmail", async (emailData: ActionPropsTypes.GetEmailActionPropsType, { dispatch }) => {

    try {

        const data = await userApi.getEmailApi(emailData.data, emailData.id)

        dispatch(userReducer.authUser(data))

        emailData.router.push('/panel')

        emailData.setIsEmail(false)

    } catch (error: any) {
        dangerMessage(error)
    }

})

export const getUser = createAsyncThunk("users/getUser", async (userData: ActionPropsTypes.GetUserActionPropsType, { dispatch }) => {

    try {

        const data = await userApi.getUserApi(userData.id, userData.token)

        dispatch(userReducer.authUser(data))

    } catch (error) {
        dispatch(userReducer.logoutUser())
        userData.router.push('/')
        console.log(error);
        dangerMessage("Error al obtener los datos. del usuario")
    }

})

export const logoutAction = createAsyncThunk("users/logout", async (router: AppRouterInstance, { dispatch }) => {

    try {

        router.push('/auth')

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
        dangerMessage("Error al crear un ancestro")
    }

})

export const updateAncestryUser = createAsyncThunk("users/updateAncestry", async (userData: ActionPropsTypes.UpdateAncestryUserActionPropsType, { dispatch }) => {

    try {

        const data = await userApi.updateAncestryUserApi(userData.userData, userData.id, userData.token)

        dispatch(userReducer.actionUser(data))

        userData.setIsUpdateProfile(false)

    } catch (error) {
        console.log(error);
        dangerMessage("Error al actualizar un ancestro")
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

        successMessage("Se ha creado el ancestro correctamente")

        userData.setIsRestart(false)

    } catch (error) {
        console.log(error)
        dangerMessage("Error al añadir un ancestro")
    }

})

export const removeAncestryUser = createAsyncThunk("users/removeAncestry", async (userData: ActionPropsTypes.RemoveAncestryUserActionPropsType, { dispatch }) => {

    try {

        const data = await userApi.removeAncestryUserApi(userData.token)

        dispatch(userReducer.actionUser(data.user))

        userData.setIsRemoveAncestry(false)

        successMessage(data.message)

    } catch (error) {
        console.log(error);
        dangerMessage("Error al eliminar un ancestro")
    }

})

export const restartAncestryUser = createAsyncThunk("users/restartAncestry", async (userData: ActionPropsTypes.RestartAncestryUserActionPropsType, { dispatch }) => {

    try {

        const data = await userApi.restartAncestryUserApi(userData.token)

        dispatch(userReducer.actionUser(data.user))

        userData.setIsRestart(false)

        successMessage(data.message)

    } catch (error) {
        console.log(error);
        dangerMessage("Error al momento de restaurar")
    }

})

export const removeUser = createAsyncThunk("users/remove", async (userData: ActionPropsTypes.RemoveUserActionPropsType, { dispatch }) => {

    try {

        const data = await userApi.removeUserApi(userData.id, userData.token)

        dispatch(userReducer.logoutUser())

        successMessage(data)

        userData.router.push("/")

    } catch (error) {
        console.log(error);
        dangerMessage("Error de eliminar el usuario")
    }

})

export const loginUser = createAsyncThunk("users/login", async (userData: ActionPropsTypes.LoginUserActionPropsType, { dispatch }) => {

    try {

        const token = await userApi.loginApi(userData.emailData)

        dispatch(userReducer.tokenUser(token))

        userData.setIsLoggedIn(true)

    } catch (error: any) {
        dangerMessage(error)
    }

})

export const codeUser = createAsyncThunk("users/code", async (userData: ActionPropsTypes.CodeUserActionPropsType, { dispatch }) => {

    try {

        const data = await userApi.codeApi(userData.codeData, userData.token)

        dispatch(userReducer.authUser(data))

        userData.router.push("/panel")

    } catch (error: any) {
        dangerMessage(error)
    }

})

export const contactUser = createAsyncThunk("users/contact", async (userData: ActionPropsTypes.ContactUserActionPropsType) => {

    try {

        const data = await userApi.contactApi(userData.contactData, userData.token)

        successMessage(data.message)

    } catch (error: any) {
        dangerMessage(error)
    }

})