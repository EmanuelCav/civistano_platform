import { Dispatch, SetStateAction } from "react";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { IAncestry } from "../../interface/General";

import * as ancestryApi from "../api/ancestry.api";

export const getAncestors = createAsyncThunk("ancestry/get", async (setAncestors: Dispatch<SetStateAction<IAncestry[]>>) => {

    try {

        const data = await ancestryApi.getAncestorsApi()

        setAncestors(data)

    } catch (error) {
        console.log(error);
    }

})