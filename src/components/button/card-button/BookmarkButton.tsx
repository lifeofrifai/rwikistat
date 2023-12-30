import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

const BookmarkButton =() =>{
    const [bookmarkButton, setBookmarkButton] = React.useState(false);
    return(
        <Ionicons
            onPress={() => setBookmarkButton((isBookmark) => !isBookmark)}
            name={bookmarkButton ? "bookmark" : "bookmark-outline"}
            size={24}
            color={bookmarkButton ? "#00726B" : "black"}
        />

    )
}
export default BookmarkButton