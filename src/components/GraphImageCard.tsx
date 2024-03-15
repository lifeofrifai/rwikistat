import { Image, Pressable, Text, View,TouchableOpacity, Alert , Linking} from "react-native"
import API from "../../api.json";
import React, { useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';


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

    const [downloading, setDownloading] = useState(false);
    const [imageUrl1, setImageUrl1] = useState('');

    
    const url = `${API.address}${imageUrl}`;

    const handleDelete = async (id: number) => {
        try {
            // Mendapatkan token dari AsyncStorage
            const userToken = await AsyncStorage.getItem('userToken');
    
            const header = {
                Authorization: `Bearer ${userToken}`,
            };
    
            const response = await fetch(API.address + `/api/history/delete/${id}`, {
                method: 'DELETE',
                // headers: header,
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

    // const downloadImage = async () => {
    //     try {
    //         const response = await fetch(API.address + `/api/history/download/${id}`, {
    //             method: 'GET',
    //             // headers: header,
    //         });
    //       const blob = await response.blob();
    //       const base64: string = await blobToBase64(blob); // Specify base64 as string
    //       const imagePath = `${RNFS.DocumentDirectoryPath}/your-image-name.png`;
    //       await RNFS.writeFile(imagePath, base64, 'base64');
    //       setImageUrl1(imagePath);
    //       console.log(imagePath)
    //       Alert.alert('Success', 'Image downloaded successfully');
    //     } catch (error) {
    //       Alert.alert('Error', 'Failed to download image');
    //       console.error('Error downloading image:', error);
    //     }
    //   };
      
    //   const blobToBase64 = async (blob: Blob): Promise<string> => {
    //     return new Promise((resolve, reject) => {
    //       const reader = new FileReader();
    //       reader.onerror = () => {
    //         reader.abort();
    //         reject(new Error("Problem reading blob."));
    //       };
    //       reader.onload = () => {
    //         if (typeof reader.result === 'string') {
    //           resolve(reader.result);
    //         } else {
    //           reject(new Error("Expected result to be a string."));
    //         }
    //       };
    //       reader.readAsDataURL(blob);
    //     });
    //   };

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
                onPress={undefined}
            >
                <Text className=" text-white text-base font-medium text-center">Download</Text>
            </Pressable>
        </View>
    </View>
    )
}
export default GraphImageCard;