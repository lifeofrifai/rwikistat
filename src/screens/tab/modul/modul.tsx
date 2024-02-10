import { NativeWindStyleSheet } from "nativewind";
import API from "../../../../api.json";
import { useEffect, useState } from "react";
import { View, Text, ScrollView, RefreshControl, FlatList, ActivityIndicator } from "react-native";
import CardModul from "../../../components/CardModul";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import ROUTES from "../../../constans/routes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from '@react-native-firebase/auth';

NativeWindStyleSheet.setOutput({
    default: "native",
});

interface ModulData {
    id: number;
    data: {
        namaModul: string;
        codeSampel: string;
        judulModul: string;
    };
}

export default () => {
    const [testData, setTestData] = useState<ModulData[]>([]);
    const [refreshing, setRefreshing] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        fetchData();
    }, []);


    const fetchData = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        console.log("token",userToken);
        fetch(API.address + '/api/modul', {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        })
            .then((response) => response.json())
            .then((responJson)=>{
                setTestData(responJson);
                setRefreshing(false);
            })
            .catch((error)=>{
                console.error('Gagal mengambil data:', error);
            });
    };

    const onRefresh = () => {
        //Clear old data of the list
        setTestData([]);
        //Call the Service to get the latest data
        setRefreshing(true);
        fetchData();
    };

    return (
        <View className="flex-1 items-center bg-[#EBEBEB]">
                {refreshing ? (
                    <View className="items-center justify-center flex-1 ">
                        <ActivityIndicator size="large" color="#00726B"/>
                    </View>
                ): (
                    <View className="w-full px-5" >
                    <FlatList
                        refreshControl={
                            <RefreshControl 
                                refreshing={refreshing} 
                                onRefresh={onRefresh} 
                            />
                        }
                        
                        data={testData}
                        renderItem={({ item }) => (
                            <CardModul
                                key={item.id}
                                title={item.data.namaModul}
                                desc={item.data.judulModul}
                                onPress={() => navigation.navigate(ROUTES.MODUL_DETAIL, { id: item.id })}              
                            />  
                        )}
                    />
                    </View>
                )}
        </View>
    );
}