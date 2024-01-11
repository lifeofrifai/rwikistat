import { NativeWindStyleSheet } from "nativewind";
import { View, Text, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, TextInput, Image } from "react-native";
import SecondaryButton from "../../../components/button/SecondaryButton";
import PrimaryButton from "../../../components/button/PrimaryButton";
import { useState, FormEvent } from "react";
// import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import API from "../../../../api.json";
import auth, { firebase } from '@react-native-firebase/auth';

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

interface NewPost {
  topics: string;
  title: string;
  images: File[];
  userId: string,
}

export default () => {
  const [image, setImage] = useState(null);
  const [newPost, setNewPost] = useState<NewPost>({
    topics: "",
    title: "",
    images: [],
    userId: '',
  }); 

  const handleInputChange = (name: string, value: string) => {
    setNewPost({
        ...newPost,
        [name]: value,
    });
  };

  // const handleImageChange = async () => {
  //   const result = await ImagePicker.launchImageLibraryAsync();

  //   if (!result.canceled) {
  //     setNewPost({
  //       ...newPost,
  //       images: [...newPost.images, result.uri],
  //     });
  //     setImage(result.uri);
  //   }
  // };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
          const formData = new FormData();
          const user = firebase.auth().currentUser;
          formData.append('topics', newPost.topics);
          formData.append('title', newPost.title);
          formData.append('userId',user?.uid);
          newPost.images.forEach((image) => {
            formData.append('images', image);
          });
          console.log(formData);

          const userToken = await AsyncStorage.getItem('userToken');
          const response = await fetch(API.address + '/api/forum/', {
            method: 'POST',
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${userToken}`,
            },
            body: formData,
          });
    
    
          
            // Refresh data setelah berhasil menambahkan postingan
            // fetchData();
            // Reset formulir setelah berhasil menambahkan postingan
            console.log(response)
            setNewPost({
              topics: '',
              userId: '',
              images: [],
              title: '',
            });
          
        } catch (error) {
          console.error('Gagal menambahkan postingan:', error);
        }
      };

    
    // const [selectedImage, setSelectedImage] = useState(null);

    // const openImagePicker = () => {
    //     const options = {
    //         mediaType: 'photo',
    //         includeBase64: false,
    //         maxHeight: 2000,
    //         maxWidth: 2000,
    //     };
    
    //     launchImageLibrary(options, (response) => {
    //         if (response.didCancel) {
    //             console.log('User cancelled image picker');
    //         } else if (response.error) {
    //             console.log('Image picker error: ', response.error);
    //         } else {
    //             let imageUri = response.uri || response.assets?.[0]?.uri;
    //             setSelectedImage(imageUri);
    //             console.log('imageUri', imageUri);
                  // setNewPost({
                  //         ...newPost,
                  //         images: [...newPost.images, imageUri],
                  //       });
                  //       setImage(imageUri);
    //         }
    //     });
    // };

    // const handleCameraLaunch = () => {
    //     const options = {
    //       mediaType: 'photo',
    //       includeBase64: false,
    //       maxHeight: 2000,
    //       maxWidth: 2000,
    //     };
      
    //     launchCamera(options, response => {
    //       console.log('Response = ', response);
    //       if (response.didCancel) {
    //         console.log('User cancelled camera');
    //       } else if (response.error) {
    //         console.log('Camera Error: ', response.error);
    //       } else {
    //         // Process the captured image
    //         let imageUri = response.uri || response.assets?.[0]?.uri;
    //         setSelectedImage(imageUri);
    //         console.log(imageUri);
    //       }
    //     });
    //   }

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
                    value={newPost.title}
                    onChangeText={(text) => handleInputChange('title', text)}
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
                    value={newPost.topics}
                    onChangeText={(text) => handleInputChange('topics', text)}
                />
            </View>
            <View className='mt-5'>
                <SecondaryButton
                    className="bg-gray-200"
                    label="Tambahkan Foto Dari Kamera"
                    icon="photo"
                    onPress={undefined}
                    disabled={undefined} 
                    loading={undefined}
                />
                <SecondaryButton
                    className="bg-gray-200"
                    label="Tambahkan Foto Dari Galeri"
                    icon="photo"
                    onPress={undefined} 
                    disabled={undefined} 
                    loading={undefined}
                />
            </View>
            <View className='items-center'>
                {/* {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, marginTop: 15 }} />} */}
                {/* {selectedImage && (
                    <Image
                        source={{ uri: selectedImage }}
                        style={{ width: 200, height: 200, marginTop: 15 }}
                        resizeMode="contain"
                    />
                )} */}
            </View>
            <View className='mt-5'>
                <PrimaryButton
                    label="Tanyakan"
                    icon={undefined}
                    onPress={handleSubmit} 
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