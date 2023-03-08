import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShareProducts } from './entities/share-products.entity';
import { ShareProductsController } from './share-products.controller';
import { ShareProductsService } from './share-products.service';

@Module({
  imports: [TypeOrmModule.forFeature([ShareProducts])],
  controllers: [ShareProductsController],
  providers: [ShareProductsService],
})
export class ShareProductsModule {}
