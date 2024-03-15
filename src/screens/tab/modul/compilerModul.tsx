import CodeEditor, { CodeEditorSyntaxStyles } from '@rivascva/react-native-code-editor';
import { NativeWindStyleSheet } from "nativewind";
import { View, Text, SafeAreaView, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard, Button, Image, Linking } from "react-native";
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
import SelectDropdown from 'react-native-select-dropdown';

NativeWindStyleSheet.setOutput({
    default: "native",
});

interface CompilerModulScreenProps {
    route: {
      params?: {
        code?: string;
      };
    };
  }

const CompilerModulScreen:React.FC<CompilerModulScreenProps> = ({ route }) => {
    const modulCode = route.params?.code;
    if (modulCode === undefined) {
        // Handle the case where code is not available
        return (
            <View>
                <Text>Modul Code is not available</Text>
            </View>
        );
    }

    const keyboard = useKeyboard();
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();

    const [isModalVisible, setModalVisible] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [response, setResponse] = useState('');
    const [port, setPort] = useState('');

    const [code, setCode] = useState('');

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const [urlShiny, setUrlShiny] = useState('');
    const [selectedPort, setSelectedPort] = useState<{ value: string; label: string } | null>(null);
    const [errorMessage, setErrorMessage] = useState('');

    const dropdownData = ["4000", "4001", "4002", "4003", "4004", "4005", "4006", "4007", "4008", "4009", "4010", "4011", "4012", "4013", "4014", "4015", "4016", "4017", "4018", "4019", "4020"]


    // const handlePortChange = (selectedOption: any) => {
    //     setSelectedPort(selectedOption);
    //   };


    const handleCompile = async () => {
        try {
          
        //   const port = selectedPort;
    
          // Mendapatkan token dari localStorage atau sumber lainnya
          const storedToken =  await AsyncStorage.getItem('userToken');
    
          const response = await fetch(API.address +`/api/compiler/check-port/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              // Authorization: `Bearer ${storedToken}`,
            },
            body: JSON.stringify({ port }),
          });
    
          const responseData = await response.json();
          console.log(responseData);
          console.log(responseData.status);
    
          const status = responseData.status;
    
          let shinyPort, shinyUrl;
    
          if (status === 'false') {
            if (port) {
              shinyUrl = `http://10.38.0.2:${port}`;
              setUrlShiny(shinyUrl);
            }
            const response = await fetch(API.address +`/api/compiler/shiny/`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${storedToken}`,
              },
              body: JSON.stringify({ code, port }),
            });
      
            const responseData = await response.json();
      
            const shinyOutput = responseData.shinyOutput.text;
            const originalOutput = responseData.originalOutput;
            Linking.openURL(`http://10.38.0.2:${port}`);
      
            // Contoh: Set state atau melakukan operasi lainnya
            // setOutputDetails(shinyOutput);
            setResponse(originalOutput);
      
          }else if (status === 'true') {
            console.log('Port is already in use');
            setErrorMessage('Port is already in use');
          } else {
            console.log('Unexpected value for responseData.status:', status);
          }
    
          // Menjalankan kode setelah kondisi status === 'false' tanpa menunggu respon
          
          
        } catch (error) {
          console.error(error);
          setResponse('Terjadi kesalahan saat mengirim kode.');
        }
      };

    
    const linkShinny = () => {
        Linking.openURL('http://10.38.0.2:4000/');
    }

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
                            setPort(selectedItem)
                            
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
                                <Image src={imageUrl} alt="Output" className="h-full p-5" />
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
                    initialValue={modulCode}
                />
            </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default CompilerModulScreen;