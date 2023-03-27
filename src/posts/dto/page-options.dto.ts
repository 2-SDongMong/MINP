import { Type } from "class-transformer";
import { IsEnum, IsOptional } from "class-validator";

export class PageOptionsDto {

  @Type(() => Number)
  @IsOptional()
  readonly take?: number;

  @Type(() => String)
  @IsOptional()
  readonly endCursor?: number = "" as any;

  @Type(() => String)
  @IsOptional()
  readonly startCursor?: number = "" as any;

  readonly hasNextPage: boolean;
  readonly hasPreviousPage: boolean;

}
