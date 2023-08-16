
import { Controller, Post, Body, Get, Put, Delete, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';


@Controller('users')

export class UsersController {
    constructor(private service: UsersService) { }

    @Get()
    getAll(): Promise<User[]>{
        return this.service.getUsers();
    }

    @Get(':id')
    get(@Param() params): Promise<User> {
        return this.service.getUser(params.id);
    }

    @Post()
    create(@Body() user: User): Promise<User> {
        return this.service.createUser(user);
    }

    @Put(':id')
    update(@Body() user: User, @Param() params): Promise<User> {
        user.id = params.id;
         return this.service.updateUser(params.id,user);
    }

    @Delete(':id')
    deleteUser(@Param() params): Promise<void> {
       return  this.service.deleteUser(params.id);
    }
}
