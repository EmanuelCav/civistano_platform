import { IAncestry } from "./General";

export interface IReducerUser {
    user: IUser;
    isLoggedIn: boolean;
}

export interface IUser {
    id?: number;
    status?: boolean;
    ancestry?: IAncestry;
}

