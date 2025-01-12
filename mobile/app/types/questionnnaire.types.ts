import { Dispatch } from "react";

import { StackNavigation } from "./props.types"
import { IQuestion } from "../interface/Survey";

export type StartPropsType = {
    navigation: StackNavigation;
    setIsQuestion: (isQuestion: boolean) => void;
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

export type ButtonsSurveyPropsType = {
    isDisabled: boolean;
    isYes: boolean;
    handleSelect: (value: boolean, id: number | undefined) => void;
    question: IQuestion;
}