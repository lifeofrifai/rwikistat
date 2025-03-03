import CodeEditor, { CodeEditorSyntaxStyles } from '@rivascva/react-native-code-editor';
import { NativeWindStyleSheet } from "nativewind";
import { View, Text, SafeAreaView, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard, Button, Image, TextInput } from "react-native";
import { useKeyboard } from '@react-native-community/hooks';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MiniPrimaryButton from "../../../components/button/MiniPrimaryButton";
import ROUTES from "../../../constans/routes";
import { useNavigation } from '@react-navigation/native';
import Modal from "react-native-modal";
import React, { useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import API from "../../../../api.json";
import { ActionCodeURL } from 'firebase/auth/cordova';
import { ScrollView } from 'react-native-gesture-handler';
import { Buffer } from 'buffer';
import BlobImageViewer from '../../../components/BlobImageViewer';
import SelectDropdown from 'react-native-select-dropdown';
import auth, { firebase } from '@react-native-firebase/auth';
import RNFetchBlob from 'rn-fetch-blob';
import { ToastProvider, useToast } from "react-native-toast-notifications";


NativeWindStyleSheet.setOutput({
    default: "native",
});

interface FileName {
    [key: string]: string;
  }


export default () => {
    const keyboard = useKeyboard();
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();

    const [isModalVisible, setModalVisible] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [response, setResponse] = useState('');
    const [compilerType, setCompilerType] = useState('String');
    const [imageData, setImageData] = useState<Blob | null>(null);
    const [loading, setLoading] = useState(false);
    const [fileName, setFileName] = useState('');

    const [code, setCode] = useState('#Write Your R Code Here # png("out.png", width = 800, height = 600)');

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    // const handelSimpan = async () => {
    //     if (imageData) {
    //         saveImageToDatabase(imageData);
        
    //     }
    // }



    const handleCompile = async () => {
        try {
            const userToken = await AsyncStorage.getItem('userToken');
            setLoading(true);
          const response = await fetch(API.address + '/api/compiler/test/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userToken}`,
            },
            body: JSON.stringify({ code }),
          });
      
        // Reset imageUrl to null before processing new response
        setImageUrl(null);

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('image/png')) {
          // If it's an image, set the response as an image source
          const blob = await response.blob();
          setImageData(blob);
          // saveImageToDatabase(blob);
          console.log(blob)
          const reader = new FileReader();
          reader.onloadend = () => {
            const result = reader.result;
            if (typeof result === 'string') {
              const base64data = result.split(',')[1];
              setImageUrl(base64data);
              console.log('image',imageUrl);
            }
          };
        reader.readAsDataURL(blob);
        
        setModalVisible(!isModalVisible);

      }else {
            // If it's not an image, set the response as text
            const data = await response.text();
            setResponse(data);
            setLoading(false);
            setModalVisible(!isModalVisible);
        }
        } catch (error) {
            console.error(error);
            setResponse('Terjadi kesalahan saat mengirim kode.');
        }
    };
    const base64Image = `data:image/png;base64,${imageUrl}`;

    const imageName = (value: string) => {
        setFileName(value);
      };

    
      const handelSimpan = async () => {
        if (base64Image) {
          saveImageToDatabase(base64Image);
          toast.show("Gambar Disimpan", { duration: 2000, type: "success" })

          
        }
      }

      const generateDefaultName = () => {
        const currentTime = new Date();
        const timestamp = `${currentTime.getFullYear()}${currentTime.getMonth() + 1}${currentTime.getDate()}${currentTime.getHours()}${currentTime.getMinutes()}${currentTime.getSeconds()}`;
        return `plot_${timestamp}`;
      };

      

      // const saveImageToDatabase = async (blobData: Blob) => {
      //   try {
      //     const storedToken = await AsyncStorage.getItem('userToken');
          
      //     // const formData = new FormData();
      //     const user = firebase.auth().currentUser;
      //     // formData.append('fileName', fileName || generateDefaultName());
      //     // if (user) {
      //     //   formData.append('uid',user?.uid);
      //     //   }
      //     //   formData.append('image', blobData);
            

      //       const url = API.address + '/api/history/';
      //       const token = `Bearer ${storedToken}`;

      //       const blobDataString = JSON.stringify(blobData);

      //       const response = await RNFetchBlob.fetch('POST', url, {
      //           Authorization: token,
      //           'Content-Type': 'multipart/form-data',
      //       }, [
      //           {name: 'image', data: blobDataString ,filename: 'compiled_image.png'},
      //           {name:'uid', data:user?.uid},
      //           {name:'filename', data:fileName || generateDefaultName()}
      //       ]);

      //     // console.log(formData)
    
      //     const responseData = await response.json();
    
      //     // if (response.status === 200) {
      //     //   // const responseData = await response.json();
      //     //   console.log('Success:', responseData.message);
      //     //   // Display success message to the user
      //     // } else {
      //     //   console.error('Error:', response.statusText);
      //     //   // Display error message to the user using the status text
      //     // }
      
      //     console.log('Image saved to database successfully');
      //     setLoading(false);
      //   } catch (error) {
      //     console.error('Error saving image to database:', error);
      //   }
      // };

      const toast = useToast();

      const saveImageToDatabase = async (base64Image: string) => {
        try {
            setLoading(true);
            const storedToken = await AsyncStorage.getItem('userToken');
            const user = firebase.auth().currentUser;
            const url = API.address + '/api/history/mobile';
            const token = `Bearer ${storedToken}`;
    
            console.log('data gambar', base64Image);
    
            const requestData = {
                uid: user?.uid || '',
                fileName: fileName || generateDefaultName(),
                image: base64Image
            };
    
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json', // Ganti menjadi application/json
                },
                body: JSON.stringify(requestData), // Ubah menjadi JSON string
            });
    
            const responseData = await response.json();
            console.log('Image saved to database successfully');
            setLoading(false);
        } catch (error) {
            console.error('Error saving image to database:', error);
        }
    };
    
    


const dropdownData = ["Graph", "String"]

    return (
        <ToastProvider>
        <SafeAreaView className="flex-1 bg-[#EBEBEB] ">
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS == 'ios' ? 0 : 0 || Platform.OS == 'android' ? 10: 0}
        >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
                <View className="flex-row justify-end h-[70]  bg-white px-5 py-4" >
                    <SelectDropdown
                        data={dropdownData}
                        onSelect={(selectedItem) => {
                            console.log(selectedItem)
                            setCompilerType(selectedItem)
                        }}
                        dropdownStyle={{width: 200, shadowColor: "#000", shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, marginTop: -40,}}
                        buttonStyle={{width: 100, height: 38, backgroundColor: "#00726B", borderRadius: 5, marginLeft: 10,}}
                        buttonTextStyle={{color: "#fff", fontSize: 14, fontWeight: "bold",}}
                        rowStyle={{backgroundColor: "#fff", borderBottomColor: "#C5C5C5", borderBottomWidth: 1,}}
                        rowTextStyle={{color: "#000", fontSize: 14,}}
                        dropdownOverlayColor='rgba(0,0,0,0.5)'
                        
                    />
                    <MiniPrimaryButton
                        label="Compile"
                        icon="play-circle"
                        onPress={handleCompile}    
                        disabled={undefined}
                        loading={loading}             
                    />
                    <Modal
                        isVisible={isModalVisible}
                        swipeDirection={['left', 'right']}
                        onSwipeComplete={toggleModal}
                        scrollHorizontal={true}
                    >
                        <ScrollView 
                            className='h-1/2 px-2 py-3 bg-white rounded-lg'
                        >
                            <Text className='text-center text-mainGreen text-lg font-medium'>Output</Text>
                            {/* Conditional rendering based on content type */}
                            {imageUrl ? (
                                <View className='items-center  '>
                                    <View className=" flex-row m-auto w-full justify-center items-center  px-[65] py-5  " >
                                        <TextInput
                                            className= "bg-white text-black flex-row w-full rounded-md border justify-between h-10 items-center border-gray-400 p-3 mr-3"
                                            placeholder={`${generateDefaultName()}`}
                                            placeholderTextColor="#aaa"
                                            value={fileName}
                                            onChangeText={imageName}
                                            
                                        />
                                            <MiniPrimaryButton
                                                label="Simpan"
                                                icon={undefined}
                                                onPress={handelSimpan}
                                                disabled={undefined}
                                                loading={loading}             
                                            />
                                    </View>
                                    <Image
                                        source={{
                                            uri: base64Image,
                                        }}
                                        alt="Output"
                                        className="w-[370px] h-[270px]"
                                    />
                                    
                                </View>
                            ) : (
                                <Text className="text-green-600 mt-5">{response}</Text>
                            )}
                        </ScrollView>
                    </Modal>
                </View>
                {compilerType === "Graph" && (
                    <CodeEditor
                    style={{
                        ...{
                            fontSize: 14,
                            inputLineHeight: 26,
                            highlighterLineHeight: 26,
                            lineNumbersColor:"#00726B",
                            width: "100%",
                        },
                        ...(keyboard.keyboardShown
                            ? { marginBottom: keyboard.keyboardHeight - insets.bottom }
                            : {}),
                    }}
                    onChange={(newCode) => setCode(newCode)}
                    language= 'r'
                    syntaxStyle={CodeEditorSyntaxStyles.atomOneLight}
                    showLineNumbers
                    initialValue='png("out.png", width = 800, height = 600)'
                />
                )}
                {compilerType === "String" && (
                    <CodeEditor
                    style={{
                        ...{
                            fontSize: 14,
                            inputLineHeight: 26,
                            highlighterLineHeight: 26,
                            lineNumbersColor:"#00726B",
                            width: "100%",
                        },
                        ...(keyboard.keyboardShown
                            ? { marginBottom: keyboard.keyboardHeight - insets.bottom }
                            : {}),
                    }}
                    onChange={(newCode) => setCode(newCode)}
                    language= 'r'
                    syntaxStyle={CodeEditorSyntaxStyles.atomOneLight}
                    showLineNumbers
                    initialValue=''
                />
                )}
            </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        </SafeAreaView>
        </ToastProvider>
    );
}