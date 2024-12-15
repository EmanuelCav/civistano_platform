import { Dimensions, StyleSheet } from 'react-native';

export const homeStyles = StyleSheet.create({

    containerHeaderHome: {
        height: '40%'
    },

    containerAuthHome: {
        flex: 1
    },

    containerButtonAuth: {
        justifyContent: 'space-evenly',
        flex: 1,
        alignItems: 'center'
    },

    titleButtonAuth: {
        fontSize: Dimensions.get("window").width * 0.05,
        fontWeight: '500'
    },

    buttonAuth: {
        padding: Dimensions.get("window").height / 74,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#597EEE',
        borderStyle: 'solid',
        borderWidth: 2,
        width: '100%',
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },

    textButtonAuth: {
        fontSize: Dimensions.get("window").width * 0.05,
        fontWeight: '500',
        marginBottom: Dimensions.get("window").height / 106
    }

})