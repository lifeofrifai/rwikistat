import CodeEditor, { CodeEditorSyntaxStyles } from '@rivascva/react-native-code-editor';
import { NativeWindStyleSheet } from "nativewind";
import { View, Text, SafeAreaView, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard, Button, Image } from "react-native";
import { useKeyboard } from '@react-native-community/hooks';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MiniPrimaryButton from "../../../components/button/MiniPrimaryButton";
import ROUTES from "../../../constans/routes";
import { useNavigation } from '@react-navigation/native';
import Modal from "react-native-modal";
import { useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import API from "../../../../api.json";
import { ActionCodeURL } from 'firebase/auth/cordova';
import { ScrollView } from 'react-native-gesture-handler';
import { Buffer } from 'buffer';
import BlobImageViewer from '../../../components/BlobImageViewer';

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

    const [code, setCode] = useState('#Write Your R Code Here # png("out.png", width = 800, height = 600)');

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };


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
    
        // Check if the response is an image
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('image/png')) {
            // If it's an image, set the response as an image source
            const newImageUrl = await response.text();
            setImageUrl(newImageUrl);
            setModalVisible(!isModalVisible);
        } else {
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
    
    const binaryImageData = imageUrl
    const base64Image = `data:image/png;base64,${binaryImageData}`;
    console.log(base64Image);



    return (
        <SafeAreaView className="flex-1 bg-[#EBEBEB] ">
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS == 'ios' ? 0 : 0 || Platform.OS == 'android' ? 10: 0}
        >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
                <View className="flex-row justify-end h-[70]  bg-white px-5 py-4" >
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
                                <Image
                                    source={{
                                        uri: base64Image,
                                    }}
                                    alt="Output"
                                    className="w-full h-20 p-5"
                                />
                                // <BlobImageViewer blobData={imageUrl}/>
                            ) : (
                                <Text className="text-green-600">{response}</Text>
                            )}
                        </ScrollView>
                    </Modal>
                </View>
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
                    initialValue='#Write Your R Code Here # png("out.png", width = 800, height = 600)'
                />
            </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        </SafeAreaView>
    );
}