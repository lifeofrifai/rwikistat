import React, { useEffect } from "react";
import { View, Text, SafeAreaView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, TextInput } from "react-native";
import ButtonMain from "./button/PrimaryButton";
import ButtonSec from "./button/SecondaryButton";
import {useNavigation} from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import ROUTES from "../constans/routes";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { GoogleSignin,statusCodes } from '@react-native-google-signin/google-signin';
import { UserAuth } from '../context/authContext';
// import auth from '@react-native-firebase/auth';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';


export default () => {
    const [loading, setLoading] = React.useState(false);
    const [nim, setNim] = React.useState('');
    const [password, setPassword] = React.useState('');

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '72157531364-9c72l1rst20td0704jfs20t9km8ois9a.apps.googleusercontent.com', 
          });
    }, [])



    const {user, googleSignIn,emailSignIn} = UserAuth();

    const handleGoogleSignIn = async() => {
        try {
            await googleSignIn();
        } catch (error) {
            console.log(error);
        }
    }

    const handleNimChange = (text) => {
        setNim(text);
      };
    
    
      const handlePasswordChange = (text) => {
        setPassword(text);
      };

      const email = `${nim}@example.com`;

      const handleEmailSignIn = async (e) => {
        e.preventDefault(); // Menghentikan perilaku bawaan form
        try {
          await emailSignIn(email, password);
        } catch (error) {
          console.error(error);
        }
      };



    const [showPassword, setShowPassword] = React.useState(false);
    const toggleShowPassword = () => { 
        setShowPassword(!showPassword); 
    }; 
    const navigation = useNavigation();
    
    return (
        <SafeAreaView className="flex-1 justify-center bg-white">
        <StatusBar style="dark" />
        <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={Platform.OS == 'ios' ? 25 : 0}
        >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="px-6 gap-10" >
                <View>
                    <Text
                        className="text-mainGreen font-bold"
                        style={{fontSize: 45, lineHeight: 43}}
                    >
                        Selamat Datang Statistikawan
                    </Text>
                    <Text className=" text-gray-400 text-base">
                    Hallo 👋 ayo semangat belajar!
                    </Text>
                </View>
                <View>
                <View>
                        <Text className="text-base" >
                            NIM/NPM
                        </Text>
                        <TextInput
                            className="flex-row w-full rounded-xl border justify-between h-14 items-center border-gray-400 p-3"
                            placeholder="Masukan NIM/NPM"
                            placeholderTextColor="#aaa"
                            keyboardType="numeric"
                            onChangeText={handleNimChange}
                            value={nim}
                        />
                    </View>
                    <View className="mt-4 mb-10" >
                        <Text className="text-base" >
                            Kata Sandi
                        </Text>
                        <View className="flex-row w-full rounded-xl border justify-between h-14 items-center border-gray-400">
                            <TextInput
                                className="w-[80%] h-14 p-3"
                                secureTextEntry={!showPassword} 
                                value={password} 
                                onChangeText={handlePasswordChange} 
                                placeholder="Masukan Kata Sandi"
                                placeholderTextColor="#aaa"
                            />
                            <MaterialCommunityIcons
                                name={showPassword ? 'eye-off' : 'eye'} 
                                size={24} 
                                color="#aaa" 
                                onPress={toggleShowPassword} 
                                style={{marginRight: 12}}
                            />
                        </View>
                    </View>
                    <ButtonMain
                        label="Masuk Sebagai Mahasiswa USK"
                        icon={undefined}
                        loading={loading}
                        onPress={handleEmailSignIn}
                        disabled={undefined}     
                    />
                </View>
                <View>
                    <Text className="text-center text-gray-400" >
                    bukan mahasiswa USK?
                    </Text>
                </View>
                <ButtonSec
                    className="bg-gray-100"
                    label="Masuk Dengan Google"
                    icon="google"
                    loading={loading}
                    onPress={handleGoogleSignIn}
                    disabled={undefined} 
                    
                />
            </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        </SafeAreaView>
    )
}