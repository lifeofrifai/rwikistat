
import { NativeWindStyleSheet } from "nativewind";
import { useEffect, useState } from "react";
import { View, Text, Image, Pressable, FlatList } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ToastProvider } from 'react-native-toast-notifications'
import { UserAuth } from "../context/authContext";
import axios from 'axios';
import ForumPost from "../components/ForumPost";

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
    const {user} = UserAuth();
    const [forumData, setForumData] = useState<ForumData[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    // const photoURL = user?.photoURL || '';

    const fetchData = async (page: number | undefined) => {
        try {
            const url = 'https://rest-api-zzvthujxxq-as.a.run.app/api/forum/page?page=${page}';
    
            const response = await axios.get(url);
            if (response.status === 200) {
                const { forumData, currentPage, totalPages } = response.data;
                console.log(forumData);
                // Set data forum, nomor halaman saat ini, dan jumlah total halaman
                setForumData(forumData);
                setCurrentPage(currentPage);
                setTotalPages(totalPages);
            } else {
                console.error('Gagal mengambil data:', response.statusText);
            }
        } catch (error) {
            console.error('Gagal mengambil data:', error);
        }   
    };
    
    useEffect(() => {
        // Memanggil fetchData untuk mengambil data awal
        fetchData(currentPage);
    }, [currentPage]);

    const currentForumData = forumData;
    
    return (
        <ToastProvider>
        <View className="flex-1 items-center bg-[#EBEBEB] ">
            <ScrollView className="w-full">
                <View className=" w-full justify-center items-center bg-white px-4 py-2 mt-2" >
                    {/* <Image
                        source={require('../assets/images/profile-1.jpeg')}
                        className="w-11 h-11 rounded-md"
                    /> */}
                    <Pressable
                        className=" rounded-md w-full border border-gray-400 justify-center  bg-white h-10"
                        onPress={undefined}   
                    >
                        <Text className="text-gray-400 ml-5 " >
                            Tanyakan sesuatu disini....
                        </Text>
                    </Pressable>
                </View>
                <FlatList
                    data={currentForumData}
                    renderItem={({ item }) => (
                        <ForumPost
                            key={item.id}
                            imageProfile={item.user.photoURL}
                            namePost={item.user.displayName}
                            timePost="3 Hours Ago"
                            titlePost={item.data.title}
                            descPost={item.data.topics}
                            onPress={undefined}  
                            imagePost={undefined}       
                        />
                    )}
                />
            </ScrollView>
        </View>
        </ToastProvider>
    );
}