import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { IAncestryData, IEmail } from "@/interface/User"

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

export type RemoveUserActionPropsType = {
    id: string;
    token: string;
    router: AppRouterInstance;
}