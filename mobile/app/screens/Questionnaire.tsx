import { useState } from 'react'
import { View } from 'react-native'
import { useDispatch } from 'react-redux';

import TitleQuestionnaire from '../components/questionnaire/TitleQuestionnaire'
import Start from '../components/questionnaire/Start'
import Odds from '../components/questionnaire/Odds'
import Question from '../components/questionnaire/Question';
import Return from '../components/questionnaire/Return';
import Register from '../components/questionnaire/Register';

import { StackNavigation } from '../types/props.types'

import { generalStyles } from '../styles/general.styles'

const Questionnaire = ({ navigation }: { navigation: StackNavigation }) => {

    const dispatch = useDispatch()

    const [isQuestion, setIsQuestion] = useState<boolean>(false)

    const [isAdministrative, setIsAdministrative] = useState<boolean>(false)
    const [isJudicial, setIsJudicial] = useState<boolean>(false)
    const [isNotPossible, setIsNotPossible] = useState<boolean>(false)
    const [isEmail, setIsEmail] = useState<boolean>(false)

    const handleContinue = () => {
        setIsAdministrative(false)
        setIsJudicial(false)
        setIsNotPossible(false)
        setIsEmail(true)
    }

    const handleCancel = () => {
        setIsAdministrative(false)
        setIsJudicial(false)
        setIsNotPossible(false)
    }

    return (
        <View style={generalStyles.containerGeneral}>
            {
                isQuestion && <Question setIsAdministrative={setIsAdministrative}
                    setIsJudicial={setIsJudicial}
                    setIsNotPossible={setIsNotPossible}
                    setIsQuestion={setIsQuestion} />
            }
            {
                isAdministrative && <Return
                    title="Vía Administrativa"
                    text="Si tienes ascendencia italiana, es el camino más común para obtener la ciudadanía. Puede brindarse en casos de descendencia, matrimonio o naturalización."
                    func={handleContinue} />
            }
            {
                isJudicial && <Return
                    title="Vía Judicial"
                    text="Situaciones donde hay complicaciones con los documentos o si el solicitante no puede demostrar claramente su derecho a la ciudadanía."
                    func={handleCancel} />
            }
            {
                isNotPossible && <Return
                    title="Falta de Requisitos"
                    text="En ciertos casos, no es posible obtener la ciudadanía italiana. Esto puede ocurrir cuando no hay vínculo de ascendencia italiano válido o por renuncia a la ciudadania italiana."
                    func={handleCancel} />
            }
            {
                isEmail && <Register dispatch={dispatch} navigation={navigation} setIsEmail={setIsEmail} />
            }
            <TitleQuestionnaire />
            <Odds />
            <Start setIsQuestion={setIsQuestion} navigation={navigation} />
        </View>
    )
}

export default Questionnaire