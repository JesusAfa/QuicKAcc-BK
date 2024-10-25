import { AutoMap } from '@automapper/classes';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ProductsUpdateDto {
  /**
   * Products name
   */

  @IsString()
  @IsOptional()
  @AutoMap()
  name: string;

  /**
   * Products Description
   */
  @IsString()
  @IsOptional()
  @AutoMap()
  description: string;

  /**
   * Products  Kg
   */
  @IsNumber()
  @IsOptional()
  @AutoMap()
  Kg: number;

  /**
   * Products Price
   */

  @IsNumber()
  @IsOptional()
  @AutoMap()
  price: number;

  /**
   * Products Details
   */
  @IsString()
  @IsOptional()
  @AutoMap()
  details: string;

  /**
   * Products Image
   */
  @IsString()
  @IsOptional()
  @AutoMap()
  image: string;
}
