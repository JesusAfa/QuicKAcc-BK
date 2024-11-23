import { AutoMap } from '@automapper/classes';
import { IsNumber, IsString } from 'class-validator';

export class UserResponseDto {
  @IsNumber()
  @AutoMap()
  id: number;

  @IsString()
  @AutoMap()
  fullName: string;

  @IsString()
  @AutoMap()
  email: string;

  @IsNumber()
  @AutoMap()
  IdRol: number;
}
