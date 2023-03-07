import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { CatLike } from 'src/cat-like/cat-like.entity';
import { Cat } from 'src/cat/cat.entity';
import { Message } from 'src/message/message.entity';
import { PostComment } from 'src/post-comment/post-comment.entity';
import { PostImage } from 'src/post-image/post-image.entity';
import { Post } from 'src/post/post.entity';
import { ShareComment } from 'src/share-comment/share-comment.entity';
import { ShareImage } from 'src/share-image/share-image.entity';
import { SharePost } from 'src/share-post/share-post.entity';
import { UserLike } from 'src/user-like/user-like.entity';
import { User } from 'src/user/user.entity';

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
      ],
      synchronize: true,
      autoLoadEntities: true,
    };
  }
}
