import React, { useEffect, useState} from "react";
import { NativeWindStyleSheet } from "nativewind";
import { View, Text, Image, unstable_batchedUpdates } from "react-native";
import SettingButton from "../../../components/button/SettingButton";
import auth from '@react-native-firebase/auth';
import { UserAuth } from '../../../context/authContext'
import {useNavigation} from '@react-navigation/native';
import ROUTES from "../../../constans/routes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StarRating from "../../../components/StarRating";
import ForumPost from "../../../components/ForumPost";
import { ToastProvider } from "react-native-toast-notifications";

NativeWindStyleSheet.setOutput({
    default: "native",
});

interface ProfileScreenProps {
    route: {
      params?: {
        userId?: string;
      };
    };
  }

  const ProfileScreen: React.FC<ProfileScreenProps> = ({ route }) => {
    const userId = route.params?.userId;
    console.log("id is",userId);
    if (userId === undefined) {
        // Handle the case where id is not available
        return (
            <View>
                <Text>Id is not available</Text>
            </View>
        );
    }
    console.log(userId);
    const navigation = useNavigation();
    


    return (
        <ToastProvider>
        <View className="flex-1 items-center bg-[#EBEBEB] ">
            <View className="bg-white w-full mt-2 px-5 py-2 ">
                
                <View className="flex-row gap-x-3 py-5 items-center">
                    <Image
                        source={undefined}
                        className="w-[70] h-[70] rounded-md bg-red-200"
                    />
                    <View className="justify-center">
                        <Text className="font-bold text-gray-700 text-2xl">
                            Test Profile
                        </Text>
                        <Text className="text-gray-400 text-base">
                            Haii@gmail.com
                        </Text>
                        <View className="mt-2">
                            <StarRating score={130}/>
                        </View>
                    </View>
                </View>
                
                
                <View className="h-[2] bg-gray-200 w-full rounded-full"/>
                <View className="py-2 gap-2"> 
                    <View className="py-2 px-20  items-center rounded-full">
                        <Text className="text-base">5 Post In Forum</Text> 
                    </View>
                </View>
            </View>
            <ForumPost 
                imageProfile={undefined}
                namePost="Muahmmadasd"
                timePost="{undefined}"
                titlePost="{undefined} "
                descPost="{undefined} asdsad asdandjkasnda"
                onPressPost={undefined}
                onPressProfile={undefined}
                imagePost={undefined}
                verified={false}
                id={undefined}
                likes={undefined}
                comments={undefined}                    
            />
        </View>
        </ToastProvider>
    );
}

export default ProfileScreen;