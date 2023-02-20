import { default as DefaultUseCase } from '@seedwork/application/use-case';
import CategoryRepository from '../../domain/repository/category.repository';
import { CategoryOutput } from '../dto/category-output';

export namespace GetCategoryUseCase {
  export class UserCase implements DefaultUseCase<Input, Output> {
    constructor(
      private repository: CategoryRepository.Repository
    ) {
      this.repository = repository;
    }

    async execute(input: Input): Promise<CategoryOutput> {
      const entity = await this.repository.findById(input.id);

      return {
        id: entity.id,
        name: entity.name,
        description: entity.description,
        is_active: entity.is_active,
        created_at: entity.created_at
      }
    }
  }

  export type Input = {
    id: string;
  }

  export type Output = CategoryOutput;

}

export default GetCategoryUseCase;
