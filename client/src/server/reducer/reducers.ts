import { combineReducers } from "@reduxjs/toolkit";

import surveyReducer from './survey.reducer';

export default combineReducers({
    survey: surveyReducer,
})