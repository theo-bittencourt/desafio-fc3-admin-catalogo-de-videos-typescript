import NotFoundError from '../../../../@seedwork/domain/errors/not-found.error';
import { Category } from '../../../domain/entities/category';
import CategoryInMemoryRepository from '../../../infra/repository/category-in-memory.repository';
import GetCategoryUseCase from '../get-category.use-case';

describe('GetCategoryUseCase Unit Tests', () => {
  let useCase: GetCategoryUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new GetCategoryUseCase(repository);
  });

  describe('get a Category by id', () => {
    it('', async () => {
      const category = new Category({ name: 'test' });
      const spyFindById = jest.spyOn(repository, 'findById');

      repository.insert(category);

      const output = await useCase.execute({ id: category.id })

      expect(output).toStrictEqual({
        id: category.id,
        name: 'test',
        description: null,
        is_active: true,
        created_at: category.created_at
      })

      expect(spyFindById).toHaveBeenCalledTimes(1);
    })

    it('throws an error when entity not found', async () => {
      expect(() => useCase.execute({ id: 'nonexistent-id' })).rejects.toThrowError(
        new NotFoundError('Entity Not Found using ID nonexistent-id'))
    })
  })
})
