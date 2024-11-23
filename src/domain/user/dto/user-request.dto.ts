import { IsEmail, IsNumber, IsString } from 'class-validator';
import { AutoMap } from '@automapper/classes';

export class UserRequestDto {
  @IsString()
  @AutoMap()
  fullName: string;

  @IsString()
  @IsEmail()
  @AutoMap()
  email: string;

  @IsString()
  password: string;

  @IsNumber()
  @AutoMap()
  IdRol: number;
}
