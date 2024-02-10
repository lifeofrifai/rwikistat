import React, { useEffect, useState} from "react";
import { NativeWindStyleSheet } from "nativewind";
import { View, Text, Image } from "react-native";
import SettingButton from "./button/SettingButton";
import auth from '@react-native-firebase/auth';
import { UserAuth } from '../context/authContext';
import {useNavigation} from '@react-navigation/native';
import ROUTES from "../constans/routes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StarRating from "./StarRating";
import MaterialIcons  from "react-native-vector-icons/MaterialIcons";

NativeWindStyleSheet.setOutput({
    default: "native",
});

export default () => {
    const navigation = useNavigation();
    // const {user, logOut} = UserAuth();
    const photoURL = user?.photoURL || '';
    const [loading, setLoading] = useState(true);
    

    const signOut = async () => {
        try {
          await auth().signOut();
          
          await AsyncStorage.removeItem('userToken');
          console.log('User signed out!');
          navigation.navigate(ROUTES.SIGN_IN);
        } catch (error) {
          console.error('Error signing out:', error);
        }
      };
      

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
                
                <View className="flex-row gap-x-3 py-5 items-center">
                    <Image
                        source={{
                            uri: photoURL
                        }}
                        className="w-[70] h-[70] rounded-md"
                    />
                    <View className="justify-center">
                        <Text className="font-bold text-gray-700 text-2xl">
                            {user?.displayName}
                        </Text>
                        {user?.verivied ? (<MaterialIcons name="verified" size={18} color={"#00726B"} className="ml-3"/>) : ("")  }
                        <Text className="text-gray-400 text-base">
                            {user?.email}
                        </Text>
                        <View className="mt-2">
                            <StarRating score={80}/>
                        </View>
                    </View>
                </View>
                
                
                <View className="h-[2] bg-gray-200 w-full rounded-full"/>
                <View className="py-5 gap-2">  
                    <SettingButton
                        icon="chatbox"
                        title="Postingan Saya"
                        iconColor="#323232"
                        onPress={() => navigation.navigate(ROUTES.SETTING_MYPOST)}                   
                    />
                    <SettingButton
                        icon="bookmarks"
                        title="Tersimpan"
                        iconColor="#323232"
                        onPress={() => navigation.navigate(ROUTES.SETTING_BOOKMARK)}                        
                    />
                </View>
                <View className="h-[2] bg-gray-200 w-full rounded-full"/>
                <View className="py-5 gap-2" >  
                    <SettingButton
                        icon="information-circle"
                        title="Tentang RwikiStat"
                        iconColor="#323232"
                        onPress={() => navigation.navigate(ROUTES.SETTING_ABOUT)}                    
                    />
                    <SettingButton
                        icon="exit"
                        title="Keluar"
                        iconColor="#B63838"
                        onPress={signOut}                   
                    />
                </View>
            </View>
        </View>
    );
}