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
    ancestry: IAncestryUser[];
    checklist: IChecklist[];
    areParents: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface IAncestryUser {
    _id: string;
    ancestry: IAncestry;
    checklist: IChecklistUser[];
    firstname: string;
    lastname: string;
    weddings: number;
    divorces: number;
    children: number;
    death: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface IChecklistUser {
    _id: string;
    user: IUser;
    isChecked: boolean;
    checklist: IChecklist;
    createdAt: string;
    updatedAt: string;
}

export interface IEmail {
    email: string;
}

export interface ICode {
    code: string;
}

export interface IUpdateAncestry {
    weddings?: number | null;
    divorces?: number| null;
    children?: number| null;
}

export interface IAncestryData {
    weddings: number;
    divorces: number;
    children: number;
    death: boolean;
}


