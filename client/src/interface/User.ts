import { IAncestry, IChecklist } from "./General";

export interface IReducerUser {
    user: IUserInfo;
    isLoggedIn: boolean;
}

export interface IUserInfo {
    token?: string;
    user?: IUser;
    ancestry?: IAncestry
}

export interface IUser {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    status: boolean;
    ancestry: IAncestry;
    checklist: IChecklist[];
    areParents: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface IEmail {
    email: string;
}


