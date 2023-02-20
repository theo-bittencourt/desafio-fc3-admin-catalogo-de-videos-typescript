import { Category } from '../../domain/entities/category';

/**
 * NOTE: Pelo fato de Casos de Uso possuirem diferentes propósitos, pode ser que em algum momento
 * o DTO abaixo possa não ser reaproveitado.
 */
export type CategoryOutput = {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: Date;
}

/**
 * NOTE: Esse mapper é possível somente pelo fato de que os Casos de Uso **atuais** utilizam a
 * mesma estrutura de output. Caso os Use Cases precisem de diferentes estruturas de output, esse
 * mapper deve ser removido.
 * https://plataforma.fullcycle.com.br/courses/210/168/143/conteudos?capitulo=143&conteudo=8164
 */
export class CategoryOutputMapper {
  static toOutput(category: Category): CategoryOutput {
    return category.toJSON();
  }
}
