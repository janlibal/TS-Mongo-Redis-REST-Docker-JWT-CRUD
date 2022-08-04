import postModel, { Post } from '../models/post';
import { omit, get } from 'lodash';

const excludedFields = ['password'];

export const savePost = async (input: Partial<Post>) => {
    const post = await postModel.create(input);
    return omit(post.toJSON(), excludedFields);
};

export const findAllPosts = async () => {
    return await postModel.find();
};

export const findMyPosts = async(user:any) => {
    return await postModel.find({postedBy:user})
}

export const findPostById =async (id:string) => {
    return await postModel.findById({_id:id})
}

export const findUserPost =async (id:string, postedBy:string) => {
    return await postModel.findById({_id:id, postedBy:postedBy})
}


export const updatePost =async (id:string, updateCandidate:any) => {
    return await postModel.findByIdAndUpdate(id, updateCandidate)
}



        