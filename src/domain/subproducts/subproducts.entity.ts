import { AutoMap } from '@automapper/classes';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Products } from '../products/products.entity';

@Entity({
  name: 'subProducts',
})
export class SubProducts {
  /**
   * Products idSubProducts
   */
  @PrimaryGeneratedColumn()
  @AutoMap()
  idSubProducts: string;

  /**
   * SubProducts name
   */
  @Column()
  @AutoMap()
  name: string;

  /**
   * SubProducts Description
   */

  @Column()
  @AutoMap()
  description: string;

  /**
   * SubProducts  Kg
   */

  @Column()
  @AutoMap()
  Kg: number;

  /**
   * SubProducts Price
   */

  @Column()
  @AutoMap()
  price: number;

  /**
   * SubProducts Details
   */

  @Column()
  @AutoMap()
  details: string;

  /**
   * SubProducts Image
   */
  @Column()
  @AutoMap()
  image: string;

  /**
   * Create SubProducts date
   */
  @CreateDateColumn()
  @AutoMap()
  createdAt?: Date;

  /**
   * Update SubProducts date
   */
  @UpdateDateColumn()
  @AutoMap()
  updatedAt?: Date;

  /**
   * Delete SubProducts date
   */
  @DeleteDateColumn()
  @AutoMap()
  deleted?: Date;

  /**
   * SubProducts Products
   */
  @ManyToOne(() => Products, (products) => products.subProducts)
  @JoinColumn({ name: 'idProducts' })
  @AutoMap(() => Products)
  products: Products;
}
