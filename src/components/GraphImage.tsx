import { NativeWindStyleSheet } from "nativewind";
import { View, Text, ScrollView, Pressable, FlatList } from "react-native";
import Foundation  from "react-native-vector-icons/Foundation";
import { UserAuth } from "../context/authContext";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import auth, { firebase } from '@react-native-firebase/auth';
import API from "../../api.json";
import GraphImageCard from "./GraphImageCard";

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
            })
            } catch (error) {
                console.error('Gagal mengambil data:', error);
        }
    };
    
    useEffect(() => {
        fetchData();
    }, [user]);

    return (
        <View className="flex-1 items-center bg-[#EBEBEB] ">
            <FlatList
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
        </View>
        
    );
}
export default GraphImage;