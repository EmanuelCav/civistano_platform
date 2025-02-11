import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Panel from './Panel'
import Profile from './Profile'

const Tab = createBottomTabNavigator();

const PrivateScreen = () => {
    return (
        <Tab.Navigator initialRouteName="Panel">
            <Tab.Screen name="Panel" component={Panel} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    )
}

export default PrivateScreen