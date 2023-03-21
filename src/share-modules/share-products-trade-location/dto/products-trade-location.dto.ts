import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';

export class ProductsTradeLocationDto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 37.3968925296743, description: '위도' })
  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @ApiProperty({ example: 127.111925428711, description: '경도' })
  @IsNumber()
  @IsNotEmpty()
  longitude: number;
}
