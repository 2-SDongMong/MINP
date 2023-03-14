import { PaginationResult } from './pagination.results';

export class Pagination<PaginationEntity> {
  public results: PaginationEntity[];
  public total: number;
  public currentPage: number;
  public totalPages: number;

  constructor(paginationResult: PaginationResult<PaginationEntity>) {
    this.results = paginationResult.results;
    this.total = paginationResult.total;
    this.currentPage = paginationResult.currentPage;
    this.totalPages = Math.ceil(this.total / this.results.length);
  }
}
