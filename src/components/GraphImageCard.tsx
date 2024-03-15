import { Image, Pressable, Text, View } from "react-native"
import API from "../../api.json"
import AsyncStorage from "@react-native-async-storage/async-storage";


interface GraphImageCard{
    id: number,
    imageName: string,
    imageUrl: string
}

const GraphImageCard = ({
    id,
    imageName,
    imageUrl
}:GraphImageCard) => {
    
    const url = `${API.address}${imageUrl}`;

    const handleDelete = async (id: number) => {
        try {
            // Mendapatkan token dari AsyncStorage
            const userToken = await AsyncStorage.getItem('userToken');
    
            const header = {
                Authorization: `Bearer ${userToken}`,
            };
    
            const response = await fetch(API.address + `/api/history/${id}`, {
                method: 'DELETE',
                headers: header,
            });
    
            if (!response.ok) {
                throw new Error('Failed to delete data');
            }
    
            const responJson = await response.json();
            console.log(responJson);
        } catch (error) {
            console.error('Gagal menghapus data:', error);
            // Handle error secara sesuai kebutuhan Anda
        }
    }; 

    return(
        <View className="flex-row w-full bg-white px-4 mt-2 py-2">
            <Image
                source={{
                    uri: url
                }}
                className="w-44 h-36"
            />
        <View className="flex-col ml-3">
            <Text className="text-mainGreen text-lg font-semibold">{imageName}</Text>
            <Pressable
                className="bg-red-600 rounded-md w-24 mt-2"
                onPress={() => handleDelete(id)}
            >
                <Text className=" text-white text-base font-medium text-center">Delete</Text>
            </Pressable>
            <Pressable 
                className="bg-mainGreen rounded-md w-24 mt-1"
                onPress={() => console.log("download")}
            >
                <Text className=" text-white text-base font-medium text-center">Download</Text>
            </Pressable>
        </View>
    </View>
    )
}
export default GraphImageCard;