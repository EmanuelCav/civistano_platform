import { Dispatch } from "react";

import { StackNavigation } from "./props.types"

export type StartPropsType = {
    navigation: StackNavigation;
}

export type ReturnPropsType = {
    title: string;
    text: string;
    func: () => void;
}

export type RegisterPropsType = {
    dispatch: Dispatch<any>;
    navigation: StackNavigation;
    setIsEmail: (isEmail: boolean) => void;
}

export type QuestionPropsType = {
    setIsAdministrative: (isAdministrative: boolean) => void;
    setIsJudicial: (isJudicial: boolean) => void;
    setIsNotPossible: (isNotPosible: boolean) => void;
    setIsQuestion: (isQuestion: boolean) => void;
}