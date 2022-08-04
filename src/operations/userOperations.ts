import { findAllUsers, findUserById } from '../repositories/userRepository';


export const getAllUsers = async () => {

  const allUsers = await findAllUsers()
  
  return allUsers
}

export const getUserById = async (id:string) => {

  return await findUserById(id);

};

