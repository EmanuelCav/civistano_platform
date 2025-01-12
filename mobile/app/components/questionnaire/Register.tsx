import { Pressable, Text, TextInput, View } from 'react-native'
import { Controller, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux';
import { yupResolver } from "@hookform/resolvers/yup";

import ContainerBackground from '../general/ContainerBackground'

import { getEmail } from '../../server/actions/user.action';
import { selector } from '../../server/reducer/selector';

import { IReducer } from '../../interface/General';
import { IEmail } from '../../interface/User';
import { RegisterPropsType } from '../..//types/questionnnaire.types';

import { questionnaireStyles } from '../../styles/questionnaire.styles';
import { generalStyles } from '../../styles/general.styles';

import { emailSchema } from '../../schema/user.schema';

const Register = ({ dispatch, setIsEmail, navigation }: RegisterPropsType) => {

    const user = useSelector((state: IReducer) => selector(state).user)

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(emailSchema),
        defaultValues: { email: '' },
    })

    const handleSumbitRegister = (data: IEmail) => {
        dispatch(getEmail({
            data,
            id: user.user.ancestry?._id!,
            navigate: navigation,
            setIsEmail
        }))
    }

    return (
        <ContainerBackground>
            <View style={questionnaireStyles.containFormQuestionnaire}>
                <Text style={questionnaireStyles.titleFormQuestionnaire}>Dirrección de correo electrónico</Text>
                {
                    errors.email && <Text style={generalStyles.errorMessage} >{errors.email!.message}</Text>
                }
                <Controller
                    name="email"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={[
                                generalStyles.input,
                                errors.email && { borderColor: 'red', borderWidth: 1 },
                            ]}
                            placeholder="Correo electrónico"
                            placeholderTextColor="#aaaaaa"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                        />
                    )}
                />

                <Pressable style={({ pressed }) => [
                    {
                        backgroundColor: pressed ? '#1f8eff' : '#007bff'
                    },
                    generalStyles.buttonContinue
                ]} onPress={handleSubmit(handleSumbitRegister)}>
                    <Text style={generalStyles.textButtonContinue}>ACEPTAR</Text>
                </Pressable>
            </View>
        </ContainerBackground>
    )
}

export default Register