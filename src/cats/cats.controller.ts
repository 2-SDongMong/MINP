import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './CreateCatDto';

@Controller('cats')
export class CatsController {
    constructor(private catsService: CatsService){};
    //private 사용-> 선언과 동시에 초기화 가능
    @Get()
    findAll(): string{
        return 'This action returns all cats'
    }
    
    @Get(':id')
    findOne(@Param('id')id: string): string{
        return `This action returns a #${id} cat`
    }

    @Post()
    create(@Body() CreateCatDto: CreateCatDto){
        return this.catsService.create(CreateCatDto);
    }

    @Put(':id')
    update(@Param('id')id: string,@Body() createCatDto:CreateCatDto){
        return `This action updates a #${id} cat`
    }

    @Delete(':id')
    remove(@Param('id')id: string){
        return `This action removes a #${id} cat`
    }

}
