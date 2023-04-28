import React, { useState } from 'react';
import { StyleSheet, TextInput,Text, View, ScrollView, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { searchPosts, getSinglePost } from '../../api/post';
import PostListItems from '../components/PostListItems';
import { useNavigation } from '@react-navigation/native';
import RelatedPosts from './RelatedPosts';

const Search = ({route}) => {
  const navigation = useNavigation();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [notFound, setNotFound] = useState(false);

  const handlePostPress = async (slug) => {
    const { error, post } = await getSinglePost(slug);
    if (error) console.log(error);
    navigation.navigate("PostDetail", { post });
  };
  const post = route.params?.post;

  const handleCategoryPress = async (category) => {
    if (category === 'Sports' || category === 'Politics' || category === 'World' || category === 'Cinema' || category === 'Technology' || category === 'Bangladesh') {
      setQuery(category);
      return <RelatedPosts postId={post.id} />;
    }
    setQuery(category);
    const { error, posts } = await searchPosts(category);
    if (error) {
      return console.log(error); 
    }
    setResults([...posts]);
  };

  const handleOnChangeText = async (text) => {
    setQuery(text);
    if (!text.trim()) {
      setResults([]);
      return;
    }
    const { error, posts } = await searchPosts(text);
    if (error) {
      return console.log(error);
    } if(!posts.length) return setNotFound(true);
    else {
      setResults([...posts]);
    }
    
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search..."
        value={query}
        onChangeText={handleOnChangeText}
        style={styles.searchInput}
      />
      
      <ScrollView>
        {query.trim() === "" ? (
          <>
            <Text style={styles.categoryTitle}>Categories:</Text>
            <View style={styles.categoryContainer}>
              <View style={styles.categoryButtonsContainer}>
                <TouchableOpacity 
                  style={styles.categoryButton}
                  onPress={() => handleCategoryPress('Sports ')}
                >
                  <Text style={styles.categoryButtonText}>Sports</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.categoryButton} onPress={() => handleCategoryPress('Politics ')}>
                  <Text style={styles.categoryButtonText}>Politics</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.categoryButton} onPress={() => handleCategoryPress('World ')}>
                  <Text style={styles.categoryButtonText}>World</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.categoryButton} onPress={() => handleCategoryPress('Cinema ')}>
                  <Text style={styles.categoryButtonText}>Cinema</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.categoryButton} onPress={() => handleCategoryPress('Technology ')}>
                  <Text style={styles.categoryButtonText}>Technology</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.categoryButton} onPress={() => handleCategoryPress('Bangladesh ')}>
                  <Text style={styles.categoryButtonText}>Bangladesh</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : (
          <>
            {results.length > 0 ? (
              results.map((post) => (
                <PostListItems
                  key={post.id ? post.id : post._id}
                  post={post}
                  onPress={() => handlePostPress(post.slug)}
                />
              ))
            ) : (
              <Text style={styles.oops}>
                Oops! Nothing found.
                </Text>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  paddingHorizontal: 20,
  paddingTop: Constants.statusBarHeight + 5,
  backgroundColor: '#fff',
  flex: 1,
  },
  searchInput: {
  marginTop: 30,
  borderWidth: 2,
  borderColor: '#4d4d4d',
  borderRadius: 10,
  padding: 15,
  fontSize: 18,
  color: '#4d4d4d',
  fontWeight: 'bold',
  letterSpacing: 2,
  },
  categoryContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 0,
  },
  categoryTitle: {
  fontSize: 20,
  marginRight: 20,
  marginTop: 50,
  fontWeight: 'bold',
  color: '#4d4d4d',
  letterSpacing: 1.5,
  },
  categoryButtonsContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 10,
  },
  categoryButton: {
  backgroundColor: '#f2f2f2',
  paddingVertical: 12,
  paddingHorizontal: 20,
  borderRadius: 30,
  marginRight: 15,
  marginBottom: 15,
  elevation: 3,
  shadowColor: '#000',
  shadowOffset: {
  width: 0,
  height: 2,
  },
  shadowOpacity: 0.23,
  shadowRadius: 2.62,
  },
  categoryButtonText: {
  color: '#4d4d4d',
  fontSize: 16,
  fontWeight: 'bold',
  letterSpacing: 1.5,
  },
  oops: {
  fontWeight: 'bold',
  textAlign: 'center',
  color: '#4d4d4d',
  fontSize: 32,
  marginTop: 200,
  textShadowColor: '#d9d9d9',
  textShadowOffset: { width: 2, height: 2 },
  textShadowRadius: 5,
  letterSpacing: 2,
  },
  });

export default Search;
