import { SearchResult } from '../../domain/repository/repository-contracts';

export type PaginationOutputDto<Item> = {
  items: Item[];
  total: number;
  current_page: number;
  last_page: number;
  per_page: number;
}

export class PaginationOutputMApper {
  static toOutput(result: SearchResult) {
    return {
      total: result.total,
      current_page: result.current_page,
      last_page: result.last_page,
      per_page: result.per_page,
    }
  }
}
