import { Dimensions, StyleSheet } from "react-native";

export const authStyles = StyleSheet.create({
    titleAuth: {
        fontSize: Dimensions.get("window").height / 31,
        fontWeight: 'bold',
        marginBottom: Dimensions.get("window").height / 37,
        color: '#333333',
    },

    containAuth: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    labelCode: {
        fontSize: Dimensions.get("window").height / 41,
        marginBottom: Dimensions.get("window").height / 37,
        textAlign: "center",
    },

    codeContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: Dimensions.get("window").height / 74,
    },

    inputCode: {
        width: Dimensions.get("window").width / 9,
        height: Dimensions.get("window").width / 9,
        borderWidth: 1,
        borderColor: "#cccccc",
        borderRadius: 8,
        textAlign: "center",
        fontSize: Dimensions.get("window").height / 41,
        marginHorizontal: Dimensions.get("window").width / 72,
    },

    reviewEmail: {
        marginVertical: Dimensions.get("window").height / 148,
        color: '#0369A1',
        textAlign: "center",
        fontSize: Dimensions.get("window").height / 47,
        fontWeight: '600',
        marginHorizontal: Dimensions.get("window").width / 72,
    }
});