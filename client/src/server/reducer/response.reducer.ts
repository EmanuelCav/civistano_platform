import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import * as userAction from '../actions/user.action';
import { getAncestors } from '../actions/ancestry.action';

import { IResponse } from '../../interface/General';

const initialState: IResponse = {
    loading: false
}

const counterResponseSlice = createSlice({
    name: 'response',
    initialState,
    reducers: {
        loadingAction: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        }
    },
    extraReducers(builder) {
        builder.addCase(userAction.getEmail.pending, (state) => {
            state.loading = true
        })
        builder.addCase(userAction.getEmail.fulfilled, (state) => {
            state.loading = false
        })
        builder.addCase(userAction.getEmail.rejected, (state) => {
            state.loading = false
        })

        builder.addCase(getAncestors.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getAncestors.fulfilled, (state) => {
            state.loading = false
        })
        builder.addCase(getAncestors.rejected, (state) => {
            state.loading = false
        })

        builder.addCase(userAction.getUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(userAction.getUser.fulfilled, (state) => {
            state.loading = false
        })
        builder.addCase(userAction.getUser.rejected, (state) => {
            state.loading = false
        })

        builder.addCase(userAction.createAncestryUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(userAction.createAncestryUser.fulfilled, (state) => {
            state.loading = false
        })
        builder.addCase(userAction.createAncestryUser.rejected, (state) => {
            state.loading = false
        })

        builder.addCase(userAction.updateAncestryUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(userAction.updateAncestryUser.fulfilled, (state) => {
            state.loading = false
        })
        builder.addCase(userAction.updateAncestryUser.rejected, (state) => {
            state.loading = false
        })

        builder.addCase(userAction.logoutAction.pending, (state) => {
            state.loading = true
        })
        builder.addCase(userAction.logoutAction.fulfilled, (state) => {
            state.loading = false
        })
        builder.addCase(userAction.logoutAction.rejected, (state) => {
            state.loading = false
        })
    }
})

export const { loadingAction } = counterResponseSlice.actions

export default counterResponseSlice.reducer