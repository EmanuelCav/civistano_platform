import { combineReducers } from "@reduxjs/toolkit";

import surveyReducer from './survey.reducer';
import userReducer from './user.reducer';

export default combineReducers({
    survey: surveyReducer,
    user: userReducer
})