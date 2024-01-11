import { NativeWindStyleSheet } from "nativewind";
import { View, Text, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Image } from "react-native";
import Pdf from 'react-native-pdf';
import MiniPrimaryButton from "../../../components/button/MiniPrimaryButton";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useKeyboard } from "@react-native-community/hooks";
import CodeEditor, { CodeEditorSyntaxStyles } from '@rivascva/react-native-code-editor';
import  ROUTES  from "../../../constans/routes";
import { useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import API from "../../../../api.json";
import Modal from "react-native-modal";

NativeWindStyleSheet.setOutput({
    default: "native",
});

interface DetailModulScreenProps {
    route: {
      params?: {
        id?: string;
      };
    };
  }

const DetailModulScreen: React.FC<DetailModulScreenProps> = ({ route }) => {
    const modulId = route.params?.id;
    if (modulId === undefined) {
        // Handle the case where id is not available
        return (
          <View>
            <Text>Id is not available</Text>
          </View>
        );
      }
    const source = { uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf', cache: true };
    const keyboard = useKeyboard();
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();

    const [isModalVisible, setModalVisible] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [response, setResponse] = useState('');
    const [detailModul, setDetailModul] = useState<any>(null);
    const [pdfUrl, setPdfUrl] = useState('');
    const [refreshing, setRefreshing] = useState(true);

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
            console.log(newImageUrl);
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

    useEffect(() => {
        fetchData();
    }, [modulId]);

    const fetchData = async () => {
        if (modulId) {
          // Mendapatkan token dari localStorage atau sumber lainnya
          const userToken = await AsyncStorage.getItem('userToken');
            
          fetch(API.address + `/api/modul/${modulId}`, {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
            })
                .then((response) => response.json())
                .then((responJson)=>{
                    setDetailModul(responJson);
                    setPdfUrl(responJson.data.pdfPath);
                    setRefreshing(false);
                })
                .catch((error)=>{
                    console.error('Gagal mengambil data:', error);
                });
        }
      }

    return (
        <SafeAreaView className="flex-1 bg-[#EBEBEB] ">
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS == 'ios' ? 0 : 0 || Platform.OS == 'android' ? 10: 0}
        >
            
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="items-center bg-white">
                <View className="flex-row gap-3 h-[70]  bg-white px-5 py-4" >
                    <MiniPrimaryButton
                        label="Baca"
                        icon="book"
                        onPress={undefined}    
                        disabled={undefined}
                        loading={undefined}             
                    />
                    <MiniPrimaryButton
                        label="Compile"
                        icon="play-circle"
                        onPress={handleCompile}    
                        disabled={undefined}
                        loading={undefined}             
                    />
                    {detailModul ? (
                    <Text>{detailModul.data.namaModul}</Text>
                    ) : (
                        <Text>Loading...</Text>
                    )}
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
                    initialValue='#Write Your R Code Here # png("out.png", width = 800, height = 600)'
                />
            </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        </SafeAreaView>
        
    );
}

export default DetailModulScreen;