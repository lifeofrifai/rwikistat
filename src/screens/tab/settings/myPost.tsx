import { NativeWindStyleSheet } from "nativewind";
import { ToastProvider } from 'react-native-toast-notifications';
import { View, Text, Image, Pressable, FlatList, RefreshControl, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ROUTES from "../../../constans/routes";
import ForumPost from "../../../components/ForumPost";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API from "../../../../api.json";
import auth, { firebase } from '@react-native-firebase/auth';

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
    }
    commentCount: number;
}

export default () => {
    const navigation = useNavigation();
    const [forumData, setForumData] = useState<ForumData[]>([]);
    const [refreshing, setRefreshing] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        // Memanggil fetchData untuk mengambil data awal
        fetchData(currentPage);
    }, [currentPage]);

    const fetchData = async (page: number | undefined) => {
        try {
            const user = firebase.auth().currentUser;
            const userId = user?.uid;
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
                setRefreshing(false);
            })
        } catch (error) {
            console.error('Gagal mengambil data:', error);
        }
    };

    const onRefresh = () => {
        //Clear old data of the list
        setForumData([]);
        //Call the Service to get the latest data
        fetchData(currentPage);
    };

    const currentForumData = forumData;
    return (
        <ToastProvider>
        <View className="flex-1 items-center bg-[#EBEBEB] ">
            <SafeAreaView className="w-full">
                
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
                            onPressProfile={undefined}
                            imagePost={undefined}
                            verified={true}
                            id={item.id}
                            likes={item.data.likes}
                            comments={undefined}                        
                        />
                    )}
                />
            </SafeAreaView>
        </View>
        </ToastProvider>
        
    );
}