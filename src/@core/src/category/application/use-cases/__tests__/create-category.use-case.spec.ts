import CategoryInMemoryRepository from '../../../infra/repository/category-in-memory.repository';
import CreateCategoryUseCase from '../create-category.use-case'

describe('CreateCategoryUseCase Unit Tests', () => {
  let useCase: CreateCategoryUseCase.UseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new CreateCategoryUseCase.UseCase(repository);
  });

  describe('creates a Category', () => {
    it('', async () => {
      const output = await useCase.execute({ name: 'test' })

      expect(output).toStrictEqual({
        id: repository.items[0].id,
        name: 'test',
        description: null,
        is_active: true,
        created_at: repository.items[0].created_at
      })
    })

    it('', async () => {
      const output = await useCase.execute({ name: 'test', description: 'lorem foo...', is_active: false })

      expect(output).toStrictEqual({
        id: repository.items[0].id,
        name: 'test',
        description: 'lorem foo...',
        is_active: false,
        created_at: repository.items[0].created_at
      })
    })
  })
})
