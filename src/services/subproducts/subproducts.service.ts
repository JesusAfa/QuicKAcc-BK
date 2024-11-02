import { Injectable } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { extFile } from '@app/common/utils';
import { SubProductsRequestDto } from '@app/domain/subproducts/dto/subproducts-request.dto';
import { SubProductsResponseDto } from '@app/domain/subproducts/dto/subproducts.response.dto';
import { SubProducts } from '@app/domain/subproducts/subproducts.entity';
import { SubProductRepository } from '@app/infrastructure/persistence/repositories/subproducts/subproducts.repository';
import { SubProductsUpdateDto } from '@app/domain/subproducts/dto/subproducts-update.dto';
import { ProductRepository } from '@app/infrastructure/persistence/repositories/products/products.repository';

/**
 * SubProducts services
 */
@Injectable()
export class SubProductsServices {
  constructor(
    private readonly _SubproductsRepository: SubProductRepository,
    private readonly _productsRepository: ProductRepository,
    @InjectMapper() private readonly _mapper: Mapper,
  ) {}

  /**
   * Create a new SubProducts
   * @param createSubProductsDto
   */
  async create(
    createSubProductsDto: SubProductsRequestDto,
  ): Promise<SubProductsResponseDto> {
    // Mapear el DTO a la entidad SubProducts
    const subProductsPayload = this._mapper.map(
      createSubProductsDto,
      SubProductsRequestDto,
      SubProducts,
    );

    // Buscar el producto asociado
    const product = await this._productsRepository.findProductById({
      where: { idProducts: createSubProductsDto.productId },
    });
    if (!product) {
      throw new Error('Product not found');
    }

    // Asignar el producto al subproducto
    subProductsPayload.products = product;
    subProductsPayload.image = `${new Date().getTime()}.${extFile(createSubProductsDto.image)}`;

    // Crear el subproducto en la base de datos
    const createdSubProduct =
      await this._SubproductsRepository.createSubProduct(subProductsPayload);

    // Mapear la entidad creada a la respuesta DTO
    const response = this._mapper.map(
      createdSubProduct,
      SubProducts,
      SubProductsResponseDto,
    );

    return response;
  }

  /**
   * Get all SubProductss
   */
  async findAll(): Promise<SubProductsResponseDto[]> {
    const Subproducts = await this._SubproductsRepository.getAllSubProducts();

    const response = this._mapper.mapArray(
      Subproducts,
      SubProducts,
      SubProductsResponseDto,
    );

    return response;
  }

  /**
   * Get SubProducts by id
   * @param id
   * @returns
   */
  async findOne(id: string): Promise<SubProductsResponseDto> {
    const Subproducts = await this._SubproductsRepository.findSubProductById({
      where: { idSubProducts: id },
      relations: ['products'],
    });

    const response = this._mapper.map(
      Subproducts,
      SubProducts,
      SubProductsResponseDto,
    );
    return response;
  }

  /**
   * Update SubProducts
   * @param id
   * @param updateSubProductsDto
   * @returns
   */
  async update(
    id: string,
    updateSubProductsDto: SubProductsUpdateDto,
  ): Promise<SubProductsResponseDto> {
    const SubProductsUpdatePayload = this._mapper.map(
      updateSubProductsDto,
      SubProductsUpdateDto,
      SubProducts,
    );

    const Subproducts = await this._SubproductsRepository.updateSubProduct(
      id,
      SubProductsUpdatePayload,
    );

    const response = this._mapper.map(
      Subproducts,
      SubProducts,
      SubProductsResponseDto,
    );

    return response;
  }

  /**
   * Remove SubProducts
   * @param id
   * @returns
   */
  async remove(idSubProducts: string): Promise<SubProductsResponseDto> {
    const Subproducts = await this._SubproductsRepository.deleteSubProduct({
      idSubProducts,
    });

    const response = this._mapper.map(
      Subproducts,
      SubProducts,
      SubProductsResponseDto,
    );

    return response;
  }
}
