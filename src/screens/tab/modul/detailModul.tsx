import { NativeWindStyleSheet } from "nativewind";
import { View, Text, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Image } from "react-native";
import MiniPrimaryButton from "../../../components/button/MiniPrimaryButton";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useKeyboard } from "@react-native-community/hooks";
import { useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import API from "../../../../api.json";
import { createStackNavigator } from "@react-navigation/stack";
import MdRenderer from "../../../components/MdRenderer";
import { FloatingAction } from "react-native-floating-action";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ROUTES from "../../../constans/routes";

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
      
    const Stack = createStackNavigator();
    const keyboard = useKeyboard();
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();

    const [isModalVisible, setModalVisible] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [response, setResponse] = useState('');
    const [detailModul, setDetailModul] = useState<any>(null);
    const [pdfUrl, setPdfUrl] = useState('');
    const [refreshing, setRefreshing] = useState(true);


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

      const Action = [
        {
          text: "Compiler",
          icon: <MaterialCommunityIcons name='eye' size={20} color="#fff" />,
          name: "bt_compiler",
          position: 2,
          screen : "ROUTES.COMPILER_MODULE"
        },
        {
          text: "Shinny Compiler",
          icon: <MaterialCommunityIcons name='eye' size={20} color="#fff" />,
          name: "bt_shinny_compiler",
          position: 1,
          screen : "ROUTES.COMPILER_MODULE"
        }
      ];

    return (
      <SafeAreaView className="flex-1 bg-[#EBEBEB]">
        {detailModul? (
        <SafeAreaView>
          <MdRenderer
            idMarkdown={detailModul.data.textData} 
            namaModul={detailModul.data.namaModul} 
            judulModul={detailModul.data.judulModul}  
          />
          <FloatingAction
            actions={Action}
            color="#00726B"
            floatingIcon={<MaterialCommunityIcons name='code-braces' size={26} color="#fff" />}
            onPressItem={(screen: any) => {
              console.log(`selected button: ${screen}`);
            }}
          />
        </SafeAreaView>
        ) : (
          <View className="justify-center items-center">
            <Text className="text-black">No data</Text>
          </View>
        )}
      </SafeAreaView>
        
    );
}

export default DetailModulScreen;