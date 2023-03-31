import { Module } from '@nestjs/common';

import { User } from './user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtConfigService } from '../config/jwt.config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from '../share-modules/share-products/entities/share-products.entity';
import { Post } from '../posts/post.entity';
import { Request } from '../requests/request.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Request, Products, Post]),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: JwtConfigService,
      inject: [ConfigService],
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
