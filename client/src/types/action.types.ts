import { IEmail } from "@/interface/User"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export type GetEmailActionPropsType = {
    data: IEmail;
    id: string;
    router: AppRouterInstance;
}