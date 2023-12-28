import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ModulScreen from '../screens/tab/modul';
import SettingsScreen from '../screens/tab/setting';
import CompilerScreen from '../screens/tab/compiler';
import ForumScreen from '../screens/tab/forum';
import ROUTES from '../constans/routes';
import {useNavigation} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

function AuthNavigator() {
    const navigation = useNavigation();

    console.log(Tab);
    return (
        <Tab.Navigator>
            <Tab.Screen name={ROUTES.MODUL} component={ModulScreen} />
            <Tab.Screen name={ROUTES.COMPILER} component={CompilerScreen} />
            <Tab.Screen name={ROUTES.FORUM} component={ForumScreen} />
            <Tab.Screen name={ROUTES.SETTING} component={SettingsScreen} />
        </Tab.Navigator>
    );
}

export default AuthNavigator;