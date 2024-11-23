import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import {
  LoginRequest,
  LoginResponse,
  TokenData,
} from '@app/domain/security/dto/security.dto';
import { UserRepository } from '@app/infrastructure/persistence/repositories/users/users.repository';

@Injectable()
export class SecurityService {
  constructor(
    private readonly _userRepository: UserRepository,
    private readonly _jwt: JwtService,
    @Inject('REQUEST') private readonly _request: Request,
  ) {}

  extractBearerToken(): string {
    const authorization = this._request?.headers?.authorization;

    if (!authorization) {
      throw new BadRequestException('No se proporciono el token');
    }

    const parts = authorization.split(' ');

    if (parts.length !== 2) {
      throw new BadRequestException(
        'El token debe tener el formato Bearer token',
      );
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
      throw new BadRequestException(
        'El token debe tener el formato Bearer token',
      );
    }

    return token;
  }

  async login(loginRequest: LoginRequest): Promise<LoginResponse> {
    const { email, password } = loginRequest;

    const usuario = await this._userRepository.findUserById({
      where: { email },
    });

    if (!usuario) {
      throw new BadRequestException('Credenciales invalidas');
    }

    const isValidPassword = bcrypt.compareSync(password, usuario.password);

    if (!isValidPassword) {
      throw new BadRequestException('Credenciales invalidas');
    }

    const usuarioData = await this._userRepository.findUserById({
      where: { idUser: usuario.idUser },
      select: { email: true, fullName: true, IdRol: true, idUser: true },
    });
    console.log(usuarioData);
    const payloadToken: TokenData = {
      id_usuario: usuarioData.idUser,
      nombre_usuario: usuarioData.fullName,
    };

    const token = this._jwt.sign(payloadToken);

    return { token };
  }

  async refresh(): Promise<LoginResponse> {
    try {
      const token = this.extractBearerToken();
      const data = this._jwt.verify(token);

      const payloadToken: TokenData = {
        id_usuario: data.idUser,
        nombre_usuario: data.fullName,
      };

      const newToken = this._jwt.sign(payloadToken);

      return { token: newToken };
    } catch (error) {
      return { token: null };
    }
  }

  async validateToken(): Promise<LoginResponse> {
    try {
      const token = this.extractBearerToken();
      this._jwt.verify(token);

      return { token };
    } catch (error) {
      return { token: null };
    }
  }

  async getTokenData(): Promise<TokenData> {
    try {
      const token = this.extractBearerToken();
      const data = this._jwt.verify(token);

      return data;
    } catch (error) {
      return null;
    }
  }

  // async recoverPassword(data: RecoverPasswordRequest) {
  //   const { email } = data;

  //   const usuario = await this._userRepository.findUserById({
  //     where: { email },
  //   });

  //   if (usuario?.idUser) {
  //     const code = Math.floor(100000 + Math.random() * 900000);

  //     const token = this._jwt.sign({ code }, { expiresIn: '900s' });

  //     await this._userRepository.updateUser({
  //       data: { token: code?.toString() || null },
  //       where: { id_usuario: usuario?.idUser },
  //     });

  //     this._emailService.sendEmail({
  //       from: envs.EMAIL_FROM,
  //       to: email,
  //       subject: 'Recuperar contraseña',
  //       html: recoverPasswordTemplate(usuario?.persona?.nombre_completo, token),
  //     });
  //   }

  //   return {
  //     message:
  //       'Sí el email es correcto, se ha enviado un correo con las instrucciones para recuperar la contraseña',
  //   };
  // }

  // async changePassword(request: ChangePasswordRequest) {
  //   try {
  //     const { token, password } = request;

  //     const data = this._jwt.verify(token);

  //     const usuario = await this._appContext.Usuarios.findFirst({
  //       where: { token: data?.code?.toString() },
  //     });

  //     if (!usuario) {
  //       throw new BadRequestException('Token invalido');
  //     }

  //     const newPassword = bcrypt.hashSync(password, 10);

  //     await this._appContext.Usuarios.update({
  //       data: { password: newPassword, token: null },
  //       where: { id_usuario: usuario.id_usuario },
  //     });

  //     return true;
  //   } catch (_err) {
  //     return false;
  //   }
  // }
}
