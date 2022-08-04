import { getModelForClass, prop, Ref } from '@typegoose/typegoose';

import { User } from './user'
  

export class Post {
  @prop({ required: true })
  title: string;

  @prop({ required: true })
  content: string;

  @prop({ default: 'no photo' })
  photo: string;

  @prop({ ref: User })
  postedBy: Ref<User>;
        
}

const postModel = getModelForClass(Post);
export default postModel;
  
