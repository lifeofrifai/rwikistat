import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/welcome';
import SignInScreen from '../screens/auth/signIn';
import ROUTES from '../constans/routes';
import TabNavigator from './TabNavigator';
import MyPostScreen from '../screens/tab/settings/myPost';
import BookmarksScreen from '../screens/tab/settings/bookmarks';
import AboutScreen from '../screens/tab/settings/about';
import OutputScreen from '../screens/tab/compiler/output';
import ChatBotScreen from '../screens/tab/modul/chatBot';
import ModulDetailScreen from '../screens/tab/modul/detailModul';
import AskForumScreen from '../screens/tab/forum/askForum';
import DetailForumScreen from '../screens/tab/forum/detailForum';
import UserProfileScreen from '../screens/tab/forum/profile';

const Stack = createStackNavigator();

function AuthNavigator() {
    console.log(Stack);
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: true,
                headerStyle: {
                    backgroundColor: "#fff",
                },
                headerTitleStyle: {
                    color: "#00726B",
                },
            }} 
            initialRouteName='Welcome'
        >
            <Stack.Group>
                <Stack.Screen name={ROUTES.WELCOME} options={{headerShown: false}} component={WelcomeScreen} />
                <Stack.Screen name={ROUTES.SIGN_IN} options={{headerShown: false}} component={SignInScreen} />
                <Stack.Screen name={ROUTES.MODUL} options={{headerShown: false}} component={TabNavigator} />
                <Stack.Screen name={ROUTES.SETTING_MYPOST} component={MyPostScreen} />
                <Stack.Screen name={ROUTES.SETTING_BOOKMARK} component={BookmarksScreen} />
                <Stack.Screen name={ROUTES.SETTING_ABOUT} component={AboutScreen} />
                <Stack.Screen name={ROUTES.COMPILER_OUTPUT} component={OutputScreen} />
                <Stack.Screen name={ROUTES.MODUL_DETAIL} component={ModulDetailScreen} />
                <Stack.Screen name={ROUTES.DETAIL_FORUM} component={DetailForumScreen} />
                <Stack.Screen name={ROUTES.USER_PROFILE} component={UserProfileScreen} />
            </Stack.Group>
            <Stack.Group screenOptions={{presentation: 'modal'}}>
                <Stack.Screen name={ROUTES.CHAT_BOT} component={ChatBotScreen}/>
                <Stack.Screen name={ROUTES.ASK_FORUM} component={AskForumScreen}/>
            </Stack.Group>
        </Stack.Navigator>
    );
}

export default AuthNavigator;