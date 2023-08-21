
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { skip } from 'node:test';
import { PageOptions } from './page.options';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

    getUsers(options:PageOptions): Promise<User[]> {
        const offset = options.page * options.limit;
        return this.usersRepository.find(
            {
                take: options.limit,
                skip: offset
            }
        );
    }

    getUser(_id: number): Promise<User> {
        return this.usersRepository.findOne({
            select: ["id", "nombre", "apellido", "edad"],
            where: [{ "id": _id }]
        });
    }
    createUser(user: User): Promise<User> {
        return this.usersRepository.save(user)
    }
    async updateUser(id: number, user: User): Promise<User> {
        await this.usersRepository.update({ id }, user);
        return await this.usersRepository.findOne({ where: { id } });
    }

    async deleteUser(id: number) {
        await this.usersRepository.delete(id);
    }

}
