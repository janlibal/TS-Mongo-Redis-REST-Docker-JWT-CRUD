import { omit, get } from 'lodash';
import { FilterQuery, QueryOptions } from 'mongoose';
import userModel, { User } from '../models/user';
import { signJwt } from '../utils/jwt';
import config from 'config';
import { DocumentType } from '@typegoose/typegoose';
import redisClient from '../utils/connectRedis';

const excludedFields = ['password'];

export const findUserByEmail = async (email: string) => {
    const user = await userModel.find({email: email}).lean();
    return omit(user, excludedFields);
};


export const findUserForLogin = async (email: string) => {
    const user = await userModel.find({email: email}).lean();
    return await userModel.findOne({email:email});
};
  
export const createNewUser = async (input: Partial<User>) => {
    const user = await userModel.create(input);
    return omit(user.toJSON(), excludedFields);
};


export const findUser = async (
    query: FilterQuery<User>,
    options: QueryOptions = {}
) => {
    return await userModel.findOne(query, {}, options).select('+password');
};
  
export const findUserById = async (id: string) => {
    const user = await userModel.findById(id).lean();
    return omit(user, excludedFields);
};


export const signToken = async (user: DocumentType<User>) => {

  const userId = user._id.toString()
      
  
  const access_token = signJwt(
    { sub: userId },
    {
      expiresIn: `${config.get<number>('accessTokenExpiresIn')}m`,
    }
  );
  
  // Create a Session
  redisClient.set(userId, JSON.stringify(user), {
    EX: 60 * 60,
  });
    
  return { access_token };
};
  
