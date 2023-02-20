import { default as DefaultUseCase } from '@seedwork/application/use-case';
import { Category } from '../../domain/entities/category';
import CategoryRepository from '../../domain/repository/category.repository';
import { CategoryOutput, CategoryOutputMapper } from '../dto/category-output';

export namespace CreateCategoryUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private repository: CategoryRepository.Repository
    ) {
      this.repository = repository;
    }

    async execute(input: Input): Promise<CategoryOutput> {
      /**
       * OBS: Por acaso, o `input` do UseCase combina com as props da Category, e nesse caso não precisamos
       * realizar conversão. Mas nem sempre é assim.
       */

      const entity: any = new Category(input);

      await this.repository.insert(entity);

      return CategoryOutputMapper.toOutput(entity);
    }
  }

  export type Input = {
    name: string;
    description?: string;
    is_active?: boolean;
  }

  export type Output = CategoryOutput;
}

export default CreateCategoryUseCase;
