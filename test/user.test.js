// userService.test.js
import bcrypt from 'bcrypt';
import * as userService from '../src/services/userService';
import User from '../src/models/userModel';

describe('userService', () => {
  describe('getAllUsers', () => {
    it('should get all users', async () => {
      // Mock de la función User.find para simular la obtención de usuarios
      const mockUsers = [{ _id: '1', email: 'user1@example.com' }, { _id: '2', email: 'user2@example.com' }];
      jest.spyOn(User, 'find').mockResolvedValue(mockUsers);

      const result = await userService.getAllUsers();

      expect(result).toEqual(mockUsers);
    });

    it('should throw an error if there is an issue getting users', async () => {
      // Mock de la función User.find para simular un error al obtener usuarios
      jest.spyOn(User, 'find').mockRejectedValue(new Error('Error al obtener usuarios'));

      await expect(userService.getAllUsers()).rejects.toThrow('Error al obtener usuarios');
    });
  });

  describe('getUserById', () => {
    it('should get a user by ID', async () => {
      // Mock de la función User.findById para simular la obtención de un usuario por ID
      const mockUser = { _id: '1', email: 'user1@example.com' };
      jest.spyOn(User, 'findById').mockResolvedValue(mockUser);

      const result = await userService.getUserById('1');

      expect(result).toEqual(mockUser);
    });

    it('should throw an error if there is an issue getting a user by ID', async () => {
      // Mock de la función User.findById para simular un error al obtener un usuario por ID
      jest.spyOn(User, 'findById').mockRejectedValue(new Error('Error al obtener usuario por ID'));

      await expect(userService.getUserById('1')).rejects.toThrow('Error al obtener usuario por ID');
    });
  });

  describe('updateUserById', () => {
    it('should update a user by ID', async () => {
      // Mock de la función User.findById para simular la obtención de un usuario por ID
      const mockUser = { _id: '1', email: 'user1@example.com', save: jest.fn() };
      jest.spyOn(User, 'findById').mockResolvedValue(mockUser);

      // Mock de bcrypt.hash para simular el proceso de hash de la contraseña
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword');

      const result = await userService.updateUserById('1', 'newuser@example.com', 'newpassword');

      // Verifica que se llamó a save y que los valores se actualizaron correctamente
      expect(mockUser.save).toHaveBeenCalled();
      expect(mockUser.email).toBe('newuser@example.com');
      expect(mockUser.password).toBe('hashedPassword');
      expect(result).toEqual(mockUser);
    });

    it('should throw an error if the user is not found', async () => {
      // Mock de la función User.findById para simular que no se encuentra un usuario por ID
      jest.spyOn(User, 'findById').mockResolvedValue(null);

      await expect(userService.updateUserById('1', 'newuser@example.com', 'newpassword')).rejects.toThrow('Usuario no encontrado');
    });

    // Puedes agregar más pruebas para otros casos de actualización si lo deseas
  });

  describe('deleteUserById', () => {
    it('should delete a user by ID', async () => {
      // Mock de la función User.deleteOne para simular la eliminación de un usuario por ID
      const mockResult = { deletedCount: 1 };
      jest.spyOn(User, 'deleteOne').mockResolvedValue(mockResult);

      const result = await userService.deleteUserById('1');

      expect(result).toEqual(mockResult);
    });

    it('should throw an error if the user is not found', async () => {
      // Mock de la función User.deleteOne para simular que no se encuentra un usuario por ID
      jest.spyOn(User, 'deleteOne').mockResolvedValue({ deletedCount: 0 });

      await expect(userService.deleteUserById('1')).rejects.toThrow('Usuario no encontrado');
    });

    it('should throw an error if there is an issue deleting a user by ID', async () => {
      // Mock de la función User.deleteOne para simular un error al eliminar un usuario por ID
      jest.spyOn(User, 'deleteOne').mockRejectedValue(new Error('Error al eliminar usuario por ID'));

      await expect(userService.deleteUserById('1')).rejects.toThrow('Error al eliminar usuario por ID');
    });
  });

  // Puedes agregar más pruebas para otras funciones del servicio userService
});
