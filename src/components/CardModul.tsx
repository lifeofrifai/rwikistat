import LinearGradient from 'react-native-linear-gradient';
import { Pressable, View, Text } from "react-native"


interface CardModul{
    title: any,
    desc: any,
    onPress: any,
}

const CardModul = ({
    title,
    desc,
    onPress
}:CardModul) => {
    return(
        <Pressable
                onPress={onPress}
                className="mb-2 mt-3"
            >
            <LinearGradient
                colors={['#38B68D', '#00726B']}
                className=" rounded-lg px-4 pb-4 pt-14"
            >
                <View >
                    <Text className="text-white font-bold text-3xl">{title}:</Text>
                    <Text className="text-white font-medium text-xl capitalize">{desc}</Text>
                </View>
            
            </LinearGradient>
        </Pressable>
    )
}

export default CardModul;