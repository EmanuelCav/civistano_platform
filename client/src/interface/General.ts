import { IReducerSurvey } from "./Survey";
import { IReducerUser } from "./User";

export interface IReducer {
    survey: IReducerSurvey;
    user: IReducerUser;
}

export interface ITab {
    tab: string;
    url: string;
}

export interface IAncestry {
    ancestry: string,
    hierarchy: number;
    isFemale: boolean;
}