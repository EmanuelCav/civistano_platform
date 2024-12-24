export interface IReducerSurvey {
    question: IQuestion;
}

export interface IQuestion {
    id?: number;
    question?: string;
    no?: number;
    yes?: number;
}

