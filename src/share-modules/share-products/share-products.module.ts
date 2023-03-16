import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AwsModule } from 'src/s3-upload/aws.module';
import { Products } from './entities/share-products.entity';
import { ProductsController } from './share-products.controller';
import { ProductsService } from './share-products.service';

@Module({
  imports: [TypeOrmModule.forFeature([Products]), AwsModule],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ShareProductsModule {}
