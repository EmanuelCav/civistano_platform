import { Dispatch, SetStateAction } from "react";
import { createAsyncThunk } from "@reduxjs/toolkit";

import * as ancestryApi from "../api/ancestry.api";

import { IAncestry } from "@/interface/General";

import { dangerMessage } from "@/helper/message";

export const getAncestors = createAsyncThunk("ancestry/get", async (setAncestors: Dispatch<SetStateAction<IAncestry[]>>) => {

    try {

        const data = await ancestryApi.getAncestorsApi()

        setAncestors(data)

    } catch (error) {
        console.log(error);
        dangerMessage("Error al obtener los ancestros")
    }

})