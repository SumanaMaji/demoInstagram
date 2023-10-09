import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { Provider } from "react-redux";
import React, {useState} from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Routes from './navigation/index';
import { enableScreens } from 'react-native-screens';
import store from "./src/Redux/Store";

enableScreens();
const App = () => {
  

  return (
    <Provider store={store}>
    <Routes/>
    </Provider>
    // <SafeAreaProvider>
    // <Routes />
    // </SafeAreaProvider>
  );
};

export default App;


// import React, { useEffect } from 'react';
// import { View, Button } from 'react-native';
// import { requestExternalStoragePermission } from './utils/permissions';



// const App = () => {
// useEffect(() => {
// requestExternalStoragePermission(); // Request external storage permission
// }, []);

// const handleUpload = () => {
// const filePath = 'path_to_file'; // Replace with the actual path of the file
// const chunkSize = 1024 * 1024; // 1MB chunks
// const uploadUrl = 'https://example.com/upload';
// // Replace with your upload endpoint
// uploadFileInChunks(filePath, chunkSize, uploadUrl);
// };

// return (
// <View>
// <Button onPress={handleUpload} title='Upload File' />
// </View>
// );
// };

// export default App;


