import { ServiceModule } from '@app/services/services.module';
import { Module } from '@nestjs/common';
import { TodoController } from './controllers/todo/todo.controller';
import { ProductsController } from './controllers/products/products.controller';
import { SubProductsController } from './controllers/subproducts/subproducts.controller';

@Module({
  imports: [ServiceModule],
  controllers: [TodoController, ProductsController, SubProductsController],
})
export class PresentationModule {}
