import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';

export class ProductsTradeLocationDto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Seoul', description: '도시명' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ example: 'mapogu', description: '지역명' })
  @IsString()
  @IsNotEmpty()
  cityDetail: string;
}
