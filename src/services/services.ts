import { TodoServices } from './todo/todo.service';
import { ProductsServices } from './products/products.service';
import { SubProductsServices } from './subproducts/subproducts.service';
import { UserService } from './users/users.service';
import { SecurityService } from './security/security.service';

export const SERVICES = [
  TodoServices,
  ProductsServices,
  SubProductsServices,
  UserService,
  SecurityService,
];
