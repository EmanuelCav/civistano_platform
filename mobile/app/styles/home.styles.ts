import { Dimensions, StyleSheet } from 'react-native';

export const homeStyles = StyleSheet.create({

    containerHeaderHome: {
        height: '12%',
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
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginVertical: 8,
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
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 16,
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
        height: '30%',
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
        fontWeight: '500'
    },

    linkHome: {
        color: '#007bff',
        fontWeight: '500',
        marginTop: Dimensions.get("window").height / 106,
        fontSize: Dimensions.get("window").height / 41
    },

    buttonAuth: {
        marginTop: Dimensions.get("window").height / 106,
        padding: Dimensions.get("window").height / 74,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        borderRadius: 8,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },

    textButtonAuth: {
        fontSize: Dimensions.get("window").height / 39,
        fontWeight: '500',
        color: '#ffffff'
    }

})