import { IsNotEmpty, IsString } from 'class-validator';

export class LoginRequest {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class LoginResponse {
  token: string;
}

export class TokenData {
  id_usuario: number;
  nombre_usuario: string;
}

export class RecoverPasswordRequest {
  @IsString()
  @IsNotEmpty()
  email: string;
}

export class ChangePasswordRequest {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
