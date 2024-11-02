import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, type Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';

import { SubProducts } from '@app/domain/subproducts/subproducts.entity';
import { SubProductsResponseDto } from '@app/domain/subproducts/dto/subproducts.response.dto';
import { SubProductsRequestDto } from '@app/domain/subproducts/dto/subproducts-request.dto';
import { SubProductsUpdateDto } from '@app/domain/subproducts/dto/subproducts-update.dto';

/**
 * SubProducts profile
 */
@Injectable()
export class SubProductsProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  /**
   * Profile
   * @param mapper
   */
  override get profile() {
    return (mapper) => {
      createMap(mapper, SubProducts, SubProductsResponseDto);
      createMap(mapper, SubProductsRequestDto, SubProducts);
      createMap(mapper, SubProductsUpdateDto, SubProducts);
    };
  }
}
