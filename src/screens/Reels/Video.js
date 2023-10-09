import moment from 'moment';
import {Icon, Left, ListItem, Right, NativeBaseProvider} from 'native-base';
import React, {useState, useEffect} from 'react';
import {Image, ScrollView, StyleSheet, Text, View, FlatList, TouchableOpacity, } from 'react-native';
import HomeHeader from '../../components/Header/HomeHeader';
import CustomImageBackground from '../../components/ImageBackground/CustomImageBackground';
import * as Urls from '../../constant//Urls';
import Loader from '../../components/Loader/Loader';

const Video = ({navigation}) => { 
  const [tableData, setTableData] = useState([]);
  const [loading,setLoading] = useState(false);
    
  useEffect(() => {
    getData();
  }, []);
  const getData =  async () => {
    setLoading(true);
  //console.log(Urls.getPostList);
    await fetch('https://kusdemos.com/demoinstagram/api/v1/post-list.php', {
     method: 'GET',
     headers: new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
     }),
   })
     .then(response => response.json())
     .then(responseJson => {
     // alert(JSON.stringify(responseJson));
       console.log("demo data-->"+JSON.stringify(responseJson));
       if (responseJson.error == 0) {
         let data = responseJson.data; 
         //console.log("demo data-->"+JSON.stringify(data));     
           setTableData(data);   
           setLoading(false);    
       } else {
         setLoading(false);
         console.log('Please check your user name or password');
       }
     })
     .catch(error => {
       setLoading(false);
       console.error("error-->"+JSON.parse(error));
     });
 };
  return (
    <NativeBaseProvider>
    <CustomImageBackground>
      <HomeHeader title="Videos" icon={false} />
      <Loader loading={loading} />
      {/* <View style={styles.container}>
    
      <View style={styles.container}>
        <Text>Stuff in view 1!</Text>
      </View>
    
      <View style={styles.container1}>
        <Text style={{color: '#fff'}}>Stuff in view 2!</Text>
      </View>
    </View> */}
     <FlatList
    style={styles.container}
    enableEmptySections={true}
    data={tableData}
    keyExtractor={item => item.id}
    renderItem={({ item }) => {
      return (
        <TouchableOpacity>
          <View style={styles.box}>
            {/* <Image style={styles.image} source={{ uri: item.image }} /> */}
            <View style={styles.info}>
              <Text style={styles.name}>{item.author}</Text>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.name}>{item.content}</Text>
              <View style={styles.row}>         
              <Text style={styles.name}>{item.published_at}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )
    }}
  />
    </CustomImageBackground>
    </NativeBaseProvider>
  );
};

export default Video;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  container1: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  name: {
    fontSize: 20,
    marginTop: 10,
    color: '#333',
  },
  box: {
    marginTop: 10,
    marginHorizontal:10,
    backgroundColor: 'white',
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: -2,
    },
    elevation: 2,
  },
  info: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
