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
import API from "../../api.json";

NativeWindStyleSheet.setOutput({
    default: "native",
});

export default () => {
    const navigation = useNavigation();
    // const {user, logOut} = UserAuth();
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
    const [score, setScore] = useState(null);

    const fetchScore = async () => {
        try {
            // Mendapatkan token dari localStorage atau sumber lainnya
            const userToken = await AsyncStorage.getItem('userToken');
            // Membuat header dengan menyertakan token

            if (user) {
                const uid = user.uid;
                // Mengirim request ke API
                fetch(API.address + `/api/user/${uid}/score`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                })

                .then((response) => response.json())
                .then((responJson)=>{
                    setScore(responJson.score);
                })
            }
        } catch (error) {
            console.error('Gagal mengambil data:', error);
        }
    }

    useEffect(() => {
        // Memanggil fetchData untuk mengambil data awal
        fetchScore();
        
      }, [user]);

      useEffect(() => {
        // Memanggil fetchData untuk mengambil data awal
        fetchDataUser();
    }, [user]);

    const [detailUser, setDetailUser] = useState(null);

    const fetchDataUser = async () => {
        if (user) {
            const id = user.uid;
            const userToken = await AsyncStorage.getItem('userToken');
            // Lakukan permintaan ke API untuk mendapatkan data detail modul berdasarkan ID
            fetch(API.address + `/api/user/${id}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Gagal mengambil data user.');
                    }
                    return response.json();
                })
                .then((data) => {
                    setDetailUser(data); // Menyimpan data detail modul dalam state
                })
                .catch((error) => {
                    console.error('There was an error!', error);
                });
        }
    }

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

    // console.log("is user verivied : ",detailUser.displayName);


    return (
        <View className="flex-1 items-center bg-[#EBEBEB] ">
            <View className="bg-white w-full mt-2 px-5 py-2 ">
                
                {/* <View className="flex-row gap-x-3 py-5 items-center">
                    <Image
                        source={{
                            uri: detailUser?.photoURL
                        }}
                        className="w-[70] h-[70] rounded-md"
                    />
                    <View className="justify-center">
                        <View className="flex-row items-center ">
                            <Text className="font-bold text-gray-700 text-2xl">
                                {detailUser.displayName}
                            </Text>
                            {detailUser?.verified ? (<MaterialIcons name="verified" size={22} color={"#00726B"} className="ml-5"/>) : ("")  }
                        </View>
                        <Text className="text-gray-400 text-base">
                            {detailUser?.email}
                        </Text>
                        <View className="mt-1">
                            <StarRating score={score}/>
                        </View>
                    </View>
                </View> */}
                
                
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