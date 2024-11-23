import { HttpException, Injectable, Scope } from '@nestjs/common';
import { AppContext } from '../../context/appContext.service';
import { User } from '@app/domain/user/user.entity';
import {
  DeleteCriteriaType,
  GetAllCriteriaType,
  GetOneCriteriaType,
  SaveOptionsType,
  UpdateCriteriaType,
} from '@app/common/types/dbInterfaces';

@Injectable({ scope: Scope.REQUEST })
export class UserRepository {
  constructor(private readonly _context: AppContext) {}

  /**
   * Create a new User
   * @param options User options
   * @returns User
   */
  async getAllUsers(options?: GetAllCriteriaType<User>): Promise<User[]> {
    try {
      return await this._context.user.getAll(options);
    } catch (error) {
      throw new HttpException(
        `Error de DB: ${error?.message || ''}`,
        error?.status || 500,
      );
    }
  }

  /**
   * Create a new User
   * @param options User options
   * @returns User
   */
  async createUser(User: User): Promise<User> {
    try {
      const userData = await this._context.user.create(User);
      return { ...User, ...userData?.raw[0], ...userData?.generatedMaps[0] };
    } catch (error) {
      throw new HttpException(
        `Error de DB: ${error?.message || ''}`,
        error?.status || 500,
      );
    }
  }

  /**
   * Find User by id
   * @param id User id
   * @returns User
   */
  async findUserById(options: GetOneCriteriaType<User>): Promise<User> {
    try {
      return await this._context.user.getOne(options);
    } catch (error) {
      throw new HttpException(
        `Error de DB: ${error?.message || ''}`,
        error?.status || 500,
      );
    }
  }

  /**
   * Delete User
   * @param criteria User id
   * @returns User
   */
  async updateUser(
    criteria: UpdateCriteriaType<User>,
    User: User,
  ): Promise<User> {
    try {
      const updateUser = await this._context.user.update(criteria, User);
      return {
        ...User,
        ...updateUser?.raw[0],
        ...updateUser?.generatedMaps[0],
      };
    } catch (error) {
      throw new HttpException(
        `Error de DB: ${error?.message || ''}`,
        error?.status || 500,
      );
    }
  }

  /**
   * Delete User
   * @param criteria User id
   * @returns User
   */
  async deleteUser(criteria: DeleteCriteriaType<User>): Promise<User> {
    try {
      const User = await this.findUserById({ where: criteria });
      const deleteUser = await this._context.user.delete(criteria);
      return { ...User, ...deleteUser?.raw[0] };
    } catch (error) {
      throw new HttpException(
        `Error de DB: ${error?.message || ''}`,
        error?.status || 500,
      );
    }
  }

  /**
   * Save User
   * @param User User
   * @param options Save options
   * @returns
   */
  async saveUser(User: User, options?: SaveOptionsType<User>): Promise<User> {
    try {
      const userSaved = await this._context.user.save(User, options);
      return userSaved;
    } catch (error) {
      throw new HttpException(
        `Error de DB: ${error?.message || ''}`,
        error?.status || 500,
      );
    }
  }
}
