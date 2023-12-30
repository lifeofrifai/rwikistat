import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyPost from '../screens/tab/settings/myPost';
import ROUTES from '../constans/routes';

const Stack = createStackNavigator();

function AuthNavigator() {
    console.log(Stack);
    return (
        <Stack.Navigator
            screenOptions={{headerShown: false}}
        >
            <Stack.Screen name={ROUTES.SETTING_MYPOST} component={MyPost} />
        </Stack.Navigator>
    );
}

export default AuthNavigator;