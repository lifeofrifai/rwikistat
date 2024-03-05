import { NativeWindStyleSheet } from "nativewind";
import LinearGradient from 'react-native-linear-gradient';
import { View, Text, Image } from "react-native";
import React from "react";
import  ButtonSec  from "../components/button/SecondaryButton"
import { StatusBar } from 'expo-status-bar';
import {useNavigation} from '@react-navigation/native';
import ROUTES from "../constans/routes";


NativeWindStyleSheet.setOutput({
    default: "native",
});


export default () => {
    const mainGreen = "#00726B"
    const secondaryGreen = "#38B68D"
    const [loading, setLoading] = React.useState(false);
    const navigation = useNavigation();

    return (
        <LinearGradient
            colors={[secondaryGreen, mainGreen]}
            className="flex-1"
        >
            <StatusBar style="light" />
            <View className="flex-1 items-center">
                <View className="items-center w-full h-full">
                    <Image
                        source={require('../assets/images/welcome/welcome-4.png')}
                        className="w-[130] h-[130] absolute"
                        style={{transform: [
                            { translateX: -60 },
                            { translateY: 100 },
                            { rotate: "-14deg" }
                        ]}}
                    />
                    <Image
                        source={require('../assets/images/welcome/welcome-3.png')}
                        className="w-[80] h-[80] absolute"
                        style={{transform: [
                            { translateX: 90 },
                            { translateY: 70 }
                        ]}}
                    />
                    <Image
                        source={require('../assets/images/welcome/welcome-2.png')}
                        className="w-[110] h-[110] absolute"
                        style={{transform: [
                            { translateX: -140 },
                            { translateY: 280 },
                            { rotate: "18deg" }
                        ]}}
                    />
                    <Image
                        source={require('../assets/images/welcome/welcome-1.png')}
                        className="w-[180] h-[180] absolute"
                        style={{transform: [
                            { translateX: 110 },
                            { translateY: 270 },
                            { rotate: "-28deg" }
                        ]}}
                    />
                </View>
                <View className="absolute bottom-40  p-6 items-center justify-center">
                    <Text className="text-[12vw] py-6 leading-10 text-white font-bold">
                        Belajar Statistika Lebih Mudah Dengan RwikiStat
                    </Text>
                </View>
                <View className="bottom-0 mb-20 absolute w-full px-6">
                    <ButtonSec
                        className={undefined}
                        label="Belajar Sekarang"
                        icon={undefined}
                        loading={loading}
                        onPress={() => navigation.replace(ROUTES.SIGN_IN)}
                        disabled={undefined} 
                    />
                </View>
            </View>
        </LinearGradient>
    );
}