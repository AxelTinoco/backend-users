// auth.test.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as authService from '../src/services/authService';
import config from '../src/config';
import User from '../src/models/userModel'; // Importa el modelo User directamente

describe('authService', () => {
  describe('registerUser', () => {
    it('should register a new user and return an access token', async () => {
      // Configuración de valores de prueba
      const email = 'test@example.com';
      const password = 'password123';

      // Mock de la función User.findOne para simular que no existe un usuario con el mismo correo
      jest.spyOn(User, 'findOne').mockResolvedValue(null);

      // Mock de bcrypt.hash para simular el proceso de hash de la contraseña
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword');

      // Mock de la creación y guardado de un nuevo usuario
      const newUser = { _id: 'mockedUserId', email, password: 'hashedPassword' };
      jest.spyOn(User.prototype, 'save').mockResolvedValue(newUser);

      // Mock de jwt.sign para simular la generación del token de acceso
      jest.spyOn(jwt, 'sign').mockImplementation((payload, secret) => {
        // Verifica que el secreto coincida con tu configuración
        expect(secret).toBe(config.secretKey);
        return 'mockedAccessToken';
      });

      // Ejecutar la función de registro
      const result = await authService.registerUser({ email, password });

      // Verificar expectativas
      expect(result).toEqual({ accessToken: 'mockedAccessToken' });
    });

    it('should throw an error if user with the same email already exists', async () => {
      // Configuración de valores de prueba
      const email = 'existing@example.com';
      const password = 'password123';

      // Mock de la función User.findOne para simular que ya existe un usuario con el mismo correo
      jest.spyOn(User, 'findOne').mockResolvedValue({});

      // Ejecutar la función de registro y verificar que arroje un error
      await expect(authService.registerUser({ email, password })).rejects.toThrow('Ya existe un usuario con el mismo correo electrónico');
    });
  });

  // Puedes agregar más pruebas para otras funciones del servicio authService
});
