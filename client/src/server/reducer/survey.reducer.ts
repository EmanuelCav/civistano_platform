import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { IQuestion, IReducerSurvey } from "@/interface/Survey";

const initialState: IReducerSurvey = {
    question: {}
}

const surveySlice = createSlice({
    name: 'survey',
    initialState,
    reducers: {
        updateQuestion: (state, action: PayloadAction<IQuestion | undefined>) => {
            state.question = action.payload!
        }
    }
})

export const { updateQuestion } = surveySlice.actions

export default surveySlice.reducer