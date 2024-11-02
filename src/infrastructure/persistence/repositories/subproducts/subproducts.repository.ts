import { HttpException, Injectable, Scope } from '@nestjs/common';
import { AppContext } from '../../context/appContext.service';
import { SubProducts } from '@app/domain/subproducts/subproducts.entity';
import {
  DeleteCriteriaType,
  GetAllCriteriaType,
  GetOneCriteriaType,
  SaveOptionsType,
  UpdateCriteriaType,
} from '@app/common/types/dbInterfaces';

@Injectable({ scope: Scope.REQUEST })
export class SubProductRepository {
  constructor(private readonly _context: AppContext) {}

  /**
   * Create a new SubProduct
   * @param options SubProduct options
   * @returns SubProduct
   */
  async getAllSubProducts(
    options?: GetAllCriteriaType<SubProducts>,
  ): Promise<SubProducts[]> {
    try {
      return await this._context.subProducts.getAll(options);
    } catch (error) {
      throw new HttpException(
        `Error de DB: ${error?.message || ''}`,
        error?.status || 500,
      );
    }
  }

  /**
   * Create a new SubProduct
   * @param options SubProduct options
   * @returns SubProduct
   */
  async createSubProduct(SubProduct: SubProducts): Promise<SubProducts> {
    try {
      const userData = await this._context.subProducts.create(SubProduct);
      return {
        ...SubProduct,
        ...userData?.raw[0],
        ...userData?.generatedMaps[0],
      };
    } catch (error) {
      throw new HttpException(
        `Error de DB: ${error?.message || ''}`,
        error?.status || 500,
      );
    }
  }

  /**
   * Find SubProduct by id
   * @param id SubProduct id
   * @returns SubProduct
   */
  async findSubProductById(
    options: GetOneCriteriaType<SubProducts>,
  ): Promise<SubProducts> {
    try {
      return await this._context.subProducts.getOne(options);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        `Error de DB: ${error?.message || ''}`,
        error?.status || 500,
      );
    }
  }

  /**
   * Delete SubProduct
   * @param criteria SubProduct id
   * @returns SubProduct
   */
  async updateSubProduct(
    criteria: UpdateCriteriaType<SubProducts>,
    SubProduct: SubProducts,
  ): Promise<SubProducts> {
    try {
      const updateSubProduct = await this._context.subProducts.update(
        criteria,
        SubProduct,
      );
      return {
        ...SubProduct,
        ...updateSubProduct?.raw[0],
        ...updateSubProduct?.generatedMaps[0],
      };
    } catch (error) {
      throw new HttpException(
        `Error de DB: ${error?.message || ''}`,
        error?.status || 500,
      );
    }
  }

  /**
   * Delete SubProduct
   * @param criteria SubProduct id
   * @returns SubProduct
   */
  async deleteSubProduct(
    criteria: DeleteCriteriaType<SubProducts>,
  ): Promise<SubProducts> {
    try {
      const SubProduct = await this.findSubProductById({ where: criteria });
      const SubdeleteProduct = await this._context.subProducts.delete(criteria);
      return { ...SubProduct, ...SubdeleteProduct?.raw[0] };
    } catch (error) {
      throw new HttpException(
        `Error de DB: ${error?.message || ''}`,
        error?.status || 500,
      );
    }
  }

  /**
   * Save SubProduct
   * @param SubProduct SubProduct
   * @param options Save options
   * @returns
   */
  async saveSubProduct(
    SubProduct: SubProducts,
    options?: SaveOptionsType<SubProducts>,
  ): Promise<SubProducts> {
    try {
      const userSaved = await this._context.subProducts.save(
        SubProduct,
        options,
      );
      return userSaved;
    } catch (error) {
      throw new HttpException(
        `Error de DB: ${error?.message || ''}`,
        error?.status || 500,
      );
    }
  }
}
