import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config.js';
import User from '../models/userModel.js';

export const registerUser = async ({ email, password }) => {
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('Ya existe un usuario con el mismo correo electrónico');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    const accessToken = jwt.sign({ userId: newUser._id }, config.secretKey);

    return { accessToken };
  } catch (error) {
    throw error;
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Credenciales inválidas');
    }

    const accessToken = jwt.sign({ userId: user._id }, config.secretKey);

    return { accessToken };
  } catch (error) {
    throw error;
  }
};
