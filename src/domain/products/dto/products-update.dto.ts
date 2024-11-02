import { AutoMap } from '@automapper/classes';
import { IsOptional, IsString } from 'class-validator';

export class ProductsUpdateDto {
  /**
   * Products name
   */

  @IsString()
  @IsOptional()
  @AutoMap()
  name: string;
}
