import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import {
  View,
  Text,Image
} from 'react-native';
import AppIntroSlider from '../../components/introSlider/IntroSlider';
import {COLORS} from '../../../src/constant/Colors';
import {FONTS} from '../../../src/constant/Font';
import GlobalStyles from '../../../assets/css/styles';
import LoginScreen from '../login/LoginScreen';

const SplashScreen = ({navigation}) => {
  const [showRealApp, setShowRealApp] = useState(false);

  const onDone = () => {
    navigation.navigate('LoginScreen');
  };
  const onSkip = () => {
    navigation.navigate('LoginScreen');
  };

  const RenderItem = ({item}) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: item.backgroundColor,
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingBottom: 200,
          paddingLeft:10,
          paddingRight:10,
          paddingTop: 50,
        }}>
          
           <Image
        style={GlobalStyles.introImageStyle}
        source={{
          uri: item.image
        }}
      />
     
        {/* <Image
          style={GlobalStyles.introImageStyle}
          uri={item.image} height="100%" width="80%"/> */}
          <Text style={GlobalStyles.introTitleStyle}>
          {item.title}
        </Text>
        <Text style={GlobalStyles.introTextStyle}>
          {item.text}
        </Text>
      </View>
    );
  };

  return (
    
        <AppIntroSlider
          data={slides}
          renderItem={RenderItem}
          onDone={onDone}
          showSkipButton={true}
          onSkip={onSkip}
        />
  );
};

export default SplashScreen;

const slides = [
  {
    key: 's1',
    text: 'Be the first to explore latest designs.',
    title: 'Latest Designs',
    image : 'https://kusdemos.com/jewellery/banner1.jpeg', 
    backgroundColor: COLORS.theme,
  },
  {
    key: 's2',
    title: 'Horscope Predictions',
    text: 'get daily personal horscope predictions.',
    image : 'https://kusdemos.com/jewellery/banner2.jpeg', 
    backgroundColor: COLORS.theme,
  },
  {
    key: 's3',
    title: 'Fashion Trends',
    text: 'Be up-to-date with the best fashion trends',
    image : 'https://kusdemos.com/jewellery/banner3.jpeg', 
    backgroundColor: COLORS.theme,
  },
  {
    key: 's4',
    title: 'Get Quickly',
    text: 'All prices are wholesale.',
    image : 'https://kusdemos.com/jewellery/banner4.jpeg', 
    backgroundColor: COLORS.theme,
  },
];
