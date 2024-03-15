import { NativeWindStyleSheet } from "nativewind";
import { View, Text, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, TextInput } from "react-native";
import MiniPrimaryButton from "../../../components/button/MiniPrimaryButton";
import API from "../../../../api.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, FormEvent, useEffect, SetStateAction } from "react";
import auth, { firebase } from '@react-native-firebase/auth';
import { useRef } from 'react';

NativeWindStyleSheet.setOutput({
    default: "native",
});

interface ChatData {
    id: string;
      userId: string;
      message: string;
      response: string;
      timestamp: {
        _seconds: number;
        _nanoseconds: number;
      };
  
  }

export default () => {
    const [userMessage, setUserMessage] = useState("");
    const [chatData, setChatData] = useState<ChatData[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      fetchChatData();
    }, []);

    const fetchChatData = async () => {
        try {
          const storedToken = await AsyncStorage.getItem('userToken');
          const user = firebase.auth().currentUser;
          if (user) {
          const userId = user.uid;
          console.log(user)
          // Fetch data dari endpoint berdasarkan userId
          const response = await fetch(API.address + `/api/chatbot/chats/${userId}`, {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${storedToken}`,
            },
          });
    
          const chatData = await response.json();
          console.log(chatData)
  
          // // Urutkan data berdasarkan timestamp (dari yang terbaru ke yang terlama)
          // const sortedChatData = chatData.sort((a: { timestamp: number; }, b: { timestamp: number; }) => b.timestamp - a.timestamp);
  
          const sortedChatData = chatData.sort((a: { timestamp: { _seconds: number; _nanoseconds: number; };  }, b:  { timestamp: { _seconds: number; _nanoseconds: number; };  }) => {
            const dateA = new Date(a.timestamp._seconds * 1000 + a.timestamp._nanoseconds / 1000000).getTime();
            const dateB = new Date(b.timestamp._seconds * 1000 + b.timestamp._nanoseconds / 1000000).getTime();
          
            // Urutkan data berdasarkan createdAt dari yang terbaru ke yang terlama
            return dateA - dateB;
          });

          console.log('sorted', sortedChatData)
  
          // // Simpan data chat yang sudah diurutkan ke state
          setChatData(sortedChatData);
    
          // Simpan data chat ke state
          // setChatData(chatData);
          // console.log('data',chatData);
    
        }
        } catch (error) {
          console.error("Error fetching chat data:", error);
        }
      };

      const refreshChatbotData = async () => {
        await fetchChatData();
        setChatData((prevChatbotData) => [...prevChatbotData]);
      };

      const handleChatSubmit = async () => {
        console.log("Submitting chat...");
        setLoading(true);
        const storedToken = await AsyncStorage.getItem('userToken');
        // Dapatkan ID user
        const user = firebase.auth().currentUser;
        const userId = user?.uid;
        console.log(userId)
        
        // Panggil API untuk menyimpan pertanyaan dan respons
        const response = await fetch(API.address + `/api/chatbot/chat`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${storedToken}`,
          },
          body: JSON.stringify({ userId, userMessage }),
        });
    
        const data = await response.json();
        console.log(data);
    
        // Refresh data chatbot setelah submit berhasil
        await refreshChatbotData();
        setLoading(false);
      };

      const scrollViewRef = useRef();

    return (
        <View className='flex-1 justify-end bg-white'>
        {/* <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} /> */}

        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS == 'ios' ? 100 : 0 || Platform.OS == 'android' ? 10: 0}
        >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className='w-full'>
                <ScrollView
                  className='w-full mb-5'
                  ref={scrollViewRef}
                  onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
                >
                {chatData.map((chat) => (
                    <View key={chat.id} className='mt-5 '>
                        <View className='flex items-end mb-2 mr-2'>
                            <View className='bg-gray-400 px-5 py-3 rounded-l-2xl rounded-br-2xl'>
                                <Text className='text-white font-medium'>{chat.message} </Text>
                            </View>
                        </View>
                        <View className='flex items-start mb-2 mx-2'>
                            <View className='bg-mainGreen px-5 py-3 rounded-r-2xl rounded-bl-2xl'>
                                <Text className='text-white'>{chat.response}</Text>
                            </View>
                        </View>
                    </View>

                ))}
                    
                </ScrollView>
                
                <View className=" bg-gray-100 bottom-0 flex-row m-auto w-full justify-center items-center  px-[70] py-5  " >
                    <TextInput
                        className= "bg-white text-black flex-row w-full rounded-md border justify-between h-10 items-center border-gray-400 p-3 mr-3"
                        placeholder="Masukkan pesan Anda..."
                        placeholderTextColor="#aaa"
                        value={userMessage}
                        onChangeText={(text) => setUserMessage(text)}
                    />
                        <MiniPrimaryButton
                            label="Kirim"
                            icon={undefined}
                            onPress={handleChatSubmit}
                            disabled={undefined}
                            loading={loading}             
                        />
                </View>
                
            </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        </View>
        
    );
}