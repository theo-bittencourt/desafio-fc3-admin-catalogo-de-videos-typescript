import { SearchInputDto } from '@seedwork/application/dto/search-input.dto';
import { default as DefaultUseCase } from '@seedwork/application/use-case';
import CategoryRepository from '../../domain/repository/category.repository';
import { CategoryOutput, CategoryOutputMapper } from '../dto/category-output';
import { PaginationOutputDto, PaginationOutputMapper } from '#seedwork/application/dto/pagination-output.dto';

export namespace ListCategoriesUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private repository: CategoryRepository.Repository
    ) {
      this.repository = repository;
    }

    async execute(input: Input): Promise<Output> {
      const params = new CategoryRepository.SearchParams(input);
      const searchResult = await this.repository.search(params);

      return this.toOutput(searchResult);
    }

    private toOutput(searchResult: CategoryRepository.SearchResult): Output {
      const items = searchResult.items.map(cat => CategoryOutputMapper.toOutput(cat));
      const pagination = PaginationOutputMapper.toOutput(searchResult)

      return { items, ...pagination }
    }
  }

  export type Input = SearchInputDto;

  export type Output = PaginationOutputDto<CategoryOutput>;
}

export default ListCategoriesUseCase;
