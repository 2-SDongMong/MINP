import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from './cat.entity';

@Injectable()
export class CatsService {
  // constructor(
  //   @InjectRepository(Cat) private catRepository: Repository<Cat>,
  //   {}
  // )
}
