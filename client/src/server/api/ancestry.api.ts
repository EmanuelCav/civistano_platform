import { api } from "./api"

import { IAncestry } from "@/interface/General"

export const getAncestorsApi = async (): Promise<IAncestry[]> => {

    const response = await fetch(api + "/ancestors")

    const data = await response.json()

    if (!response.ok) {
        throw data.message
    }    

    return data.ancestors
}