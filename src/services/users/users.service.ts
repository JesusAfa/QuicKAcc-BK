import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Mapper } from '@automapper/core';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { UserRequestDto } from '@app/domain/user/dto/user-request.dto';
import { InjectMapper } from '@automapper/nestjs';
import { UserRepository } from '@app/infrastructure/persistence/repositories/users/users.repository';
import { UserResponseDto } from '@app/domain/user/dto/user-response.dto';
import { User } from '@app/domain/user/user.entity';
import { UserUpdateDto } from '@app/domain/user/dto/user-update.dto';

/**
 * Servicios de usuario
 */
@Injectable()
export class UserService {
  constructor(
    private readonly _userRepository: UserRepository,
    @InjectMapper() private readonly _mapper: Mapper,
    @Inject('REQUEST') private readonly _request: Request,
  ) {}

  /**
   * Crea una usuario
   */
  async createUsuario(
    usuarioRequest: UserRequestDto,
  ): Promise<UserResponseDto> {
    const usuario = this._mapper.map(usuarioRequest, UserRequestDto, User);

    const passwordHash = bcrypt.hashSync(usuarioRequest.password, 10);

    const createUser = await this._userRepository.createUser({
      ...usuario,
      password: passwordHash,
    });

    return this._mapper.map(createUser, User, UserResponseDto);
  }

  /**
   * Obtiene todas las usuarios
   */
  async getUsuarios(): Promise<UserResponseDto[]> {
    const usuarios = await this._userRepository.getAllUsers();

    return this._mapper.mapArray(usuarios, User, UserResponseDto);
  }

  /**
   * Obtiene una usuario por su id
   */
  async getUsuarioById(id: number): Promise<UserResponseDto> {
    const usuario = await this._userRepository.findUserById({
      where: { idUser: id },
    });

    return this._mapper.map(usuario, User, UserResponseDto);
  }

  /**
   * Actualiza una usuario
   */
  async updateUsuario(
    id: number,
    usuarioRequest: UserUpdateDto,
  ): Promise<UserResponseDto> {
    const { password, ...request } = usuarioRequest;
    const UserPayload = this._mapper.map(request, UserUpdateDto, User);
    let passHash = '';
    const usuarioExist = await this._userRepository.findUserById({
      where: { idUser: id },
    });

    if (!usuarioExist) {
      throw new BadRequestException('Usuario no encontrado');
    }

    if (password) {
      passHash = bcrypt.hashSync(password, 10);
    }

    const usuario = await this._userRepository.updateUser(id, {
      ...UserPayload,
      password: passHash || usuarioExist.password,
    });

    return this._mapper.map(usuario, User, UserResponseDto);
  }

  /**
   * Elimina una usuario
   */
  async deleteUsuario(id: number): Promise<UserResponseDto> {
    const usuario = await this._userRepository.findUserById({
      where: { idUser: id },
    });

    if (!usuario) {
      throw new BadRequestException('Usuario no encontrado');
    }
    await this._userRepository.deleteUser(usuario);

    return this._mapper.map(usuario, User, UserResponseDto);
  }
}
