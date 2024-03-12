import { Text, Pressable, ActivityIndicator } from "react-native";
import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";

interface MiniPrimaryButton{
    label : any,
    icon : any,
    onPress: any,
    disabled: any,
    loading: any,
}

const MiniPrimaryButton = ({
    label,
    icon,
    onPress,
    disabled,
    loading,
    ...props
}:MiniPrimaryButton) => {
    return (
        <Pressable
            className="flex-row justify-center items-center px-6 h-full rounded-md bg-[#00726B]"
            
            onPress={onPress}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <ActivityIndicator size="small" color="#fff" />
            ) : (
                <>
                    {icon && (
                        <FontAwesome
                            name={icon}
                            size={18}
                            style={{ marginRight: 10, color : "white" }}
                        />
                    )}
                    <Text className=" text-sm font-medium text-white">{label}</Text>
                </>
            )}
        </Pressable>
    );
};

export default MiniPrimaryButton;
