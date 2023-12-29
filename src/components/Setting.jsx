import React, { useEffect, useState} from "react";
import { NativeWindStyleSheet } from "nativewind";
import { View, Text, Image } from "react-native";
import SettingButton from "./button/SettingButton";
import { UserAuth } from '../context/authContext';

NativeWindStyleSheet.setOutput({
    default: "native",
});

export default () => {
    const {user, logOut} = UserAuth();
    const photoURL = user?.photoURL || '';
    const [loading, setLoading] = useState(true);
    const handleSignOut = async() => { 
        try {
            await logOut();
        } catch (error) {
            console.log(error);
        }}

        useEffect(() => {
            const checkUser = async() => {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                setLoading(false);
            }
            checkUser();
        }, [user]);

        const getCurrentUser = async () => {
            const currentUser = GoogleSignin.getCurrentUser();
            setState({ currentUser });
          };

    return (
        <View className="flex-1 items-center bg-[#EBEBEB] ">
            <View className="bg-white w-full mt-2 px-5 py-2 ">
                {user && (
                <View className="flex-row gap-x-3 py-5">
                    <Image
                        source={photoURL}
                        className="w-[70] h-[70] rounded-md bg-blue-200"
                    />
                    <View className="justify-center">
                        <Text className="font-bold text-gray-700 text-2xl">
                        {user.displayName}
                        </Text>
                        <Text className="text-gray-400 text-base">
                        {user.email}
                        </Text>
                    </View>
                </View>
                )}
                
                <View className="h-[2] bg-gray-200 w-full rounded-full"/>
                <View className="py-5 gap-2">  
                    <SettingButton
                        icon="chatbox"
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
                        icon="exit"
                        title="Keluar"
                        iconColor="#B63838"
                        onPress={handleSignOut}                   
                    />
                </View>
            </View>
        </View>
    );
}