import { IQuestion } from "@/interface/Survey";
import { IReducerUser } from "@/interface/User";

export type NavItemPropsType = {
    text: string;
    link: string;
}

export type SurveyDataPropsType = {
    handleClose: () => void;
    handleShowQuestion: () => void;
}

export type ButtonsSurveyPropsType = {
    isDisabled: boolean;
    isYes: boolean;
    handleSelect: (value: boolean, id: number | undefined) => void;
    question: IQuestion;
}

export type QuestionPropsType = {
    setIsAdministrative: (isAdministrative: boolean) => void;
    setIsJudicial: (isJudicial: boolean) => void;
    setIsNotPossible: (isPossible: boolean) => void;
    setIsQuestion: (setIsQuestion: boolean) => void;
}

export type StartHeaderPropsType = {
    handleSurveyData: () => void;
    redirectProfile: () => void;
    user: IReducerUser;
    pathname: string;
}