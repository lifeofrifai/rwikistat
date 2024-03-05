import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import auth, { firebase } from '@react-native-firebase/auth';
import API from "../../../../api.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useToast } from "react-native-toast-notifications";

const BookmarkButton:React.FC<{ itemId: string }> =({ itemId }) =>{
    const [bookmarkButton, setBookmarkButton] = React.useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Periksa apakah pengguna telah menyukai postingan
        handleIsBookmarked(itemId);
      }, [itemId]);

    const handleIsBookmarked = async (itemId: string) => {
        try {
          const user = firebase.auth().currentUser;
          const uid = user?.uid; // Get the user ID from the authentication object
      
          if (uid) {
            const userToken = await AsyncStorage.getItem('userToken');
            fetch(API.address + `/api/forum/bookmark/${itemId}/is-bookmarked?uid=${uid}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                }
            })
            .then((response) => response.json())
            .then((responJson)=>{
                const { isBookmarked } = responJson;
                setBookmarkButton(isBookmarked);
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

      const handleBookmark = async (itemId: string) => {
        try {
          const user = firebase.auth().currentUser;
          const uid = user?.uid; // Get the user ID from the authentication object
            console.log("user",uid);
          if (uid) {
            if (uid) {
                const userToken = await AsyncStorage.getItem('userToken');

                const requestBody = {
                    uid: uid,
                    // Add other request body parameters if needed
                  };
                fetch(API.address + `/api/forum/bookmark/${itemId}`, {
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
                    setBookmarkButton(true);
                    setIsLoading(false);
                    toast.show("Menyimpan Postingan", { duration: 2000, type: "success" })
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
      
      const handleUnbookmark = async (itemId: string) => {
        try {
            const user = firebase.auth().currentUser;
            const uid = user?.uid; // Get the user ID from the authentication object
              console.log("user",uid);
            if (uid) {
              if (uid) {
                  const userToken = await AsyncStorage.getItem('userToken');
  
                  const requestBody = {
                      uid: uid,
                      // Add other request body parameters if needed
                    };
                  fetch(API.address + `/api/forum/unbookmark/${itemId}`, {
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
                      setBookmarkButton(false);
                      setIsLoading(false);
                      toast.show("Batal Menyimpan Postingan", { duration: 2000, type: "success" })
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
    const onPressHandler = bookmarkButton ? handleUnbookmark : handleBookmark;
    const toast = useToast();

    return(
        <Ionicons
            onPress={() => onPressHandler(itemId)}
            name={bookmarkButton ? "bookmark" : "bookmark-outline"}
            size={24}
            color={bookmarkButton ? "#00726B" : "black"}
        />

    )
}
export default BookmarkButton