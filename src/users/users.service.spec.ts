import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { repositoryMockFactory } from '../utils/test/repositoryMock';
import { MockType } from 'src/utils/test/mockType';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Controller } from '@nestjs/common';
import { UsersController } from './users.controller';

describe('UsersService', () => {


  let service: UsersService;
  let repositoryMock: MockType<Repository<User>>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [UsersService,
        {
          provide: getRepositoryToken(User),
          useFactory: repositoryMockFactory
        }
      ],
    }).compile();

    service = moduleRef.get<UsersService>(UsersService);
    repositoryMock = moduleRef.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Testeando getUsers', () => {
    it('Deberia retornar una arreglo vacio', async () => {
      const pagOpt = { page: 1, limit: 10 };
      const result = [];
      repositoryMock.find.mockReturnValue(result);
      expect(await service.getUsers(pagOpt)).toBe(result);
    });

    it('Deberia retornar una persona', async () => {
      const pagOpt = { page: 1, limit: 10 };
      const result = [{ nombre: 'harol', apellido: 'Casti', edad: 12 }];
      repositoryMock.find.mockReturnValue(result);
      expect(await service.getUsers(pagOpt)).toBe(result);
    });
  });
  describe('Testeando Createuser', () => {

    it('Deberia crear una persona', async () => {
      const result = { nombre: 'harol', apellido: 'Casti', edad: 12 } as User;
      repositoryMock.save.mockReturnValue(result);
      expect(await service.createUser(result)).toBe(result);
    });
  });

  describe('Testeando UpdateUser', () => {

    it('Deberia Actualizar una persona', async () => {
      const actualizar = { nombre: 'luis', apellido: 'Suarez', edad: 26 } as User
      repositoryMock.update.mockReturnValue(actualizar);
      repositoryMock.findOne.mockReturnValue(actualizar);
      var respuesta = await service.updateUser(1, actualizar);
      expect(respuesta).toBe(actualizar);
    });
  });

  describe('Testeando DeleteUser', () => {

    it('Deberia Eliminar una persona', async () => {
      const id = 1;
      await service.deleteUser(id);
      expect(200);
    });
  })


});
