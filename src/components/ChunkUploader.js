import RNFS from 'react-native-fs';
import axios from 'axios';

const uploadFileInChunks = async (filePath, chunkSize, uploadUrl) => {
    try {
    const stats = await RNFS.stat(filePath);
    const fileSize = stats.size;
    
    let offset = 0;
    
    while (offset < fileSize) {
    const chunk = await RNFS.read(filePath, chunkSize, offset, 'base64');
    const formData = new FormData();
    formData.append('chunk', chunk);
    formData.append('offset', offset.toString());
    formData.append('totalSize', fileSize.toString());
    
    await axios.post(uploadUrl, formData, {
    headers: { 'Content-Type': 'multipart/form-data' } });
    offset += chunkSize;
    }
    console.log('Upload complete');
    } catch (error) {
    console.error('Error during chunk upload:', error);
    }
    };
const ChunkUploader = () => {
    return (
        );
    };
    
    export default PostUpload;