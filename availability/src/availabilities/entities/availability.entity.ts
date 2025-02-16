import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Availability {
  @PrimaryColumn()
  id: string;

  @PrimaryColumn()
  start: number;

  @Column()
  end: number;

  @BeforeInsert()
  @BeforeUpdate()
  validateEndGreaterThanStart() {
    if (this.end <= this.start) {
      throw new Error("'end' must be greater than 'start'.");
    }
  }
}
