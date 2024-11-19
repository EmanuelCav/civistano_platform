import { Dispatch } from "react";

import { IAncestry } from "@/interface/General";
import { IAncestryUser, IUpdateAncestry, IUserInfo } from "@/interface/User";
import { FieldError, UseFormRegister } from "react-hook-form";

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
    user: IUserInfo;
    ancestry?: IAncestry;
    setIsUpdateProfile: (isUpdateProfile: boolean) => void;
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

export type ButtonsUpdatePropsType = {
    isBoolean: boolean;
    func: (isFunc: boolean) => void;
    question: string;
}

export type InputUpdatePropsType = {
    error?: FieldError
    register: UseFormRegister<IUpdateAncestry | any>;
    text: string;
    question: string;
}