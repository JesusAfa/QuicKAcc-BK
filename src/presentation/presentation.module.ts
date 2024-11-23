import { ServiceModule } from '@app/services/services.module';
import { Module } from '@nestjs/common';
import { TodoController } from './controllers/todo/todo.controller';
import { ProductsController } from './controllers/products/products.controller';
import { SubProductsController } from './controllers/subproducts/subproducts.controller';
import { UserController } from './controllers/users/users.controller';
import { SecurityController } from './controllers/security/security.controller';

@Module({
  imports: [ServiceModule],
  controllers: [
    TodoController,
    ProductsController,
    SubProductsController,
    UserController,
    SecurityController,
  ],
})
export class PresentationModule {}
