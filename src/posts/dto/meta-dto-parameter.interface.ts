import { PageOptionsDto } from './page-options.dto';

export interface PageMetaDtoParameters {
  pageOptionsDto: PageOptionsDto;
  total: number;
  hasNextData: boolean;
  cursor: number;

  // pageOptionsDto: PageOptionsDto;
  // total: number;
}
