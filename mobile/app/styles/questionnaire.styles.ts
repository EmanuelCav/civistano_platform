import { StyleSheet, Dimensions } from 'react-native';

export const questionnaireStyles = StyleSheet.create({

    containerTitleQuestionnaire: {
        height: '15%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    containFormQuestionnaire: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    titleFormQuestionnaire: {
        fontSize: Dimensions.get("window").height / 41,
        fontWeight: 'bold',
        marginBottom: Dimensions.get("window").height / 37,
        color: '#333333',
        textAlign: 'center'
    },

    textFormQuestionnaire: {
        fontSize: Dimensions.get("window").height / 37,
        marginBottom: Dimensions.get("window").height / 37,
        color: '#333333',
        textAlign: 'center'
    },

    containerStart: {
        height: '20%'
    },

    containButtonsSurvey: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: Dimensions.get("window").height / 50
    },

    buttonSurvey: {
        borderRadius: 8,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
        width: '37.33%',
        padding: Dimensions.get("window").height / 74,
        justifyContent: 'center',
        alignItems: 'center',
    },

    textButtonSurvey: {
        fontSize: Dimensions.get("window").height / 39,
        fontWeight: '500',
        color: '#ffffff'
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