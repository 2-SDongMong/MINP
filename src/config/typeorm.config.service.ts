import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { CatLike } from 'src/cat-likes/cat-like.entity';
import { Cat } from 'src/cats/cat.entity';
import { Message } from 'src/messages/message.entity';
import { PostComment } from 'src/post-comments/post-comment.entity';
import { PostImage } from 'src/post-images/post-image.entity';
import { Post } from 'src/posts/post.entity';
import { ProductsCategory } from 'src/share-modules/share-products-category/entities/products-category.entity';
import { ProductsTradeLocation } from 'src/share-modules/share-products-trade-location/entities/products-trade-location.entity';
import { Products } from 'src/share-modules/share-products/entities/share-products.entity';
import { UserLike } from 'src/user-likes/user-like.entity';
import { User } from 'src/users/user.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly conigService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.conigService.get<string>('DATABASE_HOST'),
      port: this.conigService.get<number>('DATABASE_PORT'),
      username: this.conigService.get<string>('DATABASE_USERNAME'),
      password: this.conigService.get<string>('DATABASE_PASSWORD'),
      database: this.conigService.get<string>('DATABASE_NAME'),
      entities: [
        User,
        Cat,
        Request,
        Message,
        Post,
        PostComment,
        PostImage,
        CatLike,
        UserLike,
        ProductsCategory,
        Products,
        ProductsTradeLocation,
      ],
      synchronize: false, // true,
      logging: ['error'],
      autoLoadEntities: true,
      namingStrategy: new SnakeNamingStrategy(),
    };
  }
}
