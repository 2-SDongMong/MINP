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

@Module({
  imports: [
    // 제일 먼저 보이는 모듈에 db접속정보가 다 보이니까 감춰
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
  ],
  controllers: [AppController],
  providers: [AppService, AuthMiddleware],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      // PUT /user/update 경로에 AuthMiddelware 미들웨어 적용.
      .forRoutes({ path: 'user/update', method: RequestMethod.PUT });
  }
}
