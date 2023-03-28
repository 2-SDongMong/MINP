import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Cat } from '../cats/cat.entity';
import { Message } from '../messages/message.entity';
import { PostComment } from '../post-comments/post-comment.entity';
import { PostImage } from '../post-images/post-image.entity';
import { Post } from '../posts/post.entity';
import { ProductsCategory } from '../share-modules/share-products-category/entities/products-category.entity';
import { ProductsTradeLocation } from '../share-modules/share-products-trade-location/entities/products-trade-location.entity';
import { Products } from '../share-modules/share-products/entities/share-products.entity';
import { UserLike } from '../user-likes/user-like.entity';
import { User } from '../users/user.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly conigService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      // FIXME: host, port, username, password, database는 로컬 환경일 때
      // host: this.conigService.get<string>('DATABASE_HOST'),
      // port: this.conigService.get<number>('DATABASE_PORT'),
      // username: this.conigService.get<string>('DATABASE_USERNAME'),
      // password: this.conigService.get<string>('DATABASE_PASSWORD'),
      // database: this.conigService.get<string>('DATABASE_NAME'),
      url: this.conigService.get<string>('DATABASE_URL'),
      entities: [
        User,
        Cat,
        Request,
        Message,
        Post,
        PostComment,
        PostImage,
        UserLike,
        ProductsCategory,
        Products,
        ProductsTradeLocation,
      ],
      synchronize: false,
      logging: ['error'],
      autoLoadEntities: true,
      namingStrategy: new SnakeNamingStrategy(),
      timezone: 'Z',
    };
  }
}
