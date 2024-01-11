import React, { useEffect } from "react";
import { View, Text, SafeAreaView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, TextInput, Alert } from "react-native";
import ButtonMain from "../../components/button/PrimaryButton";
import ButtonSec from "../../components/button/SecondaryButton";
import {useNavigation} from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import ROUTES from "../../constans/routes";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { GoogleSignin,statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useToast, ToastProvider } from "react-native-toast-notifications";


export default () => {
    const [loading, setLoading] = React.useState(false);
    const [nim, setNim] = React.useState('');
    const [password, setPassword] = React.useState('');

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '72157531364-9c72l1rst20td0704jfs20t9km8ois9a.apps.googleusercontent.com', // client ID of type WEB for your server. Required to get the idToken on the user object, and for offline access.
            });
    });

    const onGoogleButtonPress = async () => {
        try {
          // Check if your device supports Google Play
          await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
          // Get the users ID token
          const { idToken, user } = await GoogleSignin.signIn();
          console.log("Google User data:", user);
      
          // Create a Google credential with the token
          const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      
          // Sign-in the user with the credential
          const userCredential = await auth().signInWithCredential(googleCredential);
      
          // Mengambil ID token dari pengguna
          const googleUser = userCredential.user;
          // Mengambil ID token dari pengguna
          googleUser.getIdToken()
          .then((idToken) => {
            console.log("User token:", idToken);
  
            // Simpan token ke AsyncStorage atau state jika diperlukan
            AsyncStorage.setItem('userToken', idToken);
  
            // Navigasi ke halaman selanjutnya
            navigation.navigate(ROUTES.MODUL);
          })
          .catch((error) => {
            console.error("Error getting user token:", error);
            // Handle error
          });
        } catch (error) {
          console.log("Google Sign-In Error:", error);
          // Handle error
        }
      };
      


    const [showPassword, setShowPassword] = React.useState(false);
    const toggleShowPassword = () => { 
        setShowPassword(!showPassword); 
    }; 
    const navigation = useNavigation();

    const handleNimChange = (text) => {
        setNim(text);
      };
    
    
      const handlePasswordChange = (text) => {
        setPassword(text);
      };

      const email = `${nim}@example.com`;

    // const loginWithEmailAndPassword = () => {
    //     auth().signInWithEmailAndPassword(email, password)
    //     .then((res)=> 
    //         {console.log(res)
    //         // Alert.alert("Berhasil Masuk")
    //         navigation.navigate(ROUTES.MODUL)
    //     })
    //     .catch(err=>{
    //         console.log(err)
    //         Alert.alert(err.nativeErrorMessage)
    //     })
    // };

    const loginWithEmailAndPassword = () => {
        auth().signInWithEmailAndPassword(email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log("User data:", user);
      
            // Mengambil ID token dari pengguna
            user.getIdToken()
              .then((idToken) => {
                console.log("User token:", idToken);
      
                // Simpan token ke AsyncStorage atau state jika diperlukan
                AsyncStorage.setItem('userToken', idToken);
      
                // Navigasi ke halaman selanjutnya
                navigation.navigate(ROUTES.MODUL);
              })
              .catch((error) => {
                console.error("Error getting user token:", error);
                toast.show("Password atau NIM Salah", { duration: 2000, type: "success" })
                // Handle error
              });
          })
          .catch((error) => {
            console.error("Error signing in (salah):", error);
            Alert.alert(error.nativeErrorMessage);
            toast.show("Password atau NIM Salah", { duration: 2000, type: "success" })
          });
      };

      const toast = useToast();
    
    return (
        <ToastProvider>
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
                        onPress={loginWithEmailAndPassword}
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
                    onPress={onGoogleButtonPress}
                    disabled={undefined} 
                    
                />
            </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        </SafeAreaView>
        </ToastProvider>
    )
}