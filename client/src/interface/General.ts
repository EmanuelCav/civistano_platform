import { IReducerSurvey } from "./Survey";

export interface IReducer {
    survey: IReducerSurvey;
}

export interface ITab {
    tab: string;
    url: string;
}