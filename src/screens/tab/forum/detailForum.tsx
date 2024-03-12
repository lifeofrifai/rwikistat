import { NativeWindStyleSheet } from "nativewind";
import { View, Text, ScrollView, TextInput, ActivityIndicator } from "react-native";
import { ToastProvider } from "react-native-toast-notifications";
import ForumPost from "../../../components/ForumPost";
import MiniPrimaryButton from "../../../components/button/MiniPrimaryButton";
import { FormEvent, useEffect, useState } from "react";
import API from "../../../../api.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from '@react-navigation/native';
import CommentPost from "../../../components/CommentPost";
import auth, { firebase } from '@react-native-firebase/auth';

NativeWindStyleSheet.setOutput({
    default: "native",
});

interface DetailForumScreenProps {
    route: { 
      params?: {
        id?: string;
      };
    };
  }

const DetailForumScreen: React.FC<DetailForumScreenProps> = ({ route }) => {
    const id = route.params?.id;
    if (id === undefined) {
        // Handle the case where id is not available
        return (
          <View>
            <Text>Id is not available</Text>
          </View>
        );
      }
    const [commentInput, setCommentInput] = useState({
        text: '',
        userId: '', // Tambahkan data pengguna saat ini jika diperlukan
    });
    const [detailForum, setDetailForum] = useState<any>(null); // State untuk data detail modul
    const [comments, setComments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Memanggil fetchData untuk mengambil data awal
        fetchData();
    }, []);

    const fetchData = async () => {
        if (id) {
            const userToken = await AsyncStorage.getItem('userToken');
          // Lakukan permintaan ke API untuk mendapatkan data detail modul berdasarkan ID
          fetch(API.address + `/api/forum/${id}`, {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        })
            .then((response) => {
              if (!response.ok) {
                throw new Error('Gagal mengambil data postingan.');
              }
              return response.json();
            })
            .then((data) => {
              setDetailForum(data); // Menyimpan data detail modul dalam state
            })
            .catch((error) => {
              console.error('Gagal mengambil data postingan:', error);
            });
    
            fetch(API.address + `/api/forum/${id}/comments`, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            })
            .then((response) => {
              if (!response.ok) {
                throw new Error('Gagal mengambil komentar.');
              }
              return response.json();
            })
            .then((data) => {
              // Mengurutkan komentar berdasarkan waktu terbaru
              const sortedComments = data.sort((a: { data: { createdAt: { _seconds: number; _nanoseconds: number; }; }; }, b: { data: { createdAt: { _seconds: number; _nanoseconds: number; }; }; }) => {
                const dateA = new Date(a.data.createdAt._seconds * 1000 + a.data.createdAt._nanoseconds / 1000000).getTime();
                const dateB = new Date(b.data.createdAt._seconds * 1000 + b.data.createdAt._nanoseconds / 1000000).getTime();
              
                // Urutkan data berdasarkan createdAt dari yang terbaru ke yang terlama
                return dateB - dateA;
              });
      
              setComments(sortedComments); // Menyimpan data komentar yang telah diurutkan dalam state
            })
            .catch((error) => {
              console.error('Gagal mengambil komentar:', error);
            });
        }
      }

      const handleCommentInputChange = (name: string, value: string) => {
        setCommentInput({
          ...commentInput,
          [name]: value,
        });
      };

      const handleCommentSubmit = async (event: FormEvent, id: string) => {
        event.preventDefault();
        try {
          const { text } = commentInput;
          console.log("komen: ",text)
        
          // Dapatkan ID pengguna yang aktif (dalam hal ini, kita asumsikan pengguna sudah login)
          const user = firebase.auth().currentUser;
          const uid = user?.uid;
        
          if (!uid) {
            // Handle jika pengguna tidak terotentikasi atau belum masuk
            console.error('Pengguna belum terotentikasi atau belum masuk.');
            return;
          }

          // Set up the request body as JSON
          const requestBody = {
            text: text,
            uid: uid,
          };
        
          // Kirim komentar ke endpoint Express dengan ID pengguna yang aktif
          const userToken = await AsyncStorage.getItem('userToken');
          const response = await fetch(API.address + `/api/forum/${id}/comments`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userToken}`,
            },
            body: JSON.stringify(requestBody),
          });
          console.log(response)
        
          
            // Clear the comment input after a successful submission
            setCommentInput({
              text: '',
              userId: '',
            });
      
            // Refresh comments data after a successful submission
            fetch(API.address + `/api/forum/${id}/comments`, {
              headers: {
                  Authorization: `Bearer ${userToken}`,
              },
          })
              .then((response) => response.json())
              .then((data) => {
                setComments(data); // Update comments with the latest data
              })
              .catch((error) => {
                console.error('Gagal mengambil komentar:', error);
              });
          
        } catch (error) {
          console.error('Gagal menambahkan komentar:', error);
        }
        
      };

    // {
    //   "commentCount": 0,
    //    "data": {
    //     "createdAt": {
    //       "_nanoseconds": 769000000, 
    //       "_seconds": 1707998291
    //     }, 
    //     "images": ["https://storage.googleapis.com/rwikistat-2f82f.appspot.com/images/P2kFxWIV6DzbAId3FVsE/Backdrop-Nobar.jpg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=firebase-adminsdk-gvqe2%40rwikistat-2f82f.iam.gserviceaccount.com%2F20240215%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240215T115816Z&X-Goog-Expires=86400&X-Goog-SignedHeaders=host&X-Goog-Signature=84dee67c2b8999a7e0382e3e9bc13472fa04e138794005a0464663c6f35b28edce96e3452f51a905cf558c4f3f3d60aa6598c72710ba983ce9bb572a7cca9d9bd5b8ec4b0f374fe9f3c55488af6169e4d2c67ad3c38ad6fb6d930949ed3a22cd50783a20fc7678e91c94b5a828c0ed519346888264a0f35dd4e15df604b3b3812633e7eb9b57b2bbd1e403725e601a2f8dcad0afe124e516d1d54d2b5bd2004080381abd440477fcd3bd28e4b13b5de84183ff589456edd5d98b0737e4c4378e6ffdd53402f70e9ff78e06f6039f6d9a81358508779438632fe45bd363db09dfbfe2d0015af271fae910efcf6755146a75652d1eea89e96e14457b541eaaf1ad"], 
    //     "likes": 0, 
    //     "title": "liat foto", 
    //     "topics": "foto", 
    //     "userId": "Szx4BvDBVDfbGwOtDuEoBXMVvyt2"
    //   }, 
    //     "id": "P2kFxWIV6DzbAId3FVsE", 
    //     "user": {
    //       "displayName": "Rwikistat", 
    //       "email": "rwikistat@gmail.com", 
    //       "photoURL": "https://lh3.googleusercontent.com/a/ACg8ocKAuEkaBrnfZeyNP1l1D4sv2XIrFOrOa5isqAvi8-93=s96-c", 
    //       "role": "user", 
    //       "score": 153,
    //       "verified": true
    //     }
    // }

    // console.log("URL Image Postingan: ",detailForum.data.images[0])
    // console.log("Profile Pengguna: ",detailForum.user.photoURL)

    return (
        <ToastProvider>
        <View className="flex-1 items-center bg-[#EBEBEB] ">
            {detailForum ? (
            <ScrollView className="w-full">
            <ForumPost
                imageProfile={detailForum.user.photoURL}
                namePost={detailForum.user.displayName}
                timePost={detailForum.data.createdAt._seconds}
                titlePost={detailForum.data.title}
                descPost={detailForum.data.topics}
                onPressPost={undefined}
                onPressProfile={undefined}
                imagePost={detailForum.data.images[0]}
                verified={detailForum.user.verified}
                likes={detailForum.data.likes}
                id={detailForum.id}
                comments={detailForum.commentCount}
              />
              <View className="flex-row m-auto w-full justify-center items-center  bg-white px-16 py-4">
                  <TextInput
                    className="flex-row w-full rounded-md border justify-between h-10 items-center border-gray-400 p-3 mr-3 text-black"
                    placeholder="Tambahkan Komentar..."
                    placeholderTextColor="#aaa"
                    value={commentInput.text}
                    onChangeText={(text) => handleCommentInputChange('text', text)}
                  />
                  <MiniPrimaryButton
                    label="Kirim"
                    icon={undefined}
                    onPress={(event: React.FormEvent<Element>) => handleCommentSubmit(event, detailForum.id)} 
                    disabled={undefined}
                    loading={undefined}             
                  />
              </View>
              {comments.length > 0 ? (
                <View className="w-full bg-white px-4 mt-2 py-4">
                {comments.map((comment: any) => (
                    <CommentPost
                        key={comment.id}
                        imageProfile={comment.user.photoURL}
                        nameComment={comment.user.displayName}
                        verified={comment.user.verified}
                        timeComment={comment.data.createdAt._seconds}
                        comment={comment.data.text}         
                    />
                    ))}
                </View>
                ) : null}
            </ScrollView>
            ) : (
                <View className="flex-1 justify-center items-center">
                  <ActivityIndicator size="large" color="#00726B"/>
                </View>
            )}
        </View>
        </ToastProvider>
        
    );
}

export default DetailForumScreen;