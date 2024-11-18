import { Dispatch } from "react";

import { IAncestry } from "@/interface/General";
import { IAncestryUser, IUser, IUserInfo } from "@/interface/User";

export type ProfileIncompletePropsType = {
    ancestryNumber: number;
    ancestors: IAncestry[];
    completeAncestry: (ancestryUpdateFemale: IAncestry, ancestryUpdateMale: IAncestry) => void;
}

export type ProfileAncestryPropsType = {
    ancestor: IAncestryUser;
    updateProfile: (ancestry: IAncestry) => void;
}

export type UpdateProfilePropsType = {
    dispatch: Dispatch<any>;
    user: IUser;
    ancestry?: IAncestry;
}

export type ButtonsAncestryPropsType = {
    isFemale: boolean; 
    isDisabled: boolean;
    ancestry?: IAncestry;
    ancestryMale?: IAncestry;
    handleFemale: (isUpdateFemale: boolean) => void;
}

export type CompleteAncestryPropsType = {
    ancestry?: IAncestry;
    ancestryMale?: IAncestry;
    mainAncestry: string;
    dispatch: Dispatch<any>;
    user: IUserInfo;
    setIsCompleteAncestry: (isCompleteAncestry: boolean) => void;
}