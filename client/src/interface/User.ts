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
    Ancestry: IAncestry;
    Checklist: IChecklistUser[];
    Firstname: string;
    Lastname: string;
    Weddings: number;
    Divorces: number;
    Children: number;
    Death: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface IChecklistUser {
    _id: string;
    user: IUser;
    isChecked: boolean;
    checkList: IChecklist;
    createdAt: string;
    updatedAt: string;
}

export interface IEmail {
    email: string;
}


