import { PartialType } from '@nestjs/mapped-types';
import { CreateRequestDto } from './createRequest.dto';

export class UpdateRequestDto extends PartialType(CreateRequestDto) {}
