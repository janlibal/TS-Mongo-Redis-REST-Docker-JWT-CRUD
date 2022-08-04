import { savePost, findAllPosts, findMyPosts, findPostById, updatePost } from '../repositories/postRepository';

export const createPost = async (post: any) => {

    const data = await savePost(post)

    return data
}

export const getAllPosts = async() => {
    
    const data = await findAllPosts()

    return data
}

export const getMyPosts = async(user: any) => {
    
    const data = await findMyPosts(user)
    
    return data
}

export const getPostById = async(id: string) => {

    const data = await findPostById(id)

    return data
}


export const updatePostById = async(updateCandidate: any, id:any) => {
        
    const update = await updatePost(id, updateCandidate)

    return update
}
