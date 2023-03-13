import { PartialType} from "@nestjs/mapped-types";
import { CreateUserDto } from './create-user.dto';

export class UpdateMypageDto extends PartialType(CreateUserDto) {
  nickname?: string;
  address?: string;
  phone_number?: string;
  password?: string;
}