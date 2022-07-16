import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import Brand from 'src/brands/brand.entity';

@Entity()
export default class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, length: 100 })
  type: string;

  @Column({ nullable: false, type: 'decimal' })
  price: number;

  @ManyToOne(() => Brand, (brand) => brand.products)
  brand: Brand;
}
