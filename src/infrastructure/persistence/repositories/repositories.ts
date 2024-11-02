import { TodoRepository } from './todo/todo.repository';
import { ProductRepository } from './products/products.repository';
import { SubProductRepository } from './subproducts/subproducts.repository';

export const REPOSITORIES = [
  TodoRepository,
  ProductRepository,
  SubProductRepository,
];
