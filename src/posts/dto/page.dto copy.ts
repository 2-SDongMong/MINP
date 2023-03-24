import { IsArray } from 'class-validator';
import { PageMetaDto } from './page-meta.dto';

export class PageDto<T> {
  @IsArray()
  readonly data: T[];

  readonly meta: PageMetaDto;

  constructor(data: T[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }

  //오프셋
  // @IsArray()
  // readonly data: T[];   // data

  // readonly meta: PageMetaDto;  // meta

  // constructor(data: T[], meta: PageMetaDto) {
  //   this.data = data;
  //   this.meta = meta;
  // }
}
