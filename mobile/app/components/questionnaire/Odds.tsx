import { Text, View } from 'react-native'

import Odd from './components/Odd'

import { IFeature } from '../../interface/General'

import { questionnaireStyles } from '../../styles/questionnaire.styles'

const ODDS: IFeature[] = [
  {
    title: 'Vía Administrativa',
    description: 'Si tienes ascendencia italiana, es el camino más común para obtener la ciudadanía. Puede brindarse en casos de descendencia, matrimonio o naturalización.',
    icon: 'assignment',
  },
  {
    title: 'Vía Judicial',
    description: 'Situaciones donde hay complicaciones con los documentos o si el solicitante no puede demostrar claramente su derecho a la ciudadanía.',
    icon: 'gavel',
  },
  {
    title: 'Falta de Requisitos',
    description: 'En ciertos casos, no es posible obtener la ciudadanía italiana. Esto puede ocurrir cuando no hay vínculo de ascendencia italiano válido o por renuncia a la ciudadania italiana.',
    icon: 'error',
  },
]

const Odds = () => {
    return (
        <View style={questionnaireStyles.containerOdds}>
          <Text style={questionnaireStyles.titleOdds}>Posibles resultados</Text>
            {
                ODDS.map((odd, index) => {
                    return <Odd odd={odd} key={index} />
                })
            }
        </View>
    )
}

export default Odds