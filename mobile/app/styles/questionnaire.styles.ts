import { StyleSheet, Dimensions } from 'react-native';

export const questionnaireStyles = StyleSheet.create({

    containerTitleQuestionnaire: {
        height: '15%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    containerStart: {
        height: '28%'
    },

    containerOdds: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    titleOdds: {
        color: "#0369A1",
        fontWeight: '600',
        fontSize: Dimensions.get("window").height / 33
    },

    titleQuestionnaire: {
        fontSize: Dimensions.get("window").height / 47,
        fontWeight: '600',
        textAlign: 'center',
        color: '#333333'
    }

})