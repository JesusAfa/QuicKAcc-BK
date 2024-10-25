import { ServiceModule } from '@app/services/services.module';
import { Module } from '@nestjs/common';
import { TodoController } from './controllers/todo/todo.controller';
import { ProductsController } from './controllers/products/products.controller';

@Module({
  imports: [ServiceModule],
  controllers: [TodoController, ProductsController],
})
export class PresentationModule {}
