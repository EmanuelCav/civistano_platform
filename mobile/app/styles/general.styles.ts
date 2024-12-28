import { Dimensions, StyleSheet } from 'react-native';

export const generalStyles = StyleSheet.create({

    containerGeneral: {
        flex: 1,
        padding: Dimensions.get("window").height / 74
    },

    input: {
        width: '100%',
        height: Dimensions.get("window").height / 15,
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 8,
        paddingHorizontal: Dimensions.get("window").width / 36,
        marginBottom: Dimensions.get("window").height / 50,
        fontSize: Dimensions.get("window").height / 46,
        backgroundColor: '#ffffff',
    },

    buttonContinue: {
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

    textButtonContinue: {
        fontSize: Dimensions.get("window").height / 39,
        fontWeight: '500',
        color: '#ffffff'
    },

    containerBackground: {
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 12,
        top: 0,
        left: 0,
        width: '100%',
        height: Dimensions.get("window").height,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },

    cardBackground: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: Dimensions.get("window").width / 36
    }

})