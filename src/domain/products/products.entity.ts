import { AutoMap } from '@automapper/classes';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'products',
})
export class Products {
  /**
   * Products id
   */
  @PrimaryGeneratedColumn()
  @AutoMap()
  idProducts: string;

  /**
   * Products name
   */
  @Column()
  @AutoMap()
  name: string;

  /**
   * Products Description
   */

  @Column()
  @AutoMap()
  description: string;

  /**
   * Products  Kg
   */

  @Column()
  @AutoMap()
  Kg: number;

  /**
   * Products Price
   */

  @Column()
  @AutoMap()
  price: number;

  /**
   * Products Details
   */

  @Column()
  @AutoMap()
  details: string;

  /**
   * Products Image
   */
  @Column()
  @AutoMap()
  image: string;

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
  deleted?: Date;
}
