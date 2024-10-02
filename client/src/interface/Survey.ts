export interface IReducerSurvey {
    question: IQuestion;
}

export interface IQuestion {
    question?: string;
    isAdministrative?: boolean;
    no?: IQuestion;
    yes?: IQuestion;
}

