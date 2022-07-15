import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Brand {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ unique: true })
  public name: string;
}
