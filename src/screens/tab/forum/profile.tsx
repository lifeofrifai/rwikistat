import React, { useEffect, useState} from "react";
import { NativeWindStyleSheet } from "nativewind";
import { View, Text, Image, unstable_batchedUpdates, FlatList } from "react-native";
import SettingButton from "../../../components/button/SettingButton";
import auth from '@react-native-firebase/auth';
import { UserAuth } from '../../../context/authContext'
import {useNavigation} from '@react-navigation/native';
import ROUTES from "../../../constans/routes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StarRating from "../../../components/StarRating";
import ForumPost from "../../../components/ForumPost";
import { ToastProvider } from "react-native-toast-notifications";
import API from "../../../../api.json";
import axios from "axios";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

NativeWindStyleSheet.setOutput({
    default: "native",
});

interface UserData {
    id: number;
    data: {
        displayName: string;
        email: string;
        photoURL: string;
        verified: boolean;
    };
}

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

interface ProfileScreenProps {
    route: {
        params?: {
            id?: string;
        };
    };
}

  const ProfileScreen: React.FC<ProfileScreenProps> = ({ route }) => {
    const userId = route.params?.id; 
    console.log("id is",userId);
    if (userId === undefined) {
        // Handle the case where id is not available
        return (
            <View>
                <Text>Id is not available</Text>
            </View>
        );
    }

    const [detailUser, setDetailUser] = useState<any>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalPosts, setTotalPosts] = useState(0);   
    const [forumData, setForumData] = useState<ForumData[]>([]);

    useEffect(() => {
        // Memanggil fetchData untuk mengambil data awal
        fetchDataUser();
    }, []);

    const fetchDataUser = async () => {
        if (userId) {
            const userToken = await AsyncStorage.getItem('userToken');
            // Lakukan permintaan ke API untuk mendapatkan data detail modul berdasarkan ID
            fetch(API.address + `/api/user/${userId}`, {
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

    useEffect(() => {
        fetchPosted(currentPage);
    }, [currentPage]);

    const currentPosted = forumData;
    const jumlahCurrentPosted = totalPosts;

    const fetchPosted = async (page: number | undefined) => { 
        try {
            const userToken = await AsyncStorage.getItem('userToken');

            fetch(API.address + `/api/forum/posted/${userId}?page=${page}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            })
            .then((response) => response.json())
            .then((responJson)=>{
                setForumData(responJson.forumData);
                setCurrentPage(responJson.currentPage);
                setTotalPages(responJson.totalPages);
                setTotalPosts(responJson.totalPosts);
            })
            
        } catch (error) {
            console.error('Gagal mengambil data:', error);
        }
    };

    console.log("Data Postingan",forumData);  
    console.log("Is User Verivied? :",detailUser?.verified);

    const navigation = useNavigation();


    return (
        <ToastProvider>
        <View className="flex-1 items-center bg-[#EBEBEB] ">
            <View className="bg-white w-full mt-2 px-5 py-2 ">
                {detailUser? (
                <View className="flex-row gap-x-3 py-5 items-center">
                    <Image
                        source={{
                            uri : detailUser.photoURL
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
                            {detailUser.email}
                        </Text>
                        <View className="mt-2">
                            <StarRating score={detailUser.score}/>
                        </View>
                    </View>
                </View>
                ) : (
                    <View>
                        <Text> No data</Text>
                    </View>
                )}
                
                <View className="h-[2] bg-gray-200 w-full rounded-full"/>

                <View className="py-2 gap-2"> 
                    <View className="py-2 px-20  items-center rounded-full">
                        <Text className="text-base text-black">{jumlahCurrentPosted} Post In Forum</Text> 
                    </View>
                </View>
            </View>
            <FlatList
                className="w-full"
                data={currentPosted}
                renderItem={({ item }) => (
                    <ForumPost
                        imageProfile={item.user.photoURL}
                        namePost={item.user.displayName}
                        timePost={item.data.createdAt._seconds}
                        titlePost={item.data.title}
                        descPost={item.data.topics}
                        onPressPost={() => navigation.navigate(ROUTES.DETAIL_FORUM, { id: item.id })} 
                        onPressProfile={undefined}
                        imagePost={item.data.images[0]}
                        verified={item.user.verified}
                        id={item.id}
                        likes={item.data.likes}
                        comments={item.commentCount}
                    />
                )}
            />
        </View>
        </ToastProvider>
    );
}

export default ProfileScreen;