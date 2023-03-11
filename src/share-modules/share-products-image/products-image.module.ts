import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductsImageController } from './products-image.controller';
import { ProductsImageService } from './products-image.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [ProductsImageController],
  providers: [ProductsImageService],
})
export class ShareProductsImageModule {}
