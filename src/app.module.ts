import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/typeorm.config.service';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigService } from './config/jwt.config.service';
import { AuthMiddleware } from './auth/auth.middleware';
import { RequestsModule } from './requests/requests.module';
import { CatsModule } from './cats/cats.module';
import { MessagesModule } from './messages/messages.module';
import { PostsModule } from './posts/posts.module';
import { PostCommentsModule } from './post-comments/post-comments.module';
import { UserLikesModule } from './user-likes/user-likes.module';
import { PostImagesModule } from './post-images/post-images.module';
import { CatLikesModule } from './cat-likes/cat-likes.module';
import { ShareCommentsModule } from './share-comments/share-comments.module';
import { SharePostsModule } from './share-posts/share-posts.module';
import { ShareImagesModule } from './share-images/share-images.module';
import { ShareProductsModule } from './share-modules/share-products/share-products.module';
import { ShareProductsCategoryModule } from './share-modules/share-products-category/products-category.module';

import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: JwtConfigService,
      inject: [ConfigService],
    }),
    UsersModule,

    RequestsModule,

    AuthModule,

    PassportModule,

    CatsModule,

    MessagesModule,

    PostsModule,

    PostCommentsModule,

    CatLikesModule,

    PostImagesModule,

    UserLikesModule,

    ShareCommentsModule,

    SharePostsModule,

    ShareImagesModule,

    ShareProductsModule,

    ShareProductsCategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthMiddleware],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'auth/logout', method: RequestMethod.ALL },
        { path: 'requests', method: RequestMethod.POST },
        { path: 'requests/:id', method: RequestMethod.PATCH },
        { path: 'requests/:id', method: RequestMethod.DELETE },
        { path: 'user/mypage', method: RequestMethod.ALL },
        { path: 'cats', method: RequestMethod.ALL },
        { path: 'messages', method: RequestMethod.POST },
        { path: 'messages/sent', method: RequestMethod.GET },
        { path: 'messages/received', method: RequestMethod.GET }
      );
  }
}
