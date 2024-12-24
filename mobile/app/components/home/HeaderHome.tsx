import { Text, View } from "react-native"

import { homeStyles } from "../../styles/home.styles"

const HeaderHome = () => {
    return (
        <View style={homeStyles.containerHeaderHome}>
            <Text style={homeStyles.textHeaderHome}>¡Bienvenido a
                <Text style={homeStyles.colourTitleHeaderHome}>Civistano</Text>
                !</Text>
        </View>
    )
}

export default HeaderHome