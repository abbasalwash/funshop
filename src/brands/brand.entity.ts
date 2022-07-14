import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Brand {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  @Index({ unique: true })
  public name: string;
}
