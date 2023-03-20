import { IsBoolean } from 'class-validator';

export class UpdateAddressCertifiedDto {
  @IsBoolean()
  readonly address_certified: boolean;
}
