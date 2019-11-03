import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Cats {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  name!: string;

  @CreateDateColumn()
  date!: Date;

  @ManyToOne(type => User, User => User.cats)
  @JoinColumn()
  owner!: User;
}