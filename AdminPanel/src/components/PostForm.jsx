import React, { useEffect, useState } from 'react'
import { ImSpinner, ImEye, ImFilePicture, ImFilesEmpty, ImSpinner3 } from "react-icons/im"
import { uploadImage } from '../api/post';
import { useNotification } from '../context/NotificationProvider';
import MarkdownHint from './MarkdownHint';
import DeviceView from './DeviceView';

 export const defaultPost = {
  title: '',
  thumbnail: '',
  featured: false,
  content: '',
  tags: '',
  meta: ''
 };

//  export default function PostForm({initialPost, busy, postBtmTitle, resetAfterSubmit, onSubmit}) 
// {
//   const [postInfo, setPostInfo] = useState({ ...defaultPost });
//   const [selectedThumbnailURL, setSelectedThumbnailURL] = useState('');
//   const [imageUrlToCopy, setImageUrlToCopy] = useState("");
//   const [imageUploading, setImageUploading] = useState(false);
//   const [displayMarkdownHint, setDisplayMarkdownHint] = useState(false);

//   const {updateNotification} = useNotification();

//   useEffect(() => { 
//     setPostInfo({...initialPost});
//     return () => {
//       if (resetAfterSubmit) resetForm();
//     }
//   },[initialPost, resetAfterSubmit]);

// export default function PostForm({initialPost, busy, postBtmTitle, resetAfterSubmit, onSubmit}) 
// {
//   const [postInfo, setPostInfo] = useState({ ...defaultPost });
//   const [selectedThumbnailURL, setSelectedThumbnailURL] = useState('');
//   const [imageUrlToCopy, setImageUrlToCopy] = useState("");
//   const [imageUploading, setImageUploading] = useState(false);
//   const [displayMarkdownHint, setDisplayMarkdownHint] = useState(false);

//   const {updateNotification} = useNotification();

//   useEffect(() => { 
//     // if (initialPost.thumbnail){
//     //    setSelectedThumbnailURL(initialPost.thumbnail);
//     //   }
//     setPostInfo({...initialPost});
//     return () => {
//       if (resetAfterSubmit) resetForm();
//     }
//   },[initialPost, resetAfterSubmit]);


export default function PostForm({initialPost, busy, postBtmTitle, resetAfterSubmit, onSubmit}) {
  const [postInfo, setPostInfo] = useState(initialPost ? { ...initialPost } : { ...defaultPost });
  const [selectedThumbnailURL, setSelectedThumbnailURL] = useState('');
  const [imageUrlToCopy, setImageUrlToCopy] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  const [displayMarkdownHint, setDisplayMarkdownHint] = useState(false);
  const [showDeviceView, setShowDeviceView] = useState(false);
  
  const {updateNotification} = useNotification();

  useEffect(() => { 
    if (initialPost){
      setPostInfo({...initialPost});
      setSelectedThumbnailURL(initialPost?.thumbnail);
    }
    // setPostInfo(initialPost ? { ...initialPost } : { ...defaultPost });
    return () => {
      if (resetAfterSubmit) resetForm();
    }
  },[initialPost, resetAfterSubmit]);
  

  const handleChange = ({ target }) => {
    const { value, name, checked } = target;
  
    if (name === "thumbnail") {
      const file = target.files[0];
      if (!file.type?.includes('image')) {
        return alert("This is not an Image");
      }
      setPostInfo({ ...postInfo, thumbnail: file });
      return setSelectedThumbnailURL(URL.createObjectURL(file));
    }
  
    if (name === "featured") {
      updateNotification( "success", "Featured Selected");
      localStorage.setItem("blogPost", JSON.stringify({...postInfo, featured: checked }));
      return setPostInfo({ ...postInfo, [name]: checked });
    }
    if (name === "tags") {
      const newTags = tags.split(",");
      if(newTags.length > 4 ) 
        updateNotification( "warning", "Only first four tags will be selected");
      // setPostInfo({ ...postInfo, [name]: value });
    } 
    if (name === "meta" && meta.length > 150) {
      return setPostInfo({ ...postInfo, meta: value.substring(0, 149) });
    } 
  
    const newPost = { ...postInfo, [name]: value };
    setPostInfo(newPost);
    localStorage.setItem("blogPost", JSON.stringify(newPost));
  };
  

  const handleImageUpload = async({target}) => {

    if(imageUploading) return;
    const file = target.files[0];
      if (!file.type?.includes('image')) {
        return updateNotification( "error", "This is not an image");
      } 
    
      setImageUploading(true)
      const formData = new FormData();
      formData.append("image", file);
      const {error, image} = await uploadImage(formData);
      setImageUploading(false)
      if(error) return updateNotification('error', error);
      setImageUrlToCopy(image);
  };

  const handleOnCopy = () => {
  const textToCopy = `![Add image description](${imageUrlToCopy})`
  updateNotification( "success", "Image url copied");
    navigator.clipboard.writeText(textToCopy);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, content, tags, meta} = postInfo;
    if(!title.trim()) return updateNotification("error", "The Title is missing!");
    if(!content.trim()) return updateNotification("error", "Content is missing!");
    if(!tags.trim()) return updateNotification("error", "Tags are missing!");
    if(!meta.trim()) return updateNotification("error", "Meta description is missing!");

    const slug = title
        .toLowerCase()
         .replace(/[^a-zA-Z]/g, " ")
        .split(" ")
         .filter(item => item.trim())
        .join("-");

    const newTags = tags.split(",")
        .map(item => item.trim())
        .slice(0, 4);

    const formData = new FormData();

    const finalPost = {...postInfo, tags: JSON.stringify(newTags), slug}
    for(let key in finalPost){
        formData.append(key, finalPost[key])
    };

    onSubmit(formData);
    // if (resetAfterSubmit) resetForm();
  };

  const resetForm = () => {
    setPostInfo({...defaultPost});
    localStorage.removeItem("blogPost");
  }

  const { title, content, featured, tags, meta} = postInfo;

  return (
    <>
    <form onSubmit={handleSubmit} className='p-2 flex'>
      <div className="w-9/12 h-screen space-y-3 flex flex-col">
      
      <div className="flex items-center justify-between">
        <h1 className='text-xl font-semibold'>
          Create New Post
        </h1>

        <div className="flex items-center space-x-5">
          <button 
            onClick={resetForm}
            type='button' className='flex items-center space-x-2 px-3 ring-1
              rounded h-10 ring-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 transition'><ImSpinner />
            <span>Reset</span>
          </button>

          <button 
          type='buttom'
            onClick={() => setShowDeviceView(true)}
          className='flex items-center space-x-2 px-3 ring-1
              rounded h-10 ring-blue-500  text-blue-500 hover:text-white hover:bg-blue-500 transition'>
            <ImEye /> <span>View</span>
          </button>

          <button className='h-10 w-36  hover:ring-1 bg-blue-500
              rounded   text-white hover:text-blue-500 hover:bg-transparent
               ring-blue-500 transition'>
                { busy ? ( <ImSpinner3 className='animate-spin mx-auto text-xl'/> 
                ) : (
                 postBtmTitle
                 )}
                </button>

        </div>
      </div>
      <div className='flex'>
        <input name='featured' onChange={handleChange} 
        value={featured}
        id='featured' type="checkbox" hidden />
        <label className=' select-none flex items-center space-x-2  text-gray-700 cursor-pointer group' htmlFor='featured'>
          <div className="w-4 h-4  rounded-full
             border-2 border-blue-500 flex items-center justify-center group-hover:border-blue-500">
            { featured && (<div className="w-2 h-2  rounded-full
              bg-blue-700 group-hover:bg-blue-500">
            </div>)}
          </div>
          <span className='group-hover:text-blue-500'>Featured</span>
        </label>
      </div>

      {/* Title input */}
      <input 
      value={title}
      onFocus={() => setDisplayMarkdownHint(false)}
      name='title'
      type="text" 
      onChange={handleChange}
      className='text-xl border-2 border-gray-500 outline-none focus:ring-1 rounded p-2 w-full font-semibold'
        placeholder='Post Title' />

      {/* image input */}
      <div className="flex space-x-2">
        <div>
          <input onChange={handleImageUpload} id="image-input" type="file" hidden />
          <label
            htmlFor="image-input"
            className="flex items-center space-x-2 px-3 ring-1 rounded  ring-gray-700 h-10 text-gray-700
             hover:text-white hover:bg-gray-700 transition cursor-pointer">
            <span>Place Image</span> 
            {!imageUploading ?  <ImFilePicture /> : <ImSpinner3 className='animate-spin'/>}
          </label>
        </div>

         { imageUrlToCopy && ( <div className="flex-1 flex justify-between bg-gray-500 rounded items-center overflow-hidden">
          <input
            type="text"
            value={imageUrlToCopy}
            className="bg-transparent px-2 text-white w-full"
            disabled/>
          <button 
          onClick={handleOnCopy}
          type='button' className=" text-xs flex flex-col items-center justify-center 
          self-stretch px-3 bg-gray-700 text-white rounded">
          <ImFilesEmpty className="mr-1" />
          <span className="text-xs">Copy</span>
        </button>
        </div> 
         )}
      </div>

      <div>
        <h1>Content Description</h1>
      <textarea 
        value={content}
        onChange={handleChange}
        onFocus={() => setDisplayMarkdownHint(true)}
        name='content'
      className=' h-40 resize-h  w-full focus:ring-1 rounded p-2 flex-1 font-mono tracking-wide text-lg' 
      placeholder='Write Content Description here...'>
      </textarea>
      </div>

      {/* tags input */}
      <div>
        <label className='tex-gray-500' htmlFor="tags">Tags*</label>
        <input 
        value={tags}
        onChange={handleChange}
        name='tags'
        type="text" id='tags' className='border-2 border-blue-500 outline-none focus:ring-2 rounded p-2 w-full'
          placeholder='Tag one, Tag two' />
      </div>

      {/* meta des */}
      <div>
        <label className='tex-gray-500' htmlFor="meta">Meta Discription {meta.length} / 150</label>
        <textarea 
        onChange={handleChange}
        value={meta}
        name='meta'
        id='meta' className='resize-none w-full focus:ring-1 rounded p-2 h-28' placeholder='Meta Discription'>
        </textarea>
      </div>
      </div>

      <div className="w-1/4 px-2 relative">
        <h1 className='text-xl font-semibold text-gray-700 mb-2'>Thumbnail</h1>
        <div>
        <input 
        onChange={handleChange}
        name='thumbnail' 
        id='thumbnail' type="file" hidden/>
        <label className='cursor-ponter' htmlFor="thumbnail">
          {selectedThumbnailURL ? (<img src={selectedThumbnailURL} 
       className='aspect-video shadow-sm rounded' alt=""
        onError={() => setSelectedThumbnailURL(null)}
       /> ) : ( 
          <div className="border border-dashed border-gray-500 aspect-video
          text-gray-500 flex flex-col jusity-center items-center">
          <span> Select Thumbnail</span>
          <span className='text-xs'> Recomemended Size</span>
          <span className='text-xs'> 1280 * 720</span>
          </div>
          )}</label>
        </div>

        {/* markdownrules */}

        <div className='absolute top-1/2 -translate-y-1/2'>
            { displayMarkdownHint && <MarkdownHint/>}  

        </div>
        
      </div>
    </form>

        <DeviceView title={title} content={content} 
          thumbnail={selectedThumbnailURL} 
          visible={showDeviceView}
          onClose={() => setShowDeviceView(false)}
        />
    </>

  )
}
