import React from 'react';
import { Pressable, Text, TextInput } from 'react-native'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { generalStyles } from '../../styles/general.styles'
import { authStyles } from '../../styles/auth.styles'

import { IEmail } from '../../interface/User'
import { FormAuthPropsType } from '../../types/auth.types';

import { loginUser } from '../../server/actions/user.action'

import { emailSchema } from '../../schema/user.schema'

const FormAuth = ({ dispatch, setIsLoggedIn }: FormAuthPropsType) => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(emailSchema),
    })

    const handleSumbitLogin = () => {
        reset()
        setIsLoggedIn(true)
        // dispatch(loginUser({
        //     emailData: data,
        //     setIsLoggedIn
        // }) as any)
    }

    return (
        <>
            <Text style={authStyles.titleAuth}>Iniciar Sesión</Text>
            {
                errors.email && <Text></Text>
            }
            <TextInput
                {...register("email")}
                style={generalStyles.input}
                placeholder="Correo electrónico"
                placeholderTextColor="#aaaaaa"
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <Pressable style={({ pressed }) => [
                {
                    backgroundColor: pressed ? '#1f8eff' : '#007bff'
                },
                generalStyles.buttonContinue
            ]} onPress={handleSumbitLogin}>
                <Text style={generalStyles.textButtonContinue}>Ingresar</Text>
            </Pressable>
        </>
    )
}

export default FormAuth