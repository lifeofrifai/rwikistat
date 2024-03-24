import { NativeWindStyleSheet } from "nativewind";
import { View, Text, ScrollView, Pressable, FlatList, RefreshControl, ActivityIndicator } from "react-native";
import Foundation  from "react-native-vector-icons/Foundation";
import { UserAuth } from "../context/authContext";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import auth, { firebase } from '@react-native-firebase/auth';
import API from "../../api.json";
import GraphImageCard from "./GraphImageCard";
import { ToastProvider } from "react-native-toast-notifications";

NativeWindStyleSheet.setOutput({
    default: "native",
});

  // Buat sebuah jenis yang mencerminkan struktur data dari API
interface imageData {
    id: number;
    data: {
        url: string;
        fileName: string;
    };
}


function GraphImage () {
    const {user} = UserAuth();
    const [testData, setTestData] = useState<imageData[]>([]);
    const [refreshing, setRefreshing] = useState(true);

    const fetchData = async () => {
        try {
            const user = firebase.auth().currentUser;
            const uid = user?.uid;

            // Mendapatkan token dari localStorage atau sumber lainnya
            const userToken = await AsyncStorage.getItem('userToken');

            fetch(API.address + `/api/history/${uid}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            })
            .then((response) => response.json())
            .then((responJson)=>{
                setTestData(responJson);
                console.log(responJson);
                setRefreshing(false);
            })
            } catch (error) {
                console.error('Gagal mengambil data:', error);
        }
    };
    
    useEffect(() => {
        fetchData();
    }, [user]);

    const onRefresh = () => {
         //Clear old data of the list
        setTestData([]);
         //Call the Service to get the latest data
        setRefreshing(true);
        fetchData();

    }

    return (
        <ToastProvider>
        <View className="flex-1 items-center bg-[#EBEBEB] ">
            {refreshing ? (
                <View className="items-center justify-center flex-1 ">
                    <ActivityIndicator size="large" color="#00726B"/>
                </View>
            ):(
            <FlatList
                refreshControl={
                    <RefreshControl 
                        refreshing={refreshing} 
                        onRefresh={onRefresh} 
                    />
                }
                className="w-full"
                data={testData}
                renderItem={({item}) => (
                    <GraphImageCard
                        id={item.id}
                        imageName={item.data.fileName}
                        imageUrl={item.data.url}                    
                    />
                )}
            />
            )}
            
        </View>
        </ToastProvider>
        
    );
}
export default GraphImage;