import { Text, Pressable, ActivityIndicator } from "react-native";
import React from "react";
import FontAwesome  from  'react-native-vector-icons/FontAwesome';

interface SecondaryButton{
    className : any,
    label : any,
    icon : any,
    onPress: any,
    disabled: any,
    loading: any,
}

const SecondaryButton = ({
    className,
    label,
    icon,
    onPress,
    disabled,
    loading,
    ...props
}:SecondaryButton) => {
    return (
        <Pressable
            className="flex-row justify-center items-center px-6 py-[14] rounded-xl bg-white"
            
            onPress={onPress}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <ActivityIndicator size="small" color="#000" />
            ) : (
                <>
                    {icon && (
                        <FontAwesome
                            name={icon}
                            size={18}
                            style={{ marginRight: 10, color : "#00726B" }}
                        />
                    )}
                    <Text className=" text-base font-medium text-mainGreen">{label}</Text>
                </>
            )}
        </Pressable>
    );
};

export default SecondaryButton;