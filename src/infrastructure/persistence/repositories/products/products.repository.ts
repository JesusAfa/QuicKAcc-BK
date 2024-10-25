import { HttpException, Injectable, Scope } from '@nestjs/common';
import { AppContext } from '../../context/appContext.service';
import { Products } from '@app/domain/products/products.entity';
import {
  DeleteCriteriaType,
  GetAllCriteriaType,
  GetOneCriteriaType,
  SaveOptionsType,
  UpdateCriteriaType,
} from '@app/common/types/dbInterfaces';

@Injectable({ scope: Scope.REQUEST })
export class ProductRepository {
  constructor(private readonly _context: AppContext) {}

  /**
   * Create a new Product
   * @param options Product options
   * @returns Product
   */
  async getAllProducts(
    options?: GetAllCriteriaType<Products>,
  ): Promise<Products[]> {
    try {
      return await this._context.products.getAll(options);
    } catch (error) {
      throw new HttpException(
        `Error de DB: ${error?.message || ''}`,
        error?.status || 500,
      );
    }
  }

  /**
   * Create a new Product
   * @param options Product options
   * @returns Product
   */
  async createProduct(Product: Products): Promise<Products> {
    try {
      const userData = await this._context.products.create(Product);
      return { ...Product, ...userData?.raw[0], ...userData?.generatedMaps[0] };
    } catch (error) {
      throw new HttpException(
        `Error de DB: ${error?.message || ''}`,
        error?.status || 500,
      );
    }
  }

  /**
   * Find Product by id
   * @param id Product id
   * @returns Product
   */
  async findProductById(
    options: GetOneCriteriaType<Products>,
  ): Promise<Products> {
    try {
      return await this._context.products.getOne(options);
    } catch (error) {
      throw new HttpException(
        `Error de DB: ${error?.message || ''}`,
        error?.status || 500,
      );
    }
  }

  /**
   * Delete Product
   * @param criteria Product id
   * @returns Product
   */
  async updateProduct(
    criteria: UpdateCriteriaType<Products>,
    Product: Products,
  ): Promise<Products> {
    try {
      const updateProduct = await this._context.products.update(
        criteria,
        Product,
      );
      return {
        ...Product,
        ...updateProduct?.raw[0],
        ...updateProduct?.generatedMaps[0],
      };
    } catch (error) {
      throw new HttpException(
        `Error de DB: ${error?.message || ''}`,
        error?.status || 500,
      );
    }
  }

  /**
   * Delete Product
   * @param criteria Product id
   * @returns Product
   */
  async deleteProduct(
    criteria: DeleteCriteriaType<Products>,
  ): Promise<Products> {
    try {
      const Product = await this.findProductById({ where: criteria });
      const deleteProduct = await this._context.products.delete(criteria);
      return { ...Product, ...deleteProduct?.raw[0] };
    } catch (error) {
      throw new HttpException(
        `Error de DB: ${error?.message || ''}`,
        error?.status || 500,
      );
    }
  }

  /**
   * Save Product
   * @param Product Product
   * @param options Save options
   * @returns
   */
  async saveProduct(
    Product: Products,
    options?: SaveOptionsType<Products>,
  ): Promise<Products> {
    try {
      const userSaved = await this._context.products.save(Product, options);
      return userSaved;
    } catch (error) {
      throw new HttpException(
        `Error de DB: ${error?.message || ''}`,
        error?.status || 500,
      );
    }
  }
}
