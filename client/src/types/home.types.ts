import { Dispatch } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { IStep, ITab } from "@/interface/General";

export type SectionPropsType = {
    title: string;
    tabs: ITab[]
}

export type ReturnPropsType = {
    text: string;
    func: () => void;
    title: string;
}

export type RegisterPropsType = {
    dispatch: Dispatch<any>;
    router: AppRouterInstance;
    setIsEmail: (isEmail: boolean) => void;
}

export type StepProccessPropsType = {
    step: IStep;
    index: number;
}