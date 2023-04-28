import React, { useEffect, useState } from 'react';
import PostForm from './PostForm';
import { useParams } from 'react-router-dom';
import { getPost, updatePost } from '../api/post';
import { useNotification } from '../context/NotificationProvider';
import NotFound from './NotFound';

export default function UpdatePost() {
  const { slug } = useParams();
  
  const { updateNotification } = useNotification();
  const [busy, setBusy] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [postInfo, setPostInfo] = useState(null); 

  const fetchPost = async () => {
    const { error, post } = await getPost(slug);
    if (error) {
      setNotFound(true);
      return updateNotification("error", error);
    }
    setPostInfo({...post, tags: post.tags?.join(", ")});
  };

  useEffect(() => { 
    fetchPost();
  },[]);

  const handleSubmit = async (data) => {
    setBusy(true);
   const {error, post} = await updatePost(postInfo.id, data)
   setBusy(false)
    if(error) return updateNotification("error", error);
    setPostInfo({...post, tags: post.tags?.join(", ")})
  };

  if (notFound) return <NotFound/>;

  return (
    <PostForm onSubmit={handleSubmit} initialPost={postInfo} busy={busy} 
    postBtmTitle="Update" resetAfterSubmit />
  );
}

