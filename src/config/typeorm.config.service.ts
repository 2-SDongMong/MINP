import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { CatLike } from 'src/cat-likes/cat-like.entity';
import { Cat } from 'src/cats/cat.entity';
import { Message } from 'src/messages/message.entity';
import { PostComment } from 'src/post-comments/post-comment.entity';
import { PostImage } from 'src/post-images/post-image.entity';
import { Post } from 'src/posts/post.entity';
import { ShareComment } from 'src/share-comments/share-comment.entity';
import { ShareImage } from 'src/share-images/share-image.entity';
import { ProductCategory } from 'src/share-modules/share-products-category/entities/product-category.entity';
import { ShareProductsLocation } from 'src/share-modules/share-products-location/entities/share-products-location.entity';
import { ShareProductsTag } from 'src/share-modules/share-products-tag/entities/share-products-tag.entity';
import { ShareProducts } from 'src/share-modules/share-products/entities/share-products.entity';
import { SharePost } from 'src/share-posts/share-post.entity';
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
        SharePost,
        Post,
        ShareComment,
        PostComment,
        ShareImage,
        PostImage,
        CatLike,
        UserLike,
        ProductCategory,
        ShareProductsLocation,
        ShareProductsTag,
        ShareProducts,
      ],
      synchronize: false, // true,
      logging: ['error'],
      autoLoadEntities: true,
      namingStrategy: new SnakeNamingStrategy(),
    };
  }
}
