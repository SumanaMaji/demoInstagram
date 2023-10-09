

import React from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View, Image, Text } from 'react-native'
import GlobalStyles from '../../assets/css/styles';
const post = {
  id: 1,
  title: 'Blog post title',
  image: 'https://www.bootdey.com/image/280x280/00BFFF/000000',
  author: 'Jane Doe',
  date: 'January 1, 2020',
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.',
};
const data = [
  { id: 1, image: 'https://bootdey.com/img/Content/avatar/avatar1.png' },
  { id: 2, image: 'https://bootdey.com/img/Content/avatar/avatar6.png' },
  { id: 3, image: 'https://bootdey.com/img/Content/avatar/avatar2.png' },
  { id: 4, image: 'https://bootdey.com/img/Content/avatar/avatar3.png' },
  { id: 5, image: 'https://bootdey.com/img/Content/avatar/avatar4.png' },
  { id: 6, image: 'https://bootdey.com/img/Content/avatar/avatar1.png' },
  { id: 7, image: 'https://bootdey.com/img/Content/avatar/avatar6.png' },
]

const DashboardContentScreen = () => {
  return (
    // <View style={styles.container}>
    //   <Text style={styles.title}>{post.title}</Text>
    //   <View style={styles.meta}>
    //     <Text style={styles.author}>by {post.author}</Text>
    //     <Text style={styles.date}>{post.date}</Text>
    //   </View>
    //   <Image source={{ uri: post.image }} style={styles.image} />
    //   <Text style={styles.content}>{post.content}</Text>
    // </View>
    <FlatList
    style={styles.container}
    enableEmptySections={true}
    data={data}
    keyExtractor={item => item.id}
    renderItem={({ item }) => {
      return (
        <TouchableOpacity>
          <View style={styles.box}>
            <Image style={styles.image} source={{ uri: item.image }} />
            <View style={styles.info}>
              <Text style={styles.name}>John Doe</Text>

              <View style={styles.row}>
                <View style={styles.iconContainer}>
                  <TouchableOpacity>
                    <Image
                      style={styles.icon}
                      source={{ uri: 'https://img.icons8.com/color/70/000000/facebook-like.png' }}
                    />
                  </TouchableOpacity>
                  <Text style={styles.iconFonts}>44</Text>
                </View>

                <View style={styles.iconContainer}>
                  <TouchableOpacity>
                    <Image
                      style={styles.icon}
                      source={{ uri: 'https://img.icons8.com/color/70/000000/filled-like.png' }}
                    />
                    <Text style={styles.iconFonts}>120</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )
    }}
  />
  );
};

// container Styles
// const styles = StyleSheet.create({
//   container: {
//     marginTop:20,
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   meta: {
//     flexDirection: 'row',
//     marginBottom: 20,
//   },
//   author: {
//     fontSize: 14,
//     color: '#999',
//     marginRight: 10,
//   },
//   date: {
//     fontSize: 14,
//     color: '#999',
//   },
//   image: {
//     width: '100%',
//     height: 200,
//     marginBottom: 20,
//   },
//   content: {
//     fontSize: 16,
//     marginTop: 20,
//   },
// });


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE',
    paddingTop: 20,
  },
  icon: {
    width: 30,
    height: 30,
  },
  image: {
    width: 100,
    height: 100,
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
  name: {
    fontSize: 20,
    marginTop: 10,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 40,
    marginTop: 10,
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
  },
  iconFonts: {
    color: 'gray',
  },
  red: {
    color: '#FF4500',
  },
})

export default DashboardContentScreen;

