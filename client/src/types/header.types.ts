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
    handleSelect: (value: boolean) => void
}