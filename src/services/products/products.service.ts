import { Injectable } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { ProductsRequestDto } from '@app/domain/products/dto/products-request.dto';
import { ProductsResponseDto } from '@app/domain/products/dto/products.response.dto';
import { ProductsUpdateDto } from '@app/domain/products/dto/products-update.dto';
import { ProductRepository } from '@app/infrastructure/persistence/repositories/products/products.repository';
import { Products } from '@app/domain/products/products.entity';
import { extFile } from '@app/common/utils';

/**
 * Products services
 */
@Injectable()
export class ProductsServices {
  constructor(
    private readonly _productsRepository: ProductRepository,
    @InjectMapper() private readonly _mapper: Mapper,
  ) {}

  /**
   * Create a new Products
   * @param createProductsDto
   */
  async create(
    createProductsDto: ProductsRequestDto,
  ): Promise<ProductsResponseDto> {
    const ProductsPayload = this._mapper.map(
      createProductsDto,
      ProductsRequestDto,
      Products,
    );

    const product =
      await this._productsRepository.createProduct(ProductsPayload);
    product.image = `${new Date().getTime()}.${extFile(createProductsDto.image)}`;
    const response = this._mapper.map(product, Products, ProductsResponseDto);

    return response;
  }

  /**
   * Get all Productss
   */
  async findAll(): Promise<ProductsResponseDto[]> {
    const products = await this._productsRepository.getAllProducts();

    const response = this._mapper.mapArray(
      products,
      Products,
      ProductsResponseDto,
    );

    return response;
  }

  /**
   * Get Products by id
   * @param id
   * @returns
   */
  async findOne(id: string): Promise<ProductsResponseDto> {
    const products = await this._productsRepository.findProductById({
      where: { idProducts: id },
    });

    const response = this._mapper.map(products, Products, ProductsResponseDto);

    return response;
  }

  /**
   * Update Products
   * @param id
   * @param updateProductsDto
   * @returns
   */
  async update(
    id: string,
    updateProductsDto: ProductsUpdateDto,
  ): Promise<ProductsResponseDto> {
    const ProductsUpdatePayload = this._mapper.map(
      updateProductsDto,
      ProductsUpdateDto,
      Products,
    );

    const products = await this._productsRepository.updateProduct(
      id,
      ProductsUpdatePayload,
    );

    const response = this._mapper.map(products, Products, ProductsResponseDto);

    return response;
  }

  /**
   * Remove Products
   * @param id
   * @returns
   */
  async remove(idProducts: string): Promise<ProductsResponseDto> {
    const products = await this._productsRepository.deleteProduct({
      idProducts,
    });

    const response = this._mapper.map(products, Products, ProductsResponseDto);

    return response;
  }
}
