import UseCase from '../../../@seedwork/application/use-case';
import CategoryRepository from '../../domain/repository/category.repository';
import { CategoryOutput, CategoryOutputMapper } from '../dto/category-output';

export default class UpdateCategoryUseCase implements UseCase<Input, Output> {
  constructor(
    private repository: CategoryRepository.Repository
  ) {
    this.repository = repository;
  }

  async execute(input: Input): Promise<CategoryOutput> {
    const entity = await this.repository.findById(input.id)

    entity.update(input.name, input.description);

    if (input.is_active === true) {
      entity.activate()
    }

    if (input.is_active === false) {
      entity.deactivate()
    }

    await this.repository.update(entity);

    return CategoryOutputMapper.toOutput(entity);
  }
}

export type Input = {
  id: string;
  name: string;
  description?: string;
  is_active?: boolean;
}

export type Output = CategoryOutput;
