import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import Product from 'src/products/product.entity';

@Entity()
export default class Brand {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ unique: true, nullable: false, length: 50 })
  public name: string;

  @OneToMany(() => Product, (product) => product.brand)
  products: Product[];
}
