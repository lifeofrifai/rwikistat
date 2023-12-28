import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/welcome';
import SignInScreen from '../screens/auth/signIn';
import ROUTES from '../constans/routes';
import TabNavigator from './TabNavigator';

const Stack = createStackNavigator();

function AuthNavigator() {
    console.log(Stack);
    return (
        <Stack.Navigator
            screenOptions={{headerShown: false}} 
            initialRouteName='Welcome'
        >
            <Stack.Screen name={ROUTES.WELCOME} component={WelcomeScreen} />
            <Stack.Screen name={ROUTES.SIGN_IN} component={SignInScreen} />
            <Stack.Screen name={ROUTES.MODUL} component={TabNavigator} />
        </Stack.Navigator>
    );
}

export default AuthNavigator;