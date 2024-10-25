import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, type Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { Products } from '@app/domain/products/products.entity';
import { ProductsResponseDto } from '@app/domain/products/dto/products.response.dto';
import { ProductsRequestDto } from '@app/domain/products/dto/products-request.dto';
import { ProductsUpdateDto } from '@app/domain/products/dto/products-update.dto';

/**
 * Products profile
 */
@Injectable()
export class ProductsProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  /**
   * Profile
   * @param mapper
   */
  override get profile() {
    return (mapper) => {
      createMap(mapper, Products, ProductsResponseDto);
      createMap(mapper, ProductsRequestDto, Products);
      createMap(mapper, ProductsUpdateDto, Products);
    };
  }
}
