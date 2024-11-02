import { SubProducts } from '@app/domain/subproducts/subproducts.entity';
import { AutoMap } from '@automapper/classes';

export class ProductsResponseDto {
  /**
   * Products id
   */
  @AutoMap()
  idProducts: number;

  /**
   * Products name
   */
  @AutoMap()
  name: string;

  /**
   * Products SubProducts
   */
  @AutoMap(() => SubProducts)
  subProducts: SubProducts[];
}
