import { PartialType } from '@nestjs/mapped-types';
import { CreateCatDto } from './create-cat.dto';

export class UpdateCatDto extends PartialType(CreateCatDto) {}
// Not null 이어야 하는 항목을 ''값으로 준 경우의 validation 체크는 프론트에서 하도록 해야 할 것 같다.
