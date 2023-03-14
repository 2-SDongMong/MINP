import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { CatLike } from 'src/cat-likes/cat-like.entity';
import { Cat } from 'src/cats/cat.entity';
import { Message } from 'src/messages/message.entity';
import { PostComment } from 'src/post-comments/post-comment.entity';
import { PostImage } from 'src/post-images/post-image.entity';
import { Post } from 'src/posts/post.entity';
import { ProductCategory } from 'src/share-modules/share-products-category/entities/product-category.entity';
import { ShareProducts } from 'src/share-modules/share-products/entities/share-products.entity';

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
        ProductCategory,
        ShareProducts,
      ],
      synchronize: true, // true, false
      logging: ['error'],
      autoLoadEntities: true,
      namingStrategy: new SnakeNamingStrategy(),
    };
  }
}
