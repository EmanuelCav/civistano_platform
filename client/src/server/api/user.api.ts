import { api } from "./api"

import { IEmail, IUpdateAncestry, IUser, IUserInfo } from "@/interface/User"

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

export const getUserApi = async (id: string, token: string): Promise<IUserInfo> => {

    const response = await fetch(api + "/users/" + id, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data)
    }

    return data
}

export const createAncestryUserApi = async (id: string, token: string): Promise<IUser> => {

    const response = await fetch(api + "/users/ancestors/" + id, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data)
    }

    return data.user
}

export const updateAncestryUserApi = async (userData: IUpdateAncestry, id: string, token: string): Promise<IUser> => {

    const response = await fetch(api + "/users/ancestors/" + id, {
        method: 'PUT',
        body: JSON.stringify(userData),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data)
    }

    return data.user
}

export const removeUserApi = async (id: string, token: string): Promise<string> => {

    const response = await fetch(api + "/users/" + id, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data)
    }

    return data.message

}