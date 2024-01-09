import { NativeWindStyleSheet } from "nativewind";
import { View, Text, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, TextInput } from "react-native";
import MiniPrimaryButton from "../../../components/button/MiniPrimaryButton";

NativeWindStyleSheet.setOutput({
    default: "native",
});

export default () => {
    return (
        <SafeAreaView className='flex-1 justify-end bg-white'>
        {/* <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} /> */}

        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS == 'ios' ? 100 : 0 || Platform.OS == 'android' ? 10: 0}
        >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className='w-full'>
                <ScrollView className='w-full mb-5'>
                    <View className='mt-5 '>
                        <View className='flex items-end mb-2 mr-2'>
                            <View className='bg-gray-300 px-5 py-3 rounded-l-2xl rounded-br-2xl'>
                                <Text className=''>Halo Apa Kabar </Text>
                            </View>
                        </View>
                        <View className='flex items-start mb-2 ml-2'>
                            <View className='bg-emerald-600 px-5 py-3 rounded-r-2xl rounded-bl-2xl'>
                                <Text className=''>Hari ini Kabar saya baik, kenapa kamu nanya nanya kabr saya</Text>
                            </View>
                        </View>
                    </View>

                    <View className='mt-5 '>
                        <View className='flex items-end mb-2 mr-2'>
                            <View className='bg-gray-300 px-5 py-3 rounded-l-2xl rounded-br-2xl'>
                                <Text className=''>Halo Apa Kabar </Text>
                            </View>
                        </View>
                        <View className='flex items-start mb-2 ml-2'>
                            <View className='bg-emerald-600 px-5 py-3 rounded-r-2xl rounded-bl-2xl'>
                                <Text className=''>Hari ini Kabar saya baik, kenapa kamu nanya nanya kabr saya</Text>
                            </View>
                        </View>
                    </View>

                    <View className='mt-5 '>
                        <View className='flex items-end mb-2 mr-2'>
                            <View className='bg-gray-300 px-5 py-3 rounded-l-2xl rounded-br-2xl'>
                                <Text className=''>Halo Apa Kabar </Text>
                            </View>
                        </View>
                        <View className='flex items-start mb-2 ml-2'>
                            <View className='bg-emerald-600 px-5 py-3 rounded-r-2xl rounded-bl-2xl'>
                                <Text className=''>Hari ini Kabar saya baik, kenapa kamu nanya nanya kabr saya</Text>
                            </View>
                        </View>
                    </View>

                    <View className='mt-5 '>
                        <View className='flex items-end mb-2 mr-2'>
                            <View className='bg-gray-300 px-5 py-3 rounded-l-2xl rounded-br-2xl'>
                                <Text className=''>Halo Apa Kabar </Text>
                            </View>
                        </View>
                        <View className='flex items-start mb-2 ml-2'>
                            <View className='bg-emerald-600 px-5 py-3 rounded-r-2xl rounded-bl-2xl'>
                                <Text className=''>Hari ini Kabar saya baik, kenapa kamu nanya nanya kabr saya</Text>
                            </View>
                        </View>
                    </View>
                    <View className='mt-5 '>
                        <View className='flex items-end mb-2 mr-2'>
                            <View className='bg-gray-300 px-5 py-3 rounded-l-2xl rounded-br-2xl'>
                                <Text className=''>Halo Apa Kabar </Text>
                            </View>
                        </View>
                        <View className='flex items-start mb-2 ml-2'>
                            <View className='bg-emerald-600 px-5 py-3 rounded-r-2xl rounded-bl-2xl'>
                                <Text className=''>Hari ini Kabar saya baik, kenapa kamu nanya nanya kabr saya</Text>
                            </View>
                        </View>
                    </View>
                    <View className='mt-5 '>
                        <View className='flex items-end mb-2 mr-2'>
                            <View className='bg-gray-300 px-5 py-3 rounded-l-2xl rounded-br-2xl'>
                                <Text className=''>Halo Apa Kabar </Text>
                            </View>
                        </View>
                        <View className='flex items-start mb-2 ml-2'>
                            <View className='bg-emerald-600 px-5 py-3 rounded-r-2xl rounded-bl-2xl'>
                                <Text className=''>Hari ini Kabar saya baik, kenapa kamu nanya nanya kabr saya</Text>
                            </View>
                        </View>
                    </View>
                    <View className='mt-5 '>
                        <View className='flex items-end mb-2 mr-2'>
                            <View className='bg-gray-300 px-5 py-3 rounded-l-2xl rounded-br-2xl'>
                                <Text className=''>Halo Apa Kabar </Text>
                            </View>
                        </View>
                        <View className='flex items-start mb-2 ml-2'>
                            <View className='bg-emerald-600 px-5 py-3 rounded-r-2xl rounded-bl-2xl'>
                                <Text className=''>Harasasmu nanya nanya kabr saya</Text>
                            </View>
                        </View>
                    </View>
                    
                </ScrollView>
                
                <View className=" bg-gray-100 bottom-0 flex-row m-auto w-full justify-center items-center  px-[70] py-5  " >
                    <TextInput
                        className= "flex-row w-full rounded-md border justify-between h-10 items-center border-gray-400 p-3 mr-3"
                        placeholder="Masukkan pesan Anda..."
                        placeholderTextColor="#aaa"
                    />
                        <MiniPrimaryButton
                            label="Kirim"
                            icon={undefined}
                            onPress={undefined}
                            disabled={undefined}
                            loading={undefined}             
                        />
                </View>
                
            </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        </SafeAreaView>
        
    );
}