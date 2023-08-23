
import { Controller, Post, Body, Get, Put, Delete, Param, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { PageOptions } from './page.options';
import { query } from 'express';



@Controller('users')

export class UsersController {
    constructor(private service: UsersService) { }

    //url=/users
    @Get()
    getAll(@Query() pageOptions: PageOptions): Promise<User[]> {
        //console.log('hola',JSON.stringify(pageOptions));
        return this.service.getUsers(pageOptions);
        //return this.service.findAll(take, skip);
    }
    //url = /users/id = patth variable
    @Get(':id')
    get(@Param() Param): Promise<User> {
        return this.service.getUser(Param.id);
    }

    @Post()
    create(@Body() user: User): Promise<User> {
        return this.service.createUser(user);
    }

    @Put(':id')
    update(@Body() user: User, @Param() params): Promise<User> {
        user.id = params.id;
        return this.service.updateUser(params.id, user);
    }

    @Delete(':id')
    delete(@Param() params): Promise<void> {
        return this.service.deleteUser(params.id);
    }
}
