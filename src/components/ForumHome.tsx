
import { NativeWindStyleSheet } from "nativewind";
import { useEffect, useState } from "react";
import { View, Text, Image, Pressable, FlatList, RefreshControl, SafeAreaView, ActivityIndicator } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ToastProvider } from 'react-native-toast-notifications'
import { UserAuth } from "../context/authContext";
import axios from 'axios';
import ForumPost from "../components/ForumPost";
import API from "../../api.json";
import { useNavigation } from "@react-navigation/native";
import ROUTES from "../constans/routes";
import AsyncStorage from "@react-native-async-storage/async-storage";

NativeWindStyleSheet.setOutput({
    default: "native",
});

interface ForumData { 
    id: string;
    data: {
        userId: string;
        topics: string; 
        title:string;
        images: string[];
        likes: number;
        createdAt: {
            _seconds: number;
            _nanoseconds: number;
        };
    };
    user:{
        displayName: string;
        photoURL: string;
        verified: boolean;
    }
    commentCount: number;
}

export default () => {
    const {user} = UserAuth();
    const [forumData, setForumData] = useState<ForumData[]>([]);
    const [refreshing, setRefreshing] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    
    // const photoURL = user?.photoURL || '';

    useEffect(() => {
        // Memanggil fetchData untuk mengambil data awal
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const userToken = await AsyncStorage.getItem('userToken');
            fetch(API.address + '/api/forum/', {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            })
            .then((response) => response.json())
            .then((responJson)=>{
                setForumData(responJson.forumData);
                setRefreshing(false);
            })
        } catch (error) {
            console.error('Gagal mengambil data:', error);
        }
    };
    

    const onRefresh = () => {
        //Clear old data of the list
        setForumData([]);
        setRefreshing(true);
        //Call the Service to get the latest data
        fetchData();
    };

    const emptyList = () => {
        <View>
            <Text>
                Tidak ada data
            </Text>
        </View>
    }

    const currentForumData = forumData;
    const navigation = useNavigation();
    
    return (
        <ToastProvider>
        <View className="flex-1 items-center bg-[#EBEBEB] ">
            <SafeAreaView className="w-full mb-[70]">
                <View className=" w-full justify-center items-center bg-white px-4 py-2 mt-2" >
                    <Pressable
                        className=" rounded-md w-full border border-gray-400 justify-center  bg-white h-10"
                        onPress={() => navigation.navigate(ROUTES.ASK_FORUM)}    
                    >
                        <Text className="text-gray-400 ml-5 " >
                            Tanyakan sesuatu disini....
                        </Text>
                    </Pressable>
                </View>
                {refreshing ? (
                    <View className="mt-48 items-center justify-center flex-1 ">
                        <ActivityIndicator size="large" color="#00726B"/>
                    </View>
                ) : (
                    <FlatList
                        refreshControl={
                            <RefreshControl 
                                refreshing={refreshing} 
                                onRefresh={onRefresh} 
                            />
                        }
                        data={currentForumData}
                        renderItem={({ item }) => (
                            <ForumPost
                                key={item.id}
                                imageProfile={item.user.photoURL}
                                namePost={item.user.displayName}
                                timePost={item.data.createdAt._seconds}
                                titlePost={item.data.title}
                                descPost={item.data.topics}
                                onPressPost={() => navigation.navigate(ROUTES.DETAIL_FORUM, { id: item.id })} 
                                onPressProfile={() => navigation.navigate(ROUTES.USER_PROFILE, { id: item.data.userId })}
                                imagePost={undefined}   
                                verified={item.user.verified}
                                id={item.id}
                                likes={item.data.likes}
                                comments={item.commentCount}    
                            />
                        )}
                    />
                )}
                
            </SafeAreaView>
        </View>
        </ToastProvider>
    );
}