import React from 'react'
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

import Container from './Container';

import Home from './app/screens/Home';
import Auth from './app/screens/Auth';
import Questionnaire from './app/screens/Questionnaire';
import Panel from './app/screens/Panel';
import Profile from './app/screens/Profile';
import Loading from './app/components/response/Loading';

import { store } from "./app/server/store";

const persistor = persistStore(store)

const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent'
  },
};

export default function App() {
  return (
    <NavigationContainer theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Container>
            <Loading />
            <StatusBar backgroundColor='#5cc197' style='light' />
            <Stack.Navigator initialRouteName="Home" screenOptions={{
              headerShown: false
            }}>
              <Stack.Screen name="Home" component={Home} options={{
                animation: 'flip'
              }} />
              <Stack.Screen name="Auth" component={Auth} options={{
                animation: 'flip'
              }} />
              <Stack.Screen name="Questionnaire" component={Questionnaire} options={{
                animation: 'flip'
              }} />
              <Stack.Screen name="Profile" component={Profile} options={{
                animation: 'flip'
              }} />
              <Stack.Screen name="Panel" component={Panel} options={{
                animation: 'flip'
              }} />
            </Stack.Navigator>
          </Container>
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
}
