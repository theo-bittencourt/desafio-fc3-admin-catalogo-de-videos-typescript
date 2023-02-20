import NotFoundError from '../../../../@seedwork/domain/errors/not-found.error';
import { Category } from '../../../domain/entities/category';
import CategoryInMemoryRepository from '../../../infra/repository/category-in-memory.repository';
import UpdateCategoryUseCase from '../update-category.use-case';

describe('UpdateCategoryUseCase Unit Tests', () => {
  let useCase: UpdateCategoryUseCase.UseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new UpdateCategoryUseCase.UseCase(repository);
  });

  it('throws error when entity is not found', () => {
    expect(
      () => useCase.execute({ id: 'nonexistent-id', name: 'fake' })
    ).rejects.toThrow(new NotFoundError('Entity Not Found using ID nonexistent-id'))
  })

  it('updates a Category', async () => {
    const spyUpdate = jest.spyOn(repository, 'update')
    const category = new Category({ name: 'Foo', is_active: true })

    repository.items = [category]

    const output = await useCase.execute({ id: category.id, name: 'Updated Foo', is_active: false })

    expect(output).toStrictEqual({
      id: category.id,
      name: 'Updated Foo',
      description: null,
      is_active: false,
      created_at: category.created_at
    })

    expect(spyUpdate).toBeCalledTimes(1)
  })
})
