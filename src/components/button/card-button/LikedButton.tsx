import React, { useEffect, useState } from "react";
import { View, Text } from "react-native"
import AntDesign from 'react-native-vector-icons/AntDesign';
import auth, { firebase } from '@react-native-firebase/auth';
import API from "../../../../api.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useToast } from "react-native-toast-notifications";

const LikedButton: React.FC<{ itemId: string }> =({ itemId }) =>{
    const [likedButton, setLikedButton] = React.useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Periksa apakah pengguna telah menyukai postingan
        handleIsLiked(itemId);
      }, [itemId]);

    const handleIsLiked = async (itemId: string) => {
        try {
          const user = firebase.auth().currentUser;
          const userId = user?.uid; // Get the user ID from the authentication object
      
          if (userId) {
            const userToken = await AsyncStorage.getItem('userToken');
            fetch(API.address + `/api/forum/like/${itemId}/is-liked?uid=${userId}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                }
            })
            .then((response) => response.json())
            .then((responJson)=>{
                const { isLiked } = responJson;
                setLikedButton(isLiked);
                setIsLoading(false);
            })
          } else {
            // Pengguna belum masuk, jangan lakukan apa-apa
            setIsLoading(false);
          }
        } catch (error) {
          console.error('Gagal mengambil like:', error);
          setIsLoading(false);
        }
      }

    const handleLike = async (itemId: string) => {
        try {
          const user = firebase.auth().currentUser;
          const userId = user?.uid; // Get the user ID from the authentication object
            console.log("user",userId);
          if (userId) {
            if (userId) {
                const userToken = await AsyncStorage.getItem('userToken');

                const requestBody = {
                    uid: userId,
                    // Add other request body parameters if needed
                  };
                fetch(API.address + `/api/forum/like/${itemId}`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                        'Content-Type': 'application/json', // Set content type to JSON
                      },
                      body: JSON.stringify(requestBody),
                })
                .then((response) => response.json())
                .then((responJson)=>{
                    console.log('API Response:', responJson);
                    setLikedButton(true);
                    setIsLoading(false);
                    toast.show("Postingan Disukai", { duration: 2000, type: "success" })
                })
              } else {
                // Pengguna belum masuk, jangan lakukan apa-apa
                setIsLoading(false);
              }
          } else {
            // Pengguna belum masuk, jangan lakukan apa-apa
          }
        } catch (error) {
          console.error('Gagal menyukai postingan:', error);
        }
      };
      
      const handleUnlike = async (itemId: string) => {
        try {
            const user = firebase.auth().currentUser;
            const userId = user?.uid; // Get the user ID from the authentication object
              console.log("user",userId);
            if (userId) {
              if (userId) {
                  const userToken = await AsyncStorage.getItem('userToken');
  
                  const requestBody = {
                      uid: userId,
                      // Add other request body parameters if needed
                    };
                  fetch(API.address + `/api/forum/unlike/${itemId}`, {
                      method: 'POST',
                      headers: {
                          Authorization: `Bearer ${userToken}`,
                          'Content-Type': 'application/json', // Set content type to JSON
                        },
                        body: JSON.stringify(requestBody),
                  })
                  .then((response) => response.json())
                  .then((responJson)=>{
                      console.log('API Response:', responJson);
                      setLikedButton(false);
                      setIsLoading(false);
                      toast.show("Batal Menyukai Postingan", { duration: 2000, type: "success" })
                  })
                } else {
                  // Pengguna belum masuk, jangan lakukan apa-apa
                  setIsLoading(false);
                }
            } else {
              // Pengguna belum masuk, jangan lakukan apa-apa
            }
          } catch (error) {
            console.error('Gagal menyukai postingan:', error);
          }
        };

    // Determine the handler based on whether the post is liked or not
    const onPressHandler = likedButton ? handleUnlike : handleLike;
    const toast = useToast();
    return(
        

        <View className="flex-row items-center">
            <AntDesign
                // onPress={() => setLikedButton((isLiked) => !isLiked)}
                // onPress={() => handleUnlike(itemId)}
                onPress={() => {
                  onPressHandler(itemId)
                  
                }}
                name={likedButton ? "like1" :  "like2"}
                size={24}
                color={likedButton ? "#00726B" : "black"}
                // id={itemId} 
            />
        </View>

    )
}
export default LikedButton