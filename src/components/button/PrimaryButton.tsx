import { Text, Pressable, ActivityIndicator } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

interface PrimaryButton{
    label : any,
    icon : any,
    onPress: any,
    disabled: any,
    loading: any,
}

const PrimaryButton = ({
    label,
    icon,
    onPress,
    disabled,
    loading,
    ...props
}:PrimaryButton) => {
    return (
        <Pressable
            className="flex-row justify-center px-6 py-[14] rounded-xl bg-[#00726B]"
            
            onPress={onPress}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <ActivityIndicator size="small" color="#000" />
            ) : (
                <>
                    {/* {icon && (
                        <FontAwesome
                            name={icon}
                            size={18}
                            style={{ marginRight: 10, color : "white" }}
                        />
                    )} */}
                    <Text className=" text-base font-medium text-white">{label}</Text>
                </>
            )}
        </Pressable>
    );
};

export default PrimaryButton;
