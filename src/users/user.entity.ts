import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class User {
  @PrimaryGeneratedColumn('uuid')
  public id?: number;

  @Column({ unique: true, nullable: false, length: 40 })
  public email: string;

  @Column({ nullable: false, length: 25 })
  public firstName: string;

  @Column({ nullable: false, length: 25 })
  public lastName: string;

  @Column({ nullable: false, length: 100 })
  public password: string;
}
