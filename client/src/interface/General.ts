import { IReducerSurvey } from "./Survey";
import { IReducerUser, IUser } from "./User";

export interface IReducer {
    survey: IReducerSurvey;
    user: IReducerUser;
    response: IResponse;
}

export interface ITab {
    tab: string;
    url: string;
}

export interface IProvince {
    _id: string;
    province: string;
    country: string;
    createdAt: string;
    updatedAt: string;
}

export interface IAncestry {
    _id: string;
    ancestry: string,
    hierarchy: number;
    isFemale: boolean;
    areParents: boolean;
    isHidden: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface IChecklist {
    title: string;
    description: string;
    areParents: boolean;
    link: string;
    isChecked: boolean;
}

export interface ILink {
    _id: string;
    Link: string;
    province: IProvince;
    checklist: IChecklist;
    createdAt: string;
    updatedAt: string;
}

export interface IResponse {
    loading: boolean;
}

export interface IMessageUser {
    user: IUser;
    message: string;
}