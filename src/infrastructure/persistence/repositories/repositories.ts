import { TodoRepository } from './todo/todo.repository';
import { ProductRepository } from './products/products.repository';
import { SubProductRepository } from './subproducts/subproducts.repository';
import { UserRepository } from './users/users.repository';

export const REPOSITORIES = [
  TodoRepository,
  ProductRepository,
  SubProductRepository,
  UserRepository,
];
