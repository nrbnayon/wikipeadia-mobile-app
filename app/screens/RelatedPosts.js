import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import PostListItems from '../components/PostListItems';
import { getSimillerPost, getSinglePost } from '../../api/post';
import { useNavigation } from '@react-navigation/native';

const RelatedPosts = ({ postId }) => {
  const [posts, setPosts] = useState([]);
  const navigation = useNavigation();

  const handleOnPress = async (slug) => {
    const { error, post } = await getSinglePost(slug);
    if (error) console.log(error);
    navigation.push('PostDetail', { post });
  };

  const fetchSimillerPosts = async () => {
    const { error, posts } = await getSimillerPost(postId);
    if (error) console.log(error);
    setPosts([...posts]);
  };
  useEffect(() => {
    fetchSimillerPosts();
  }, [postId]);

  return posts.map((post) => {
    return (
      <View style={styles.container} key={post.id}>
        <PostListItems onPress={() => handleOnPress(post.slug)} post={post} />
      </View>
    );
  });
};

export default RelatedPosts;

const styles = StyleSheet.create({
  container: {
    marginTop: 1,
  },
});
