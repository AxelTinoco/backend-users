// userService.js
import User from '../models/userModel.js';
import bcrypt from 'bcrypt';

export const getAllUsers = async () => {
  try {
    return await User.find();
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    return await User.findById(id);
  } catch (error) {
    throw error;
  }
};

export const updateUserById = async (id, email, password) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10);

    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
};

export const deleteUserById = async (id) => {
  try {
    const result = await User.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      throw new Error('Usuario no encontrado');
    }

    return result;
  } catch (error) {
    throw error;
  }
};
