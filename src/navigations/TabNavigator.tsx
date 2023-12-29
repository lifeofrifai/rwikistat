import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ModulScreen from '../screens/tab/modul';
import SettingsScreen from '../screens/tab/setting';
import CompilerScreen from '../screens/tab/compiler';
import ForumScreen from '../screens/tab/forum';
import ROUTES from '../constans/routes';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons  from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo  from 'react-native-vector-icons/Entypo';

const Tab = createBottomTabNavigator();

function AuthNavigator() {
    const navigation = useNavigation();

    console.log(Tab);
    return (
        <Tab.Navigator 
            screenOptions={{
            headerShown: true,
            headerStyle: {
                backgroundColor: "#fff",
            },
            headerTitleStyle: {
                color: "#00726B",
                fontWeight: 'bold',
            },
            tabBarStyle: {
                backgroundColor: "#fff",
            },
            tabBarActiveTintColor: "#00726B",
            tabBarInactiveTintColor: "#A4A4A4",
            }}
        >
            <Tab.Screen 
                name={ROUTES.MODUL} 
                component={ModulScreen} 
                options={{
                    tabBarIcon: ({ color }) => <MaterialIcons name="menu-book" size={26} color={color} />,
                }}
            />
            <Tab.Screen
                name={ROUTES.COMPILER} 
                component={CompilerScreen}
                options={{
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="code-array" size={26} color={color} />,
                }} 
            />
            <Tab.Screen 
                name={ROUTES.FORUM} 
                component={ForumScreen} 
                options={{
                    tabBarIcon: ({ color }) => <Entypo name="chat" size={26} color={color} />,
                }}
            />
            <Tab.Screen 
                name={ROUTES.SETTING}
                component={SettingsScreen} 
                options={{
                    tabBarIcon: ({ color }) => <MaterialIcons name="settings" size={26} color={color} />,
                }}
            />
        </Tab.Navigator>
    );
}

export default AuthNavigator;