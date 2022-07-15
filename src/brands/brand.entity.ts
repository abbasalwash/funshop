import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Brand {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ unique: true, length: 50, nullable: false })
  public name: string;
}
