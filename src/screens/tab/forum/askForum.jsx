import { NativeWindStyleSheet } from "nativewind";
import { View, Text, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, TextInput, Image } from "react-native";
import SecondaryButton from "../../../components/button/SecondaryButton";
import PrimaryButton from "../../../components/button/PrimaryButton";
import { useState } from "react";
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';

NativeWindStyleSheet.setOutput({
    default: "native",
});

export default () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const openImagePicker = () => {
        const options = {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 2000,
            maxWidth: 2000,
        };
    
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('Image picker error: ', response.error);
            } else {
                let imageUri = response.uri || response.assets?.[0]?.uri;
                setSelectedImage(imageUri);
                console.log('imageUri', imageUri);
            }
        });
    };

    const handleCameraLaunch = () => {
        const options = {
          mediaType: 'photo',
          includeBase64: false,
          maxHeight: 2000,
          maxWidth: 2000,
        };
      
        launchCamera(options, response => {
          console.log('Response = ', response);
          if (response.didCancel) {
            console.log('User cancelled camera');
          } else if (response.error) {
            console.log('Camera Error: ', response.error);
          } else {
            // Process the captured image
            let imageUri = response.uri || response.assets?.[0]?.uri;
            setSelectedImage(imageUri);
            console.log(imageUri);
          }
        });
      }

    return (
        <View className="flex-1 bg-[#EBEBEB]">
        <ScrollView>
        <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={Platform.OS == 'ios' ? 25 : 0}
        >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

        <View className='w-full bg-white px-4 py-3 mt-2'>
            <View className='mt-2'>
                <Text className="text-base" >
                    Judul Topik
                </Text>
                <Text className="text-gray-400 text-xs">
                    Berikan informasi yang spesifik dan dengan konteks yang jelas.
                </Text>
                <TextInput
                    className="flex-row w-full rounded-xl border justify-between h-12 items-center border-gray-400 p-3"
                    placeholder="Contoh : Apa itu bahasa pemrogrmaan R?"
                    placeholderTextColor="#aaa"
                    value={undefined}
                    onChangeText={undefined}
                />
            </View>
            <View className='mt-3'>
                <Text className="text-base" >
                    Deskripsi Penjelasan
                </Text>
                <Text className="text-gray-400 text-xs">
                Jelaskan masalah anda sesuai dengan judul
                </Text>
                <TextInput
                    className="flex-row w-full rounded-xl border justify-between h-28 items-center border-gray-400 p-3"
                    
                    placeholder="Topik"
                    placeholderTextColor="#aaa"
                    multiline
                    value={undefined}
                    onChangeText={undefined}
                />
            </View>
            <View className='mt-5'>
                <SecondaryButton
                    className="bg-gray-200"
                    label="Tambahkan Foto Dari Kamera"
                    icon="photo"
                    onPress={handleCameraLaunch} 
                    disabled={undefined} 
                    loading={undefined}
                />
                <SecondaryButton
                    className="bg-gray-200"
                    label="Tambahkan Foto Dari Galeri"
                    icon="photo"
                    onPress={openImagePicker} 
                    disabled={undefined} 
                    loading={undefined}
                />
            </View>
            <View className='items-center'>
                {/* {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, marginTop: 15 }} />} */}
                {selectedImage && (
                    <Image
                        source={{ uri: selectedImage }}
                        style={{ width: 200, height: 200, marginTop: 15 }}
                        resizeMode="contain"
                    />
                )}
            </View>
            <View className='mt-5'>
                <PrimaryButton
                    label="Tanyakan"
                    icon={undefined}
                    onPress={undefined} 
                    disabled={undefined} 
                    loading={undefined}
                />
            </View>

        </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        </ScrollView>
    </View>
        
    );
}