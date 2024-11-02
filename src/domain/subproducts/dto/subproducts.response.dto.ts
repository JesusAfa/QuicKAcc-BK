import { Products } from '@app/domain/products/products.entity';
import { AutoMap } from '@automapper/classes';

export class SubProductsResponseDto {
  /**
   * SubProducts id
   */
  @AutoMap()
  idSubProducts: number;

  /**
   * SubProducts name
   */
  @AutoMap()
  name: string;

  /**
   * SubProducts Description
   */

  @AutoMap()
  description: string;

  /**
   * SubProducts  Kg
   */

  @AutoMap()
  Kg: number;

  /**
   * SubProducts Price
   */

  @AutoMap()
  price: number;

  /**
   * SubProducts Details
   */

  @AutoMap()
  details: string;

  /**
   * SubProducts Image
   */

  @AutoMap()
  image: string;

  /**
   * SubProducts idProducts
   */
  @AutoMap(() => Products)
  products: Products;
}
