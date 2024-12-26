import { Text, TextInput, TouchableOpacity, View, StyleSheet } from "react-native"

import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux'

// import HeaderLogin from "@/components/auth/HeaderLogin";
// import CodeForm from "@/components/auth/CodeForm";

import { IEmail } from "../interface/User";
import { IReducer } from "../interface/General";

import { generalStyles } from "../styles/general.styles";

import { loginUser } from "../server/actions/user.action";
import { selector } from "../server/reducer/selector";

import { emailSchema } from "../schema/user.schema";

const Auth = () => {

    const dispatch = useDispatch()

    const user = useSelector((state: IReducer) => selector(state).user)

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(emailSchema),
    })

    const handleSumbitLogin = (data: IEmail) => {
        dispatch(loginUser({
            emailData: data,
            setIsLoggedIn
        }) as any)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Iniciar Sesión</Text>

            <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                placeholderTextColor="#aaa"
                keyboardType="email-address"
                autoCapitalize="none"
                // value={email}
                // onChangeText={setEmail}
            />

            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor="#aaa"
                secureTextEntry
                // value={password}
                // onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Ingresar</Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <Text style={styles.link}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f9f9f9',
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#333',
    },
    input: {
      width: '100%',
      height: 50,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      paddingHorizontal: 10,
      marginBottom: 15,
      fontSize: 16,
      backgroundColor: '#fff',
    },
    button: {
      width: '100%',
      height: 50,
      backgroundColor: '#007bff',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      marginBottom: 10,
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    link: {
      color: '#007bff',
      marginTop: 10,
      textDecorationLine: 'underline',
    },
  });

export default Auth