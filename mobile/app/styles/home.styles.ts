import { Dimensions, StyleSheet } from 'react-native';

export const homeStyles = StyleSheet.create({

    containerHeaderHome: {
        height: '8%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    containerInfoHome: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    containTabHome: {
        flexDirection: 'row',
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: Dimensions.get("window").height / 47,
        marginVertical: Dimensions.get("window").height / 92,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },

    logoHome: {
        width: Dimensions.get("window").width / 7,
        height: Dimensions.get("window").height / 50,
        borderRadius: 25
    },

    textContainerHome: {
        flex: 1,
    },

    titleTab: {
        fontSize: Dimensions.get("window").height / 47,
        fontWeight: 'bold',
        marginBottom: Dimensions.get("window").height / 185,
        color: '#0369A1'
    },

    descriptionTab: {
        fontSize: Dimensions.get("window").height / 52,
        color: '#444444',
    },

    containerAuthHome: {
        height: '28%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column'
    },

    containerButtonAuth: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%'
    },

    containerTextLoginHome: {
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginTop: Dimensions.get("window").height / 74,
        width: '100%'
    },

    textHeaderHome: {
        fontSize: Dimensions.get("window").height / 33,
        fontWeight: '500'
    },

    colourTitleHeaderHome: {
        color: '#0369A1',
        fontWeight: '500'
    },

    titleButtonAuth: {
        fontSize: Dimensions.get("window").height / 37,
        fontWeight: '500',
        color: '#333333'
    },

    linkHome: {
        color: '#007bff',
        fontWeight: '500',
        marginTop: Dimensions.get("window").height / 106,
        fontSize: Dimensions.get("window").height / 41
    }

})