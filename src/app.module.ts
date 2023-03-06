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
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigService } from './config/jwt.config.service';
import { AuthMiddleware } from './auth/auth.middleware';
import { RequestModule } from './request/request.module';
import { CatModule } from './cat/cat.module';
import { MessageModule } from './message/message.module';
import { PostModule } from './post/post.module';
import { PostCommentModule } from './post-comment/post-comment.module';
import { UserLikeModule } from './user-like/user-like.module';
import { PostImageModule } from './post-image/post-image.module';
import { CatLikeModule } from './cat-like/cat-like.module';
import { ShareCommentModule } from './share-comment/share-comment.module';
import { SharePostModule } from './share-post/share-post.module';
import { ShareImageModule } from './share-image/share-image.module';

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

    UserModule,

    RequestModule,

    CatModule,

    MessageModule,

    PostModule,

    PostCommentModule,

    CatLikeModule,

    PostImageModule,

    UserLikeModule,

    ShareCommentModule,

    SharePostModule,

    ShareImageModule,
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
