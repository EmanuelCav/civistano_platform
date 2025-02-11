import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

export type RoutesProps = {
    Home: undefined;
    Questionnaire: undefined;
    Auth: undefined;
    PrivateScreen: undefined;
};

export type RoutesPropsTab = {
    Panel: undefined;
    Profile: undefined;
};

export type StackNavigation = NativeStackNavigationProp<RoutesProps>;
export type StackNavigationTab = BottomTabNavigationProp<RoutesPropsTab>;