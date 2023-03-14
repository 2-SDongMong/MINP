export interface PaginationResult<PaginationEntity> {
  results: PaginationEntity[];
  total: number;
  currentPage: number;
  totalPages?: number;
}
