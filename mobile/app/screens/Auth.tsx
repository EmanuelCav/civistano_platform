import { View } from "react-native"
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'

import CodeForm from "../components/auth/CodeForm";
import Outcome from "../components/general/Outcome";
import FormAuth from "../components/auth/FormAuth";

import { IReducer } from "../interface/General";
import { StackNavigation } from "../types/props.types";

import { generalStyles } from "../styles/general.styles";
import { authStyles } from "../styles/auth.styles";

import { selector } from "../server/reducer/selector";


const Auth = ({ navigation }: { navigation: StackNavigation }) => {

  const dispatch = useDispatch()

  const user = useSelector((state: IReducer) => selector(state).user)

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  return (
    <View style={generalStyles.containerGeneral}>
      {
        isLoggedIn && <CodeForm setIsLoggedIn={setIsLoggedIn} />
      }
      <View style={authStyles.containAuth}>
        <FormAuth dispatch={dispatch} setIsLoggedIn={setIsLoggedIn} />
        <Outcome func={() => navigation.navigate('Home')} question="¿Desea regresar?" text="Regresar" />
      </View>
    </View>
  )
}

export default Auth