import { Type } from "class-transformer";
import { IsEnum, IsOptional } from "class-validator";
import { Order } from "./page-order.enum";

export class PageOptionsDto {


  @Type(() => String)
  @IsEnum(Order)
  @IsOptional()
  readonly sort?: Order = Order.DESC;

  @Type(() => Number)
  //@IsInt()
  @IsOptional()
  readonly take?: number = 7;

  @Type(() => String)
  @IsOptional()
  readonly cursorId?: number = "" as any;

  readonly hasNextPage: boolean;
  readonly hasPreviousPage: boolean;


    
  // 오프셋
  // @Type(() => Number)
  // //@IsInt()
  // @IsOptional()
  // page?: number = 1;

  //오프셋
  // get skip(): number {
  //   return this.page <=0 ? this.page = 0 : (this.page - 1) * this.take;
  // }
}