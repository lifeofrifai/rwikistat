import { NativeWindStyleSheet } from "nativewind";
import API from "../../../../api.json";
import { useEffect, useState } from "react";
import { View, Text, ScrollView, RefreshControl, FlatList } from "react-native";
import CardModul from "../../../components/CardModul";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import ROUTES from "../../../constans/routes";

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
        fetch(API.address + '/api/modul')
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
        fetchData();
    };

    return (
        <View className="flex-1 items-center bg-[#EBEBEB]">
            <View 
                className="w-full px-5" 
                // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
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
                            onPress={() => navigation.navigate(ROUTES.MODUL_DETAIL)}              
                        />  
                    )}
                />
            </View>
        </View>
    );
}