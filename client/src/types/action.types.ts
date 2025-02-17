import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { IAncestryData, ICode, IEmail } from "@/interface/User"
import { IContact } from "@/interface/General";

export type GetEmailActionPropsType = {
    data: IEmail;
    id: string;
    router: AppRouterInstance;
    setIsEmail: (isEmail: boolean) => void;
}

export type GetUserActionPropsType = {
    router: AppRouterInstance;
    id: string;
    token: string;
}

export type CreateAncestryUserActionPropsType = {
    id: string;
    token: string;
    setIsCompleteAncestry: (isCompleteAncestry: boolean) => void;
}

export type UpdateAncestryUserActionPropsType = {
    id: string;
    userData: IAncestryData;
    token: string;
    setIsUpdateProfile: (isUpdateProfile: boolean) => void;
}

export type CheckAncestryUserActionPropsType = {
    aid: string;
    cid: string;
    token: string;
}

export type AddAncestryUserActionPropsType = {
    id: string;
    token: string;
    setIsRestart: (isRestart: boolean) => void;
}

export type RemoveAncestryUserActionPropsType = {
    token: string;
    setIsRemoveAncestry: (isRemoveAncestry: boolean) => void;
}

export type RestartAncestryUserActionPropsType = {
    token: string;
    setIsRestart: (isRestart: boolean) => void;
}

export type RemoveUserActionPropsType = {
    id: string;
    token: string;
    router: AppRouterInstance;
}

export type LoginUserActionPropsType = {
    emailData: IEmail
    setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export type CodeUserActionPropsType = {
    codeData: ICode
    router: AppRouterInstance;
    token: string;
}

export type ContactUserActionPropsType = {
    contactData: IContact;
    token: string;
}