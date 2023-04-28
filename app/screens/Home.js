import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import Constants from "expo-constants";
import Slider from "../components/Slider";
import Seprator from "../components/Seprator";
import PostListItems from "../components/PostListItems";
import { getFeaturedPosts, getLatestPosts, getSinglePost } from "../../api/post";

let pageNo = 0;
const limit = 10;

export default function Home({ navigation }) {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);
  const [reachedToEnd, setReachedToEnd] = useState(false);

  const fetchFeaturedPosts = async () => {
    const { error, posts } = await getFeaturedPosts();
    if (error) return console.log(error);
    setFeaturedPosts(posts);
  };

  const fetchLatestPosts = async () => {
    const { error, posts } = await getLatestPosts(limit, pageNo);
    if (error) return console.log(error);
    setLatestPosts(posts);
  };

  const fetchMorePosts = async () => {
    if (reachedToEnd) return;
    pageNo += 1;
    const { error, posts, postCount } = await getLatestPosts(limit, pageNo);
    if (error) return console.log(error);

    if (postCount === latestPosts.length) return setReachedToEnd(true);
    setLatestPosts([...latestPosts, ...posts]);
  };

  const fetachSinglePost = async (postInfo) => {
    const slug = postInfo.slug || postInfo;
    const { error, post } = await getSinglePost(slug);
    if (error) console.log(error);
    navigation.navigate("PostDetail", { post });
  };

  useEffect(() => {
    fetchFeaturedPosts();
    fetchLatestPosts();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View>
        <PostListItems onPress={() => fetachSinglePost(item.slug)} post={item} />
      </View>
    );
  };

  const ItemSeparatorComponent = () => (
    <Seprator width="90%" style={{ marginTop: 10 }} />
  );

  return (
    <View style={{ flex: 1, paddingTop: 22 }}>
      {featuredPosts.length ? (
        <Slider onSlidePress={fetachSinglePost} data={featuredPosts} title="Hot News" />
      ) : null}
      <View style={{ marginTop: 15 }}>
<Seprator />
<Text
style={{
fontWeight: 700,
backgroundColor: "yellow",
textAlign: "center",
color: "#383838",
fontSize: 22,
marginTop: 0,
}}
>
Latest News
</Text>
</View>
      <FlatList
        data={latestPosts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 20 }}
        ItemSeparatorComponent={ItemSeparatorComponent}
        renderItem={renderItem}
        onEndReached={async () => await fetchMorePosts()}
        onEndReachedThreshold={0}
        ListFooterComponent={() => {
          return reachedToEnd ? (
            <Text style={{ fontWeight: "bold", color: "#383838", textAlign: "center", paddingVertical: 15 }}>
              You Reached To End!
            </Text>
          ) : null;
        }}
      />
    </View>
  );
}
