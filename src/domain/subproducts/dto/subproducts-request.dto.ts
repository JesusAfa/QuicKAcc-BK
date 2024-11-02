import { AutoMap } from '@automapper/classes';
import { IsNumber, IsString } from 'class-validator';

export class SubProductsRequestDto {
  /**
   * SubSubProducts name
   */
  @IsString()
  @AutoMap()
  name: string;

  /**
   * SubProducts Description
   */
  @IsString()
  @AutoMap()
  description: string;

  /**
   * SubProducts  Kg
   */
  @IsNumber()
  @AutoMap()
  Kg: number;

  /**
   * SubProducts Price
   */

  @IsNumber()
  @AutoMap()
  price: number;

  /**
   * SubProducts Details
   */

  @IsString()
  @AutoMap()
  details: string;

  /**
   * SubProducts Image
   */

  @IsString()
  @AutoMap()
  image: string;

  /**
   * SubProducts idProducts
   */
  @IsNumber()
  @AutoMap()
  productId: number;
}
