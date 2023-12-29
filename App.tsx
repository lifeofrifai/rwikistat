import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './src/navigations/AuthNavigator';
import messaging from '@react-native-firebase/messaging';
import { useEffect } from 'react';

export default function App() {

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  };

  const getToken = async () => {
    const token = await messaging().getToken();
    console.log("token:",token);
  };

  useEffect(() => {
    requestUserPermission();
    getToken();
  });

  return (
    <NavigationContainer>
        <AuthNavigator/>
    </NavigationContainer>
  );
};
