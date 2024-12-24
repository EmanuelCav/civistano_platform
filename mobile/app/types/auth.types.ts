import { Dispatch } from "react";

import { StackNavigation } from "./props.types";

export type CodeFormPropsType = {
    router: StackNavigation;
    dispatch: Dispatch<any>;
    token: string;
}