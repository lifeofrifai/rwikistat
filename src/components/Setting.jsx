import React, { useEffect, useState} from "react";
import { NativeWindStyleSheet } from "nativewind";
import { View, Text, Image } from "react-native";
import SettingButton from "./button/SettingButton";
import {useNavigation} from '@react-navigation/native';
import ROUTES from "../constans/routes";
import auth from '@react-native-firebase/auth';


NativeWindStyleSheet.setOutput({
    default: "native",
});

export default () => {
    const [loading, setLoading] = useState(true);
    
    const navigation = useNavigation();

    const signOut = () => {
        auth()
        .signOut()
        .then(() => console.log('User signed out!'));
        navigation.navigate(ROUTES.SIGN_IN)
    }

    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    // Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) return null;

    return (
        <View className="flex-1 items-center bg-[#EBEBEB] ">
            <View className="bg-white w-full mt-2 px-5 py-2 ">
                
                <View className="flex-row gap-x-3 py-5">
                    <Image
                        source={undefined}
                        className="w-[70] h-[70] rounded-md"
                    />
                    <View className="justify-center">
                        <Text className="font-bold text-gray-700 text-2xl">
                        {user?.displayName}
                        </Text>
                        <Text className="text-gray-400 text-base">
                        {user?.email}
                        </Text>
                    </View>
                </View>
                
                
                <View className="h-[2] bg-gray-200 w-full rounded-full"/>
                <View className="py-5 gap-2">  
                    <SettingButton
                        icon="ios-chatbox"
                        title="Postingan Saya"
                        iconColor="#323232"
                        onPress={undefined}                      
                    />
                    <SettingButton
                        icon="bookmarks"
                        title="Tersimpan"
                        iconColor="#323232"
                        onPress={undefined}                    
                    />
                </View>
                <View className="h-[2] bg-gray-200 w-full rounded-full"/>
                <View className="py-5 gap-2" >  
                    <SettingButton
                        icon="information-circle"
                        title="Tentang RwikiStat"
                        iconColor="#323232"
                        onPress={undefined}                    
                    />
                    <SettingButton
                        icon="ios-exit"
                        title="Keluar"
                        iconColor="#B63838"
                        onPress={signOut}                   
                    />
                </View>
            </View>
        </View>
    );
}