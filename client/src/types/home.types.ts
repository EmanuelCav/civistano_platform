import { Dispatch } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { ITab } from "@/interface/General";

export type SectionPropsType = {
    title: string;
    tabs: ITab[]
}

export type ReturnPropsType = {
    text: string;
    func: () => void;
}

export type RegisterPropsType = {
    dispatch: Dispatch<any>;
    router: AppRouterInstance;
}