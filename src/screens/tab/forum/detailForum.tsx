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
          const userId = user?.uid;
        
          if (!userId) {
            // Handle jika pengguna tidak terotentikasi atau belum masuk
            console.error('Pengguna belum terotentikasi atau belum masuk.');
            return;
          }

          // Set up the request body as JSON
          const requestBody = {
            text: text,
            userId: userId,
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
                imagePost={detailForum.data.imageURL}
                verified={detailForum.user.verified}
                likes={detailForum.data.likes}
                id={detailForum.id}
                comments={detailForum.commentCount}           
              />
              <View className="flex-row m-auto w-full justify-center items-center  bg-white px-16 py-4">
                  <TextInput
                    className="flex-row w-full rounded-md border justify-between h-10 items-center border-gray-400 p-3 mr-3"
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