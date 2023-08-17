import { Entity, Repository } from 'typeorm';
import { MockType } from './mockType';

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn(entity => entity),
  find: jest.fn(entity => entity),
  save: jest.fn(entity => entity),
  update: jest.fn(entity => entity),
  delete: jest.fn(entity => entity)
  // ...
}));