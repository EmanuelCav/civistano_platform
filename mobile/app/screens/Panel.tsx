import { View, Button, Alert, Linking } from 'react-native';

import { generalStyles } from '../styles/general.styles';

const Panel = () => {
    const openWebsite = async (url: string) => {
        try {
            const supported = await Linking.canOpenURL(url)

            if (supported) {
                await Linking.openURL(url)
            } else {
                Alert.alert("Error", "No se puede abrir la URL: " + url)
            }
        } catch (error) {
            Alert.alert("Error", "Ocurrió un problema al intentar abrir la URL.")
        }
    }

    return (
        <View style={generalStyles.containerGeneral}>
            <Button
                title="Abrir Página Web"
                onPress={() => openWebsite('https://civistano.vercel.app')}
                color="#007BFF"
            />
        </View>
    )
}

export default Panel;
