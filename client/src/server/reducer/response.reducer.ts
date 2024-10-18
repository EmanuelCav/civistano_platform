import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { getEmail } from '../actions/user.action';
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
        builder.addCase(getEmail.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getEmail.fulfilled, (state) => {
            state.loading = false
        })
        builder.addCase(getEmail.rejected, (state) => {
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
    }
})

export const { loadingAction } = counterResponseSlice.actions

export default counterResponseSlice.reducer