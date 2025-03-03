import { Image, Pressable, Text, View,TouchableOpacity, Alert , Linking} from "react-native"
import API from "../../api.json";
import React, { useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNFetchBlob from 'rn-fetch-blob';
import {  Platform } from "react-native";
import {CameraRoll} from "@react-native-camera-roll/camera-roll"
import { useToast } from "react-native-toast-notifications";

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
            toast.show("Gambar Dihapus", { duration: 2000, type: "success" })
    
            if (!response.ok) {
                throw new Error('Failed to delete data');
                
            }
    
            const responJson = await response.json();
            console.log(responJson);
        } catch (error) {
            console.error('Gagal menghapus data:', error);
            // Handle error secara sesuai kebutuhan Anda
            toast.show("Gambar Gagal Dihapus", { duration: 2000, type: "error" })
        }
    }; 

    
    const downloadImage = async () => {
        const url = `${API.address}${imageUrl}`;
        console.log(url);
    
        let imgUrl = `${API.address}${imageUrl}`;
    
        let newImgUri = imgUrl.lastIndexOf('/');
        let imageName = imgUrl.substring(newImgUri);
    
        let dirs = RNFetchBlob.fs.dirs;
        let path = Platform.OS === 'ios' ? dirs['MainBundleDir'] + imageName : dirs.PictureDir + imageName;
    
        const saveToGallery = () => {
            if (Platform.OS == 'android') {
                RNFetchBlob.config({
                    fileCache: true,
                    appendExt: 'png',
                    indicator: true,
                    IOSBackgroundTask: true,
                    path: path,
                    addAndroidDownloads: {
                        useDownloadManager: true,
                        notification: true,
                        path: path,
                        description: 'Image'
                    },
                }).fetch("GET", imgUrl).then(res => {
                    console.log(res, 'end downloaded');
                });
            } else {
                CameraRoll.saveToCameraRoll(imgUrl);
            }
        };
    
        // Call the saveToGallery function
        saveToGallery();
        toast.show("Gambar Diunduh", { duration: 2000, type: "success" })
    };

    const toast = useToast();
    

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
                onPress={downloadImage}
            >
                <Text className=" text-white text-base font-medium text-center">Download</Text>
            </Pressable>
        </View>
    </View>
    )
}
export default GraphImageCard;