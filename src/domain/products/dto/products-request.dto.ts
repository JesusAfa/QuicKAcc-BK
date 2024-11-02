import { AutoMap } from '@automapper/classes';
import { IsString } from 'class-validator';

export class ProductsRequestDto {
  /**
   * Products name
   */
  @IsString()
  @AutoMap()
  name: string;
}
