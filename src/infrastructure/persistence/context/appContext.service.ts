import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Request } from 'express';
import { AbstractRepository } from '@app/common/classes/abstractRepository';
import { GenericRepository } from '@app/common/classes/genericRepository';
import { Todo } from '@app/domain/todo/todo.entity';
import { Products } from '@app/domain/products/products.entity';

/**
 * App context
 * @description App context
 */
@Injectable()
export class AppContext {
  /**
   * Todo repository
   */
  todo: AbstractRepository<Todo>;
  /**
   *  Product repository
   */
  products: AbstractRepository<Products>;

  constructor(
    private dataSource: DataSource,
    @Inject('REQUEST') private request: Request,
  ) {
    this.todo = new GenericRepository(Todo, dataSource, request);
    this.products = new GenericRepository(Products, dataSource, request);
  }
}
