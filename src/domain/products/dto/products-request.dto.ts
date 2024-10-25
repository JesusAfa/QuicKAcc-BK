import { AutoMap } from '@automapper/classes';
import { IsNumber, IsString } from 'class-validator';

export class ProductsRequestDto {
  /**
   * Products name
   */
  @IsString()
  @AutoMap()
  name: string;

  /**
   * Products Description
   */
  @IsString()
  @AutoMap()
  description: string;

  /**
   * Products  Kg
   */
  @IsNumber()
  @AutoMap()
  Kg: number;

  /**
   * Products Price
   */

  @IsNumber()
  @AutoMap()
  price: number;

  /**
   * Products Details
   */

  @IsString()
  @AutoMap()
  details: string;

  /**
   * Products Image
   */

  @IsString()
  @AutoMap()
  image: string;
}
