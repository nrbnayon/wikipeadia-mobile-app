import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import dateFormat from 'dateformat';

const PostListItems = ({ post, onPress }) => {
  const { thumbnail, title, createdAt, author } = post;

  const getThumbnail = (uri) => {
    if (uri) return { uri };
    return require('../../assets/sc.jpg');
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image source={getThumbnail(thumbnail)} style={styles.image} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.authorContainer}>
          <Text style={styles.author}>{author}</Text>
          <Text style={styles.date}>
            {dateFormat(createdAt, 'mediumDate')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    borderBottomWidth: 0.9,
    borderBottomColor: '#ddd',
  },
  image: {
    width: 100,
    height: 70,
    borderRadius: 5,
    marginRight: 10,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#383838',
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  author: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#827E7E',
    marginRight: 5,
  },
  date: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#827E7E',
  },
});

export default PostListItems;



// import React from 'react';
// import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
// import dateFormat from 'dateformat';

// const PostListItems = ({ post }) => {
//   const { thumbnail, title, createdAt, author } = post;
//   // const IMAGE_WIDTH = 100;

//   const getThumbnail = (uri) => {
//     if(uri) return {uri};
//     return require("../../assets/sc.jpg");
//   };
  
//   return (
//     <TouchableOpacity style={styles.container}>
//       <Image
//         source={getThumbnail(thumbnail)}
//         style={styles.image}
//       />
//       <View style={styles.contentContainer}>
//         <Text style={styles.title}>{title}</Text>
//         <Text style={styles.date}>
//           {dateFormat(createdAt, 'mediumDate')} - {author}
//         </Text>
//       </View>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//   },
//   image: {
//     width: 100,
//     height: 70,
//     borderRadius: 5,
//   },
//   contentContainer: {
//     flex: 1,
//     marginLeft: 5,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#383838',
//   },
//   date: {
//     fontSize: 12,
//     fontWeight: 'bold',
//     color: '#827E7E',
//   },
// });

// export default PostListItems;
