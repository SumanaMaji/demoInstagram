import moment from 'moment';
import {Icon, Left, ListItem, Right, NativeBaseProvider} from 'native-base';
import React, {useState, useEffect, createRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import HomeHeader from '../../components/Header/HomeHeader';
import CustomImageBackground from '../../components/ImageBackground/CustomImageBackground';
import {COLORS} from '../../constant/Colors';
import {FONTS} from '../../constant/Font';
import {moderateScale} from '../../PixelRatio';
import {removeUser, setGuestLogin, setLogin} from '../../Redux/reducer/user';
import Auth from '../../Service/Auth';
import Navigation from '../../Service/Navigation';
import {BASE_DOMAIN} from '../../Utils/HttpClient';
import { ScrollView } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import ImagePicker from 'react-native-image-crop-picker';
// import RNFS from 'react-native-fs';

const LIST = [
  {
    name: 'Edit Profile',
    icon: 'person',
    type: 'Ionicons',
    path: 'EditProfile',
  },
  {
    name: 'My Events',
    icon: 'star-four-points-outline',
    type: 'MaterialCommunityIcons',
    path: 'MyEventList',
  },
  {
    name: 'Followers',
    icon: 'md-person-add',
    type: 'Ionicons',
    path: 'Followers',
  },
  {
    name: 'Organizers',
    icon: 'heart-outline',
    type: 'Ionicons',
  },
  {
    name: 'Payment Method',
    icon: 'wallet',
    type: 'Ionicons',
    path: 'PaymentInfo',
  },
  {
    name: 'Settings',
    icon: 'settings',
    type: 'Ionicons',
    path: 'Settings',
  },
  {
    name: 'Policies',
    icon: 'shield-checkmark-outline',
    type: 'Ionicons',
  },
  {
    name: 'Logout',
    icon: 'sign-out',
    type: 'FontAwesome',
    logout: true,
  },
];

const LIST2 = [
  {
    name: 'Policies',
    icon: 'shield-checkmark-outline',
    type: 'Ionicons',
  },
  {
    name: 'Login',
    icon: 'sign-out',
    type: 'FontAwesome',
  },
];
const PostUpload = ({navigation}) => {
  const [loading,setLoading] = useState(false);
  const [newsTitle,setNewsTitle] = useState('');
  const [newsContent,setNewsContent] = useState('');
  const [newsType,setNewsType] = useState('I');
  const [newsFile,setNewsFile] = useState('');
  const [userId, setUserId] = useState();
  const [pushData, setPushData] = useState();
  const [newsData, setNewsData] = useState();
  const [compressloading,setCompressLoading] = useState(false);

  const dispatch = useDispatch();
  const {userData, guestLogin} = useSelector(state => state.User);
  const [listItem, setlistItem] = useState(guestLogin ? LIST2 : LIST);

  const goTo = async it => {
    if (it.name == 'Login') {
      dispatch(setLogin(false));
      dispatch(setGuestLogin(false));
      return;
    }
    if (it.logout) {
      await Auth.setAccount(null);
      await Auth.setToken(null);
      dispatch(removeUser());
      return;
    }
    if (it.path) {
      Navigation.navigate(it.path);
    }
  };
  const resetHandler = () => {
    setNewsTitle('');
    setNewsContent('');
    setNewsType('');
    setNewsFile('');
  }
  const selectNewsFile = async () => {
    //alert(newsType)
    if(newsType=='I')
    {
      ImagePicker.openPicker({
        mediaType: 'image',
        includeBase64: true,
        compressImageQuality: 0.5,
      }).then(image => {
        if(newsType=='I')
        {
          let newsFile1 = "data:"+image.mime+";base64,"+image.data;
          setNewsFile(newsFile1);
        }
        else if(newsType=='V'){
          let newsFile1 = "data:video/mp4;base64,"+image.data;
          setNewsFile(newsFile1);
        }
        
      });
    }
    else if(newsType=='V'){
     
      ImagePicker.openPicker({
        mediaType: 'video',
        includeBase64: true,
        compressVideoPreset: 'MediumQuality'
      }).then(image => {
        console.log(JSON.stringify(image));
        RNFS.readFile(image.path, 'base64').then(res => {
          let newsFile1 = "data:video/mp4;base64,"+res;
          setNewsFile(newsFile1);      
      })
      .catch(err => {
          console.log(err.message, err.code);
      });
    
      });
    }
    
  };
  const handleSubmitPress = () => {
    if (newsTitle.length == 0) 
    {
        alert('Enter Post Title');
        return false;
    }
    //Show Loader
    setLoading(true);

    let dataToSend = {
      title: newsTitle,
      content: newsContent,
      //mediatype: newsType,
      userId: '143',//userId,
    };
    if(newsFile)
    {
      if(newsType=='I')
      {
        let newData = {
          news_image: newsFile,
          mediatype: newsType
        }
        dataToSend = {...dataToSend, ...newData};
      }
      else if(newsType=='V'){
        let newData = {
          bluebook_video: newsFile,
          mediatype: newsType
        }
        dataToSend = {...dataToSend, ...newData};
      }
    }
    console.log(dataToSend)
    fetch('https://kusdemos.com/demoinstagram/api/v1/add-post.php', {
      method: 'POST',
      body: JSON.stringify(dataToSend),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        if (responseJson.error == 0) {
          setLoading(false);
          let alertMessage = 'News added successfully.';
          alert(alertMessage);
          resetHandler();
          //notificationListener(navigation);
          console.log("data dup"+ JSON.stringify(responseJson.data));
          setNewsData(responseJson.data);
          setPushData(responseJson.notification);
         
        } else {
          setLoading(false);
          alert(responseJson.errorFriendlyMessage);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });

  }
  const a = moment([moment(new Date()).format('YYYY', 'MM')]);
  const b = moment([moment(userData.dob).format('YYYY', 'MM')]);

  return (
    <NativeBaseProvider>
    <CustomImageBackground>
      <HomeHeader title="Post Upload" icon={false} />
      {/* <View style={{width: '80%', alignSelf: 'center'}}>
        {guestLogin ? null : (
          <View
            style={{
              flexDirection: 'row',
              borderBottomWidth: 0.2,
              borderColor: COLORS.textInput,
              paddingVertical: 25,
            }}>
            <Image
              source={{
                uri: BASE_DOMAIN + userData.image,
              }}
              style={{
                width: moderateScale(70),
                height: moderateScale(70),
                borderRadius: moderateScale(35),
                borderWidth: 3,
                borderColor: COLORS.theme,
                backgroundColor: COLORS.lightgray,
              }}
            />
            <View style={{marginLeft: 15, width: '65%'}}>
              <Text
                style={{
                  color: COLORS.white,
                  fontFamily: FONTS.SemiBold,
                  fontSize: moderateScale(15),
                }}>
                {userData.firstname} {userData.lastname}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={styles.shadowTxt}>
                  Age: <Text style={styles.boldTxt}>{a.diff(b, 'years')}</Text>
                </Text>
                <Text style={styles.shadowTxt}>
                  Gender: <Text style={styles.boldTxt}>{userData.gender}</Text>
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={[styles.shadowTxt]}>
                  Followers: <Text style={styles.boldTxt}>0</Text>
                </Text>
                <Text numberOfLines={1} style={[styles.shadowTxt]}>
                  {'  '} Drink:{' '}
                  <Text style={styles.boldTxt}>
                    {Object.keys(userData).length > 0
                      ? userData?.favoriteDrink[0]?.name
                      : null}
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        )}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{marginTop: 10}}>
          <View style={{paddingTop: 10, paddingBottom: 300}}>
            {listItem.map((it, key) => (
              <ListItem key={key} onPress={() => goTo(it)} style={styles.list}>
                <Left style={{width: '50%', alignItems: 'center'}}>
                  <Icon
                    name={it.icon}
                    type={it.type}
                    style={{color: COLORS.white}}
                  />
                  <Text style={styles.title}>{it.name}</Text>
                </Left>
                <Right>
                  {it.logout ? null : (
                    <Icon
                      name="keyboard-arrow-right"
                      type="MaterialIcons"
                      style={{color: COLORS.white}}
                    />
                  )}
                </Right>
              </ListItem>
            ))}
          </View>
        </ScrollView>
      </View> */}
       <ScrollView>
    <View style={styles.container}>
       <View style={styles.innercontainer}>
          <View style={styles.input}>
            <TextInput
              style={styles.TextInput}
              placeholder="Title"
              placeholderTextColor="#9e9e9e"
              value={newsTitle}
              onChangeText={NewsTitle => setNewsTitle(NewsTitle)}
              
            />
          </View>
          <View style={styles.btngrp}>
          <TouchableOpacity
            onPress={() => setNewsType('I')}
            style={styles.picBtn}>
            <Text style={styles.loginTextAddPic}>Add Picture</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.vdoBtn}
            onPress={() => setNewsType('V')}>
            <Text style={styles.loginTextVdo}>Add Video</Text>
          </TouchableOpacity>
        </View>
        
    <View style={styles.textAreaContainer} >
    <TextInput
      style={styles.TextInputAreaConatiner}
      placeholder="Enter message here"
      placeholderTextColor="#9a9a9a"
      fontSize={20}
      numberOfLines={10}
      multiline={true}
      value={newsContent}
      onChangeText={NewsContent => setNewsContent(NewsContent)}
    />
  </View>
  <View style={styles.camragrp}>
  <TouchableOpacity
    onPress={() => selectNewsFile()}
    style={styles.capturebtn}>
    <FontAwesome
      name="folder"
      size={24}
      color="white"
      style={styles.plusIcon}
    /><Text style={styles.browseText}>Browse...</Text>
  </TouchableOpacity>
  </View>
  <View style={styles.btngrp}>
          <TouchableOpacity
          onPress={() => handleSubmitPress()}
            style={styles.postBtn}>
            <Text style={styles.loginTextPic}>Post</Text>
          </TouchableOpacity>
        </View>
        
        </View>
        </View>
    </ScrollView>
    </CustomImageBackground>
    </NativeBaseProvider>
  );
};

export default PostUpload;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    
  },
  innercontainer: {
    flex: 1,
    width:'100%',
    alignItems: 'flex-start',
    marginLeft:40
  },
  input: {
    borderWidth: 1,
    borderColor: '#00afee',
    backgroundColor: '#fff',
    width: '90%',
    marginTop: 30,
    height: 65,
    padding: 8,
    justifyContent: 'center',
    borderRadius: 5,
  },
  camragrp: {
    flexDirection:'row',
    width:'40%',
    height:40,
    marginTop:15,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  btngrp: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
  
    borderRadius: 12,
    marginTop: 30,
  },
  picBtn: {
    width: '50%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: COLORS.blue,

  },
  vdoBtn: {
    width: '50%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: COLORS.white,
  },
  textAreaContainer: {
    width: '90%',
    backgroundColor: '#ebebeb',
    marginTop: 30,
    borderRadius: 20,
    height: 250,
    padding: 10,
  },
  postBtn: {
    marginTop: 20,
    marginBottom: 40,
    backgroundColor: '#00afee',
    color: '#fff',
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
  },
  plusIcon: {
    padding:0,
    paddingRight:10,
  },
  browseText: {
    color: COLORS.white, 
    fontSize:20,
  },
  loginTextPic: {
    color: COLORS.white, 
    fontSize:24,
  },
  loginTextVdo: {fontSize:18},
  loginTextAddPic: {fontSize:18, color: '#fff'},
  TextInput: {color: COLORS.black, fontSize:18},

  capturebtn: {
    
    
    flex:1,
    flexDirection:'row',
    backgroundColor: '#3c3c3c',
    borderRadius: 5,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextInputAreaConatiner: {
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
  },
});
