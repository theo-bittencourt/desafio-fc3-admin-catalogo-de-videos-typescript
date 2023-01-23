import { PaginationOutputDto, PaginationOutputMApper } from '../../../@seedwork/application/dto/pagination-output';
import { SearchInputDto } from '../../../@seedwork/application/dto/search-input.dto';
import UseCase from '../../../@seedwork/application/use-case';
import CategoryRepository from '../../domain/repository/category.repository';
import { CategoryOutput, CategoryOutputMapper } from '../dto/category-output';

export default class ListCategoriesUseCase implements UseCase<Input, Output> {
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
    const pagination = PaginationOutputMApper.toOutput(searchResult)

    return { items, ...pagination }
  }
}

export type Input = SearchInputDto;

export type Output = PaginationOutputDto<CategoryOutput>;
