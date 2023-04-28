import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import dateFormat from 'dateformat';
import { ScrollView } from 'react-native-gesture-handler';
import Markdown from 'react-native-markdown-display';

import RelatedPosts from './RelatedPosts';
import Seprator from "../components/Seprator";
import { getSinglePost } from '../../api/post';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Share } from 'react-native';



const {width} = Dimensions.get("window");

const MY_WEBSITE_LINK = "myblog.com/blogs"




const PostDetail = ({route}) => {

    const [likeCount, setLikeCount] = useState(2);
    const [liked, setLiked] = useState(false);
  
    const handleLike = () => {
      // send a request to toggle the user's like status for the content
    };
    const handleComment = () => {
        // handle comment button press
      };
    
      const handleShare = async (slug) => {
      const url = await getSinglePost(slug);
        Share.share({
          message: 'Check out this link:',
          url: url,
        })
        .then(result => console.log(result))
        .catch(error => console.log(error));
      };;
      
      const handleLikePress = async () => {
        const {error, updatedPost} = await likePost(post.id);
        if(error) return console.log(error);
        setLiked(updatedPost.likes);
      };
  

    const post = route.params?.post;


    const getImage = (uri) => {
        if(uri) return {uri};
        return require("../../assets/7.png");
    };

    const handleSinglePostFetch = async(slug) =>{
        const {error, post} = await getSinglePost(slug);
        if(error) return console.log(error)
        navigation.push("PostDetail", {post})
    };
    

    // const rules = { 
    //     paragraph: (node, children, parent, styles) => <Text key={node.key} style={styles.paragraph} selectable>{children}</Text>
    //   }
    // const rules = {
    //     image: (node, children, parent, styles) => {
    //       const { src } = node.attributes;
    //       const width = parent ? parent.width : Dimensions.get('window').width;
    //       const aspectRatio = node.attributes['aspect-ratio'] || 1;
    //       return (
    //         <Image
    //           key={node.key}
    //           source={{ uri: src }}
    //           style={{ width: width * 0.9, height: (width * 0.9) / aspectRatio }}
    //         />
    //       );
    //     },
    //     paragraph: (node, children, parent, styles) => <Text key={node.key} style={styles.paragraph} selectable>{children}</Text>
    //   };
      
    
    // const handleOnLinkPress = async (url)=>{
    //     if(url.includes(MY_WEBSITE_LINK)){
    //        const slug =url.split(MY_WEBSITE_LINK + "/")[1];
    //        if(!slug) return false;
    //        handleSinglePostFetch(slug)
    //        return false;

    //     }
    //     const res = await Linking.canOpenURL(url);
    //     if(res) Linking.openURL(url);
    //     else Alert.alert("Invalid URL", "Can not Open broken Link!");
    // }; 


    if(!post) return null;

    const {title, thumbnail, tags, content, createdAt, author} = post;
  return (
    <ScrollView>
        <Image source={getImage(thumbnail)} style={{width, height: width / 1.7, marginTop: 32}} />
        <View style={{padding: 10}}>
        <Text selectable style={{
              fontWeight: 700,
              color: "#383838",
              fontSize: 22,
              marginVertical: 3,
            }}>{title}</Text>
            <View style={{flexDirection: "row", justifyContent: "space-between", alignContent: "center"}}> 

            <Text style={{color: "#827E7E"}}>By {author}</Text>
            <Text style={{color: "#827E7E"}}>{dateFormat(createdAt, "mediumDate") }</Text>
            </View>

            <View style={{flexDirection: "row",  alignContent: "center"}}>
                <Text  style={{color: "#827E7E"}}>Tags: </Text>
                <View style={{flexDirection: "row",  alignContent: "center"}}>
                    {tags.map((tag, index )=> <Text style={{marginLeft: 5, color:"blue"}} key={tag+index}>#{tag} </Text> )}
                </View>
            </View>
            <Markdown  
            // onLinkPress={handleOnLinkPress}
            // rules={rules} 
            style={styles}>
                {content}

            </Markdown>
            
            <Text> </Text>
            <View style={styles.container}>
            <Text style={styles.likeCountText}>{likeCount} likes</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLike}>
          <Icon name="heart" size={20} color={liked ? 'red' : 'red'} />
          <Text style={styles.buttonText}>Like</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleComment}>
          <Icon name="comment" size={20} color="black" />
          <Text style={styles.buttonText}>Comment</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleShare}>
          <Icon name="share" size={20} color="black" />
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>

            </View>
            <View style={{padding:10}}>
            <Text style={{
              fontWeight: "bold",
              color: "#383838",
              fontSize: 22,
                paddingVertical: 10,
                marginBottom: 10,
              marginTop: 5,
            }}> Related Posts </Text>
            <Seprator width="100%"/>
                <RelatedPosts onPostPress={handleSinglePostFetch} postId={post.id}/>

        </View>

    </ScrollView>
  )
}

export default PostDetail

const styles = StyleSheet.create({
    
        paragraph:{
            lineHeight: 22,
            color: "#545050",
            letterSpacing: 0.8,
        },
        body:{
            fontSize: 16,
        },
        link: {
            color: "#7784f8",
        },
        list_item:{
            color: "#545050",
            paddingVertical: 5,
        },
        container: {
            paddingHorizontal: 16,
            paddingVertical: 8,
            backgroundColor: '#fff',
            borderRadius: 8,
            marginBottom: 16,
            
          },
          buttonContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 8,
          },
          buttonText: {
            fontSize: 14,
            marginLeft: 4,
          },
          likeCountText: {
            fontSize: 12,
            color: '#888',
          },
})