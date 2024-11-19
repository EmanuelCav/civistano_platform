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

export type CreateAncestryUserPropsType = {
    id: string;
    token: string;
    setIsCompleteAncestry: (isCompleteAncestry: boolean) => void;
}

export type UpdateAncestryUserPropsType = {
    id: string;
    userData: IAncestryData;
    token: string;
    setIsUpdateProfile: (isUpdateProfile: boolean) => void;
}