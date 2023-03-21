import { PageMetaDtoParameters } from "./meta-dto-parameter.interface";

export class PageMetaDto {
  readonly total: number;
  readonly page: number;
  readonly take: number;
  readonly last_page: number;
  readonly hasPreviousPage: boolean;
  readonly hasNextPage: boolean;

  constructor({pageOptionsDto, total}: PageMetaDtoParameters) {
    this.page = pageOptionsDto.page <= 0 ? this.page = 1 : pageOptionsDto.page;
    this.take = pageOptionsDto.take;
    this.total = total;
    this.last_page = Math.ceil(this.total / this.take);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.last_page;
  }
}