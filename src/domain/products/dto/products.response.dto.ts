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
   * Products Description
   */

  @AutoMap()
  description: string;

  /**
   * Products  Kg
   */

  @AutoMap()
  Kg: number;

  /**
   * Products Price
   */

  @AutoMap()
  price: number;

  /**
   * Products Details
   */

  @AutoMap()
  details: string;

  /**
   * Products Image
   */

  @AutoMap()
  image: string;
}
