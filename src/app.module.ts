import {
  CacheModule,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
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
import { ShareProductsModule } from './share-modules/share-products/share-products.module';
import { ShareProductsCategoryModule } from './share-modules/share-products-category/products-category.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { EjsRenderController } from './ejs-render/ejs-render.controller';
import { EjsRenderModule } from './ejs-render/ejs-render.module';
import { AwsModule } from './s3-upload/aws.module';
import { CacheConfigService } from './config/cache.config.service';

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
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: CacheConfigService,
    }),

    UsersModule,

    RequestsModule,

    AuthModule,

    PassportModule,

    CatsModule,

    MessagesModule,

    PostsModule,

    PostCommentsModule,

    PostImagesModule,

    UserLikesModule,

    ShareProductsModule,

    ShareProductsCategoryModule,

    EjsRenderModule,
  ],
  controllers: [EjsRenderController],
  providers: [AwsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
      { path: 'auth/logout', method: RequestMethod.ALL },
      { path: 'requests', method: RequestMethod.POST },
      { path: 'requests/:id', method: RequestMethod.PATCH },
      { path: 'requests/:id', method: RequestMethod.DELETE },
      { path: 'requests/ongoing/:id', method: RequestMethod.PATCH },
      { path: 'users/mypage', method: RequestMethod.ALL },
      { path: 'users/mypage/:id', method: RequestMethod.ALL },
      { path: 'users/admin', method: RequestMethod.ALL },
      { path: 'users/admin/:id', method: RequestMethod.PATCH },
      { path: 'users/admin/member', method: RequestMethod.ALL },
      { path: 'users/admin/member/:id', method: RequestMethod.ALL },
      { path: 'users/mypost', method: RequestMethod.ALL },
      { path: 'users/mypost/:id', method: RequestMethod.DELETE },
      { path: 'users/requests/:id', method: RequestMethod.DELETE },
      { path: 'users/share', method: RequestMethod.ALL },
      { path: 'users/share/:id', method: RequestMethod.DELETE },
      { path: 'users/post', method: RequestMethod.ALL },
      { path: 'users/post/:id', method: RequestMethod.DELETE },
      { path: 'users/address/certify', method: RequestMethod.PATCH },
      { path: 'cats', method: RequestMethod.ALL },
      { path: 'cats/:id', method: RequestMethod.PATCH },
      { path: 'messages', method: RequestMethod.POST },
      { path: 'messages/sent', method: RequestMethod.GET },
      { path: 'messages/received', method: RequestMethod.GET },
      { path: 'messages/unread', method: RequestMethod.GET },
      { path: 'messages/:id', method: RequestMethod.GET },
      { path: 'posts', method: RequestMethod.POST },
      { path: 'posts/:id', method: RequestMethod.PATCH },
      { path: 'posts/:id', method: RequestMethod.DELETE },
      { path: 'shareDetail/:id', method: RequestMethod.GET },
      { path: 'shareProduct', method: RequestMethod.POST },
      { path: 'posts/:postId/comments', method: RequestMethod.POST },
      {
        path: 'posts/:postId/comments/:commentId',
        method: RequestMethod.PATCH,
      },
      {
        path: 'posts/:postId/comments/:commentId',
        method: RequestMethod.DELETE,
      },
      { path: 'shareMy', method: RequestMethod.GET },

      // FIXME: 쿠키 방식이 모두에게 잘 적용됨을 확인하면 삭제하기
      // { path: 'views/.', method: RequestMethod.GET }
      EjsRenderController
    );
  }
}
