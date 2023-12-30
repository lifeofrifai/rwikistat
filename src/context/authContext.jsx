"use client";
import React, { useContext, createContext, useEffect, useState, ReactNode } from 'react';
import { signInWithRedirect, signOut, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, getAuth } from 'firebase/auth';
// import { auth } from '../../firebase';
import {useNavigation} from '@react-navigation/native';
import ROUTES from "../constans/routes";
import { GoogleSignin,statusCodes } from '@react-native-google-signin/google-signin';
// import { auth } from '../../firebase';



const API_HOST = 'https://rest-api-zzvthujxxq-as.a.run.app'; // Ganti dengan host Anda jika berbeda
const API_PORT = 3000;

const AuthContext = createContext(undefined);

const AUTO_LOGOUT_TIME = 6 * 60 * 60 * 1000;

export const AuthContextProvider = ({ children }) => {
  
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

useEffect(() => { GoogleSignin.configure(
  {
    webClientId: '72157531364-9c72l1rst20td0704jfs20t9km8ois9a.apps.googleusercontent.com',
    
  });
 });



  const googleSignIn = async() => {
    try {
        
            await GoogleSignin.hasPlayServices();
            console.log("reached google sign in");
            const userInfo = await GoogleSignin.signIn();
            const signedInUser = userInfo.user;

            const userData = {
              email: signedInUser.email || '',
              role: 'user',
              uid: signedInUser.id,
              displayName: signedInUser.name || '',
              photoURL: signedInUser.photo|| '',
            };
      
            await sendUserDataToServer(userData);
            setUser(signedInUser);
      navigation.navigate(ROUTES.MODUL)
            console.log(signedInUser);
    } catch (error) {
        console.log(error);
    }
}

 

  const sendUserDataToServer = async (userData) => {
    try {
      const response = await fetch(`${API_HOST}/google-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        console.log('Data pengguna berhasil disimpan di server.');
      } else {
        console.error('Gagal mengirim data pengguna ke server.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const emailSignIn = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const signedInUser = result.user;
      setUser(signedInUser);
      // console.log('Login Sukses');
      console.log(signedInUser);
      handleLoginSuccess(email, password);
      navigation.navigate(ROUTES.MODUL)
    } catch (error) {
      const authError = error;
      console.error('Gagal masuk dengan email dan password:', authError.message);
    }
  };

  const handleLoginSuccess = async (email, password) => {
    try {
      const requestBody = {
        email: email,
        password: password,
      };

      const response = await fetch(`${API_HOST}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.json();
        const customToken = data.customToken;
        console.log(data)
        // console.log('Custom Token:', customToken);
      } else {
        // Tangani kesalahan jika ada
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigation.navigate(ROUTES.SIGN_IN)
    } catch (error) {
      const authError = error;
      console.error('Gagal keluar:', authError.message);
    }
  };

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser);
  //   });

  //   const autoLogoutTimeout = setTimeout(() => {
  //     logOut();
  //   }, AUTO_LOGOUT_TIME);

  //   return () => {
  //     unsubscribe();
  //     clearTimeout(autoLogoutTimeout);
  //   };
  // }, []);

  return (
    <AuthContext.Provider value={{ user, googleSignIn, emailSignIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return context;
};
