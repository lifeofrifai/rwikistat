import { Pressable, View, Text } from "react-native"
import { Ionicons, AntDesign } from '@expo/vector-icons'; 

interface SettingButton{
    icon: any,
    title: any,
    iconColor: any,
    onPress: any,
}

const SettingButton = ({
    icon,
    title,
    iconColor,
    onPress
}:SettingButton) => {
    return(
        <Pressable
            className="rounded-lg flex-row px-3 py-2 items-center justify-between"
            onPress={onPress}
        >
            <View className="flex-row items-center gap-x-3">
                {/* <Ionicons name={icon} size={28} color={iconColor} /> */}
                <Text className="text-gray-600 text-base">
                    {title}
                </Text>
            </View>
            {/* <AntDesign name="right" size={20} color={iconColor} /> */}
        </Pressable>
    )
}

export default SettingButton;