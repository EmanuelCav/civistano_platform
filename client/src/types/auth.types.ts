import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { Dispatch } from "react";

export type CodeFormPropsType = {
    router: AppRouterInstance;
    dispatch: Dispatch<any>;
    token: string;
}