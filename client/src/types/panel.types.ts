import { Dispatch } from "react";

import { IChecklistUser } from "@/interface/User"

export type ChecklistPropsType = {
    item: IChecklistUser;
    dispatch: Dispatch<any>;
    aid: string;
    token: string;
}