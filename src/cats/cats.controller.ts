import { Controller, Get, Post, Put, Delete, Body } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';


@Controller('cats')
export class CatsController {
  constructor(private readonly catService: CatsService) {}

  // @Post('/mycat')
  // createCat(@Body() data: CreateCatDto) {
  //   return this.catService.createCat(
  //     data.name,
  //     data.age,
  //     data.gender,
  //     data.neutered,
  //     data.character,
  //     data.image
  //   )
  // }
}
