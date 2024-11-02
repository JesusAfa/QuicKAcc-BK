import { AutoMap } from '@automapper/classes';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class SubProductsUpdateDto {
  /**
   * SubSubProducts name
   */

  @IsString()
  @IsOptional()
  @AutoMap()
  name: string;

  /**
   * SubProducts Description
   */
  @IsString()
  @IsOptional()
  @AutoMap()
  description: string;

  /**
   * SubProducts  Kg
   */
  @IsNumber()
  @IsOptional()
  @AutoMap()
  Kg: number;

  /**
   * SubProducts Price
   */

  @IsNumber()
  @IsOptional()
  @AutoMap()
  price: number;

  /**
   * SubProducts Details
   */
  @IsString()
  @IsOptional()
  @AutoMap()
  details: string;

  /**
   * SubProducts Image
   */
  @IsString()
  @IsOptional()
  @AutoMap()
  image: string;

  /**
   * SubProducts idProducts
   */
  @IsNumber()
  @IsOptional()
  @AutoMap()
  idProducts: number;
}
