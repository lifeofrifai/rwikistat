import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import RNFS from 'react-native-fs';
import { encode as base64Encode } from 'base-64';

const BlobImageViewer = ({ blobData }) => {
    const [imageUri, setImageUri] = useState(null);

    useEffect(() => {
        // Convert blobData to base64 string
        const base64String = base64Encode(blobData);
    
        // Create data URI
        const dataUri = `data:image/png;base64,${base64String}`;
    
        // Set the image URI to display
        setImageUri(dataUri);
    }, [blobData]);
    
    return (
        <View>
            {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />}
        </View>
    );
  };
  
  export default BlobImageViewer;
  