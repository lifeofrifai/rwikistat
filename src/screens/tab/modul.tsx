import { NativeWindStyleSheet } from "nativewind";
import { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import CardModul from "../../components/CardModul";

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
    const [referesing, setRefreshing] = useState(true);
    const [isloading, setIsLoading] = useState(false);

    const fetchData = async () => {
        try {
            const response = await fetch('https://rest-api-zzvthujxxq-as.a.run.app/api/modul');
            if (response.status === 200) {
                const data = await response.json();
                setTestData(data);
                setIsLoading(false);
            } else {
                console.error('Gagal mengambil data:', response.statusText);
            }
        } catch (error) {
            console.error('Gagal mengambil data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    
    if (isloading) {
        return (
            <View className="flex-1 items-center justify-center bg-[#EBEBEB] ">
                <ScrollView className="w-full px-5 pt-6">
                    <Text>Loading...</Text>
                </ScrollView>
            </View>
        );
    }
    return (
        <View className="flex-1 items-center bg-[#EBEBEB] ">
            <ScrollView className="w-full px-5 pt-6" >
                {testData.map((item) => (
                    <CardModul
                        key={item.id}
                        title={item.data.namaModul}
                        desc={item.data.judulModul}
                        onPress={undefined}            
                    />  
                ))}
            </ScrollView>
        </View>
    );
}