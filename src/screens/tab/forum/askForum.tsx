import { NativeWindStyleSheet } from "nativewind";
import { View, Text, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, TextInput, Image } from "react-native";
import SecondaryButton from "../../../components/button/SecondaryButton";
import PrimaryButton from "../../../components/button/PrimaryButton";
import { useState } from "react";

NativeWindStyleSheet.setOutput({
    default: "native",
});

export default () => {
    const [image, setImage] = useState(null);


    return (
        <View className="flex-1 bg-[#EBEBEB]">
        <ScrollView>
        <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={Platform.OS == 'ios' ? 25 : 0}
        >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

        <View className='w-full bg-white px-4 py-3 mt-2'>
            <View className='mt-2'>
                <Text className="text-base" >
                    Judul Topik
                </Text>
                <Text className="text-gray-400 text-xs">
                    Berikan informasi yang spesifik dan dengan konteks yang jelas.
                </Text>
                <TextInput
                    className="flex-row w-full rounded-xl border justify-between h-12 items-center border-gray-400 p-3"
                    placeholder="Contoh : Apa itu bahasa pemrogrmaan R?"
                    placeholderTextColor="#aaa"
                    value={undefined}
                    onChangeText={undefined}
                />
            </View>
            <View className='mt-3'>
                <Text className="text-base" >
                    Deskripsi Penjelasan
                </Text>
                <Text className="text-gray-400 text-xs">
                Jelaskan masalah anda sesuai dengan judul
                </Text>
                <TextInput

                    className="flex-row w-full rounded-xl border justify-between h-28 items-center border-gray-400 p-3"
                    placeholder="Topik"
                    placeholderTextColor="#aaa"
                    multiline
                    value={undefined}
                    onChangeText={undefined}
                />
            </View>
            <View className='mt-5'>
                <SecondaryButton
                    className="bg-gray-200"
                    label="Tambahkan Foto"
                    icon="photo"
                    onPress={undefined} 
                    disabled={undefined} 
                    loading={undefined}
                />
            </View>
            <View className='items-center'>
                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, marginTop: 15 }} />}
            </View>
            <View className='mt-5'>
                <PrimaryButton
                    label="Tanyakan"
                    icon={undefined}
                    onPress={undefined} 
                    disabled={undefined} 
                    loading={undefined}
                />
            </View>

        </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        </ScrollView>
    </View>
        
    );
}