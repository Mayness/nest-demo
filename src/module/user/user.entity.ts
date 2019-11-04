import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, JoinColumn } from 'typeorm';
import { Cats } from '@module/cats/cats.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({ length: 500 })
  name!: string;

  @CreateDateColumn()
  date!: Date;

  @OneToMany(type => Cats, Cats => Cats.owner)
  cats!: Cats[];
}