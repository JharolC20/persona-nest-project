import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { resolve } from 'path';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { repositoryMockFactory } from '../utils/test/repositoryMock';
import { MockType } from 'src/utils/test/mockType';
import { Repository } from 'typeorm';

describe('UsersController', () => {
  let usersController: UsersController;
  let repositoryMock: MockType<Repository<User>>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService,
        {
          provide: getRepositoryToken(User),
          useFactory: repositoryMockFactory
        }
      ],

    }).compile();
    usersController = moduleRef.get<UsersController>(UsersController);
    repositoryMock = moduleRef.get(getRepositoryToken(User));
  });

  // it('should be defined', () => {
  //   expect(controller).toBeDefined();
  // });
  describe('Testeando getAll', () => {
    it('Deberia retornar una arreglo vacio', async () => {
      const result = [];
      repositoryMock.find.mockReturnValue(result);
      expect(await usersController.getAll()).toBe(result);
    });

    it('Deberia retornar un arreglo', async () => {
      const result = [{ nombre: 'Pedro', apellido: 'Ruizs', edad: 12 }];
      repositoryMock.find.mockReturnValue(result);
      expect(await usersController.getAll()).toBe(result);
    });
  });

  describe('Testeando create', () => {

    it('Deberia crear una persona', async () => {
      const result = { nombre: 'Jorge', apellido: 'Jara', edad: 29 } as User;
      repositoryMock.save.mockReturnValue(result);
      expect(await usersController.create(result)).toBe(result);
    });
  });

  describe('Testeando delete', () => {

    it('Deberia Eliminar una persona', async () => {
      const id = 1;
      await usersController.delete(id);
    });
  });

  describe('Testeando update', () => {

    it('Deberia crear una persona', async () => {
      const id=1;
      const params ={id:1};
      const actualizar = { nombre: 'luis', apellido: 'Suarez', edad: 26 } as User;
      //const nuevo = {id:1, nombre: 'luis', apellido: 'Suarez', edad: 26 } as User;
      repositoryMock.update.mockReturnValue(actualizar);
      repositoryMock.findOne.mockReturnValue(actualizar);
      var respuesta = await usersController.update(actualizar, params);
      //console.log(JSON.stringify(respuesta));
      expect(respuesta).toBe(actualizar);
      //expect(await usersController.update(1,actualizar)).toBe(actualizar);
    });
  });

});
