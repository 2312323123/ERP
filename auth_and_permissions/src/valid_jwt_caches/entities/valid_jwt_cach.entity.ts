import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ValidJwtCach {
  @PrimaryGeneratedColumn('uuid')
  ordinal_number: number;

  // unique id
  @Column({ unique: true })
  id: string;

  // expiration date
  @Column()
  exp: number;
}
