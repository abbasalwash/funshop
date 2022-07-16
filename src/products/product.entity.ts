import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import Brand from 'src/brands/brand.entity';

@Entity()
export default class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;

  @Column()
  price: number;

  @ManyToOne(() => Brand, (brand) => brand.products)
  brand: Brand;
}
