import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native"

import ContainerBackground from "../general/ContainerBackground"
import Outcome from "../general/Outcome";

import { CodeFormPropsType } from "../../types/auth.types";

import { authStyles } from "../../styles/auth.styles";
import { generalStyles } from "../../styles/general.styles";

const CodeForm = ({ setIsLoggedIn }: CodeFormPropsType) => {
    
    const [code, setCode] = useState<string>("");

    const handleChange = (text: string) => {
        if (/^\d{0,6}$/.test(text)) {
            setCode(text);
        }
    };

    const showCode = () => {
        console.log(code);
    }

    return (
        <ContainerBackground>
            <Text style={authStyles.reviewEmail}>Revisa tu correo electrónico</Text>
            <Text style={authStyles.labelCode}>Ingrese el código de 6 dígitos</Text>
            <View style={authStyles.codeContainer}>
                {Array.from({ length: 6 }).map((_, index) => (
                    <TextInput
                        key={index}
                        style={authStyles.inputCode}
                        value={code[index] || ""}
                        maxLength={1}
                        keyboardType="number-pad"
                        onChangeText={(text) => {
                            const newCode = code.split("")
                            newCode[index] = text;
                            setCode(newCode.join(""))
                        }}
                    />
                ))}
            </View>
            <Pressable style={({ pressed }) => [
                {
                    backgroundColor: pressed ? '#1f8eff' : '#007bff'
                },
                generalStyles.buttonContinue
            ]} onPress={showCode}>
                <Text style={generalStyles.textButtonContinue}>Aceptar</Text>
            </Pressable>
            <Outcome func={() => setIsLoggedIn(false)} question="¿Desea regresar?" text="Regresar" />
        </ContainerBackground>
    );
};

export default CodeForm