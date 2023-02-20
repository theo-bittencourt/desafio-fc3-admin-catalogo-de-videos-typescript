import NotFoundError from '../../../../@seedwork/domain/errors/not-found.error';
import { Category } from '../../../domain/entities/category';
import CategoryInMemoryRepository from '../../../infra/repository/category-in-memory.repository';
import DeleteCategoryUseCase from '../delete-category.use-case';

describe('DeleteCategoryUseCase Unit Tests', () => {
  let useCase: DeleteCategoryUseCase.UseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new DeleteCategoryUseCase.UseCase(repository);
  });

  it('delete a Category by id', async () => {
    const category = new Category({ name: 'test' });
    const spyFindById = jest.spyOn(repository, 'findById');

    repository.insert(category);

    await useCase.execute({ id: category.id })

    expect(spyFindById).toHaveBeenCalledTimes(1);
    expect(repository.items).toHaveLength(0);
  })

  it('throws an error when entity not found', async () => {
    expect(() => useCase.execute({ id: 'nonexistent-id' })).rejects.toThrowError(
      new NotFoundError('Entity Not Found using ID nonexistent-id'))
  })

})
