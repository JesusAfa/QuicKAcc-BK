import { AutoMap } from '@automapper/classes';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  /**
   * User id
   */
  @PrimaryGeneratedColumn()
  @AutoMap()
  idUser: number;

  /**
   * User full name
   */
  @AutoMap()
  @Column()
  fullName: string;

  /**
   * User email
   */
  @AutoMap()
  @Column()
  email: string;

  /**
   * User password
   */
  @Column()
  password: string;

  /**
   * User id role
   */
  @AutoMap()
  @Column()
  IdRol: number;

  /**
   * Create todo date
   */
  @CreateDateColumn()
  @AutoMap()
  createdAt?: Date;

  /**
   * Update todo date
   */
  @UpdateDateColumn()
  @AutoMap()
  updatedAt?: Date;

  /**
   * Delete todo date
   */
  @DeleteDateColumn()
  @AutoMap()
  deletedAt?: Date;
}
