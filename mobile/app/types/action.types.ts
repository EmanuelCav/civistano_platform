import { IAncestryData, ICode, IEmail } from "../interface/User"
import { StackNavigation } from "./props.types";

export type GetEmailActionPropsType = {
    data: IEmail;
    id: string;
    navigate: StackNavigation;
    setIsEmail: (isEmail: boolean) => void;
}

export type GetUserActionPropsType = {
    navigate: StackNavigation;
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
    navigate: StackNavigation;
}

export type LoginUserActionPropsType = {
    emailData: IEmail
    setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export type CodeUserActionPropsType = {
    codeData: ICode
    navigate: StackNavigation;
    token: string;
}