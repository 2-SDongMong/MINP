import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { request } from 'http';
import { Repository } from 'typeorm';
import { Cat } from './cat.entity';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import _ from 'lodash';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat) 
    private catRepository: Repository<Cat>,
  ) {}

  async getMyCats(id: number) {
    const cat = await this.catRepository.find({
      where: { user_id: id},
      relations: {
        user: true,
      },
      select: {
        user: {
          user_id: true
        },
        name: true,
        age: true,
        gender: true,
        neutered: true,
        image: true,
        character: true
      },
    });
    return cat;
  }

  async createCat(id: number, bodyData: CreateCatDto) {
    this.catRepository.insert({
      user_id: id,
      name: bodyData.name,
      age: bodyData.age,
      gender: bodyData.gender,
      neutered: bodyData.neutered,
      image: bodyData.image,
      character:bodyData.character
    });
  }

  async updateCatById(id: number, bodyData: UpdateCatDto) {
    const cat = await this.catRepository.findOne({
      where: { cat_id: id },
    });
    if (_.isNil(cat)) {
      throw new NotFoundException('해당 고양이를 찾지 못했습니다.');
    }
  }

  //   if (!bodyData.neutered)
  // }
  


}
