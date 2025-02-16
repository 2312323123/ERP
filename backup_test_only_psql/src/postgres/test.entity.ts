import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TestEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @Column()
  timestamp: Date;
}
