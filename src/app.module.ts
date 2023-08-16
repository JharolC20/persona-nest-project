import { Module } from '@nestjs/common';
import * as path from 'path';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '',
      database: 'dbpersonas',
      entities: [path.join(__dirname, "**/*.entity{.ts,.js}")],
      synchronize: true,
    }),
    UsersModule
  ],
})
export class AppModule {}
