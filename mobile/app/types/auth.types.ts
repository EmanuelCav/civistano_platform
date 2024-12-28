import { Dispatch } from "react";

export type FormAuthPropsType = {
    dispatch: Dispatch<any>;
    setIsLoggedIn: (isLoggedIn: boolean) => void
}

export type CodeFormPropsType = {
    setIsLoggedIn: (isLoggedIn: boolean) => void
}