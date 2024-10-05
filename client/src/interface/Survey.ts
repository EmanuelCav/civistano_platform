export interface IReducerSurvey {
    question: IQuestion;
}

export interface IQuestion {
    question?: string;
    isAdministrative?: boolean;
    no?: number;
    yes?: number;
}

