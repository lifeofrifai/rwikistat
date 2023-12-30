

import { NativeWindStyleSheet } from "nativewind";
import { View, Text, ScrollView } from "react-native";

NativeWindStyleSheet.setOutput({
    default: "native",
});

export default () => {
    return (
        <View className="flex-1 items-center justify-center bg-[#EBEBEB] ">
            <ScrollView className="w-full px-5 pt-6">
                <Text>My Post</Text>
            </ScrollView>
        </View>
        
    );
}