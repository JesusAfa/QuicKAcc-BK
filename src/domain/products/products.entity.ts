import { AutoMap } from '@automapper/classes';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SubProducts } from '../subproducts/subproducts.entity';

@Entity({
  name: 'Products',
})
export class Products {
  /**
   * Products id
   */
  @PrimaryGeneratedColumn()
  @AutoMap()
  idProducts: number;

  /**
   * Products name
   */
  @Column()
  @AutoMap()
  name: string;

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

  /**
   * Products SubProducts
   */
  @OneToMany(() => SubProducts, (subProducts) => subProducts.products)
  @AutoMap(() => SubProducts)
  subProducts: SubProducts[];
}
