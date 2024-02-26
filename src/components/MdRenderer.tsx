import Markdown from 'react-native-markdown-display';
import { Pressable, View, Text, ScrollView } from "react-native"
import mdStyle from '../constans/mdStyle';


interface MdRenderer{
    idMarkdown: any,
    namaModul: any,
    judulModul: any,
}

const MdRenderer = ({
    idMarkdown,
    namaModul,
    judulModul,
}:MdRenderer) => {
    return(
        <ScrollView className="bg-white mt-1 px-4">
            <Text className="text-lg font-semibold text-mainGreen ">{namaModul}: {judulModul}</Text>
            <Markdown style={mdStyle}>
                {idMarkdown}
            </Markdown>
        </ScrollView>
    )
}

export default MdRenderer;