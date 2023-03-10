import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './commons/filter/http-exception.filter';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import basicAuth from 'express-basic-auth';
import { setupSwagger } from './config/swagger.config.service';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  app.useStaticAssets(join(__dirname, '../', 'views', 'public'));
  app.setBaseViewsDir(join(__dirname, '../', 'views'));
  app.setViewEngine('ejs');

  // Express cookie 사용을 위한 cookie parser 글로벌 미들웨어로 지정
  app.use(cookieParser());

  const configService = app.get(ConfigService);

  setupSwagger(app);

  app.use(
    ['/docs', '/docs-json'],
    basicAuth({
      challenge: true,
      users: {
        [configService.get('SWAGGER_USER')]:
          configService.get('SWAGGER_PASSWORD'),
      },
    })
  );
  app.enableCors({
    origin: true,
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
