import userModel from '../models/user';
import { omit, get } from 'lodash';

const excludedFields = ['password'];

export const findAllUsers = async () => {
    return await userModel.find();
  };

export const findUserById = async (id: string) => {
  const user = await userModel.findById(id).lean();
  return omit(user, excludedFields);
};