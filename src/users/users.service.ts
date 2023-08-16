
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

    getUsers(): Promise<User[]> {
        return this.usersRepository.find();
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
        await this.usersRepository.update({id},user);
        return await this.usersRepository.findOne({where:{id}});

        
    }

    async deleteUser(user: User) {
        await this.usersRepository.delete(user);
    }

}
