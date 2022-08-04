import { object, string, TypeOf } from 'zod';

export const postSchema = object({
  body: object({
      title: string({ 
      required_error: 'Title is required.' 
    }),
      content: string({ 
      required_error: 'Content is required' 
    }),
      photo: string()
    }),
    

});

export type PostInput = TypeOf<typeof postSchema>['body'];
