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
import SelectDropdown from 'react-native-select-dropdown'

NativeWindStyleSheet.setOutput({
    default: "native",
});


export default () => {
    const keyboard = useKeyboard();
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();

    const [isModalVisible, setModalVisible] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [response, setResponse] = useState('');
    const [compilerType, setCompilerType] = useState('String');
    const [fileName, setFileName] = useState('')

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
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result;
          if (typeof result === 'string') {
            const base64data = result.split(',')[1];
            setImageUrl(base64data);
          }
        };
        reader.readAsDataURL(blob);
        setModalVisible(!isModalVisible);

      }else {
            // If it's not an image, set the response as text
            const data = await response.text();
            setResponse(data);
            setModalVisible(!isModalVisible);
        }
        } catch (error) {
            console.error(error);
            setResponse('Terjadi kesalahan saat mengirim kode.');
        }
    };
    const base64Image = `data:image/png;base64,${imageUrl}`;

const dropdownData = ["Graph", "String"]

    return (
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
                        loading={undefined}             
                    />
                    <Modal
                        isVisible={isModalVisible}
                        swipeDirection={['left', 'right']}
                        onSwipeComplete={toggleModal}
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
                                            placeholder="Simpan gambar anda..."
                                            placeholderTextColor="#aaa"
                                            value={fileName}
                                            onChangeText={(e)=>setFileName(e)}
                                            
                                        />
                                            <MiniPrimaryButton
                                                label="Simpan"
                                                icon={undefined}
                                                onPress={undefined}
                                                disabled={undefined}
                                                loading={undefined}             
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
    );
}