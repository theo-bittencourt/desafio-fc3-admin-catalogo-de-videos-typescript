import UseCase from '../../../@seedwork/application/use-case';
import CategoryRepository from '../../domain/repository/category.repository';
import { CategoryOutput } from '../dto/category-output';

export default class DeleteCategoryUseCase implements UseCase<Input, Output> {
  constructor(
    private repository: CategoryRepository.Repository
  ) {
    this.repository = repository;
  }

  async execute(input: Input): Promise<Output> {
    const entity = await this.repository.findById(input.id);
    await this.repository.delete(entity.id)
  }
}

export type Input = {
  id: string;
}

export type Output = void;
