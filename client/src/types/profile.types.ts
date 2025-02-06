import { Dispatch } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

import { IAncestry } from "@/interface/General";
import { IAncestryUser, IUpdateAncestry, IUserInfo } from "@/interface/User";

export type ProfileIncompletePropsType = {
    ancestryNumber: number;
    ancestors: IAncestry[];
    completeAncestry: (ancestryUpdateFemale: IAncestry, ancestryUpdateMale: IAncestry) => void;
}

export type ProfileAncestryPropsType = {
    ancestor: IAncestryUser;
    updateProfile: (ancestry: IAncestry) => void;
    removeAncestry: () => void;
    index: number;
}

export type UpdateProfilePropsType = {
    dispatch: Dispatch<any>;
    user: IUserInfo;
    ancestry?: IAncestry;
    index: number;
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
    upward: boolean;
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
    value: number;
}

export type ButtonDangerPropsType = {
    text: string;
    textButton: string;
    func: () => void;
    Icon: any;
}

export type DangerZonePropsType = {
    handleIsLogout: () => void;
    handleIsRestart: () => void;
    handleIsRemove: () => void;
    completeAncestry: (ancestryUpdateFemale: IAncestry, ancestryUpdateMale: IAncestry) => void;
    ancestors: IAncestry[];
    ancestryNumber: number;
    ancestor: IAncestry;
}

export type ButtonAddPropsType = {
    ancestryNumber: number;
    text: string;
    textButton: string;
    completeAncestry: (ancestryUpdateFemale: IAncestry, ancestryUpdateMale: IAncestry) => void;
    Icon: any;
    ancestors: IAncestry[];
}

export type SurePropsType = {
    text: string;
    func: () => void;
    handleClose: () => void;
}