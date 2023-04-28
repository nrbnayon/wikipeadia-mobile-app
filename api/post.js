import client from "./client";

export const getFeaturedPosts = async() => {
    try{
        const {data} = await client("/post/featured-posts");
        return data;

    }catch (error){
        const { response } = error;
        if(response?.data){
            return { error: response.data };
        }
        return { error: error.message  || error };
    }
};
export const getLatestPosts = async(limit, pageNo) => {
    try{
        const {data} = await client(`/post/posts?limit=${limit}&pageNo=${pageNo}` );
        return data;

    }catch (error){
        const { response } = error;
        if(response?.data){
            return { error: response.data };
        }
        return { error: error.message  || error };
    }
};
export const getSinglePost = async(slug) => {
    try{
        const {data} = await client(`/post/single/${slug}` );
        return data;

    }catch (error){
        const { response } = error;
        if(response?.data){
            return { error: response.data };
        }
        return { error: error.message  || error };
    }
};


export const getSimillerPost = async(id) => {
    try{
        const {data} = await client(`/post/related-posts/${id}` );
        return data;

    }catch (error){
        const { response } = error;
        if(response?.data){
            return { error: response.data };
        }
        return { error: error.message  || error };
    }
};

export const searchPosts = async(query) => {
    try{
        const {data} = await client(`/post/search?title=${query}` );
        return data;

    }catch (error){
        const { response } = error;
        if(response?.data){
            return { error: response.data };
        }
        return { error: error.message  || error };
    }
};