import { api } from "./api"

import { IEmail, IUserInfo } from "@/interface/User"

export const getEmailApi = async (emailData: IEmail, id: string): Promise<IUserInfo> => {

    const response = await fetch(api + "/users/ancestors/" + id, {
        method: 'POST',
        body: JSON.stringify(emailData),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data)
    }    

    return data
}