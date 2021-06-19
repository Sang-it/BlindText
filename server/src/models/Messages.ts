import {
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  Entity,
  BaseEntity,
  Column,
} from "typeorm";
@Entity()
export class Messages extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  username: string;

  @Column()
  content: string;

  @Column()
  room: string;

  @CreateDateColumn()
  createdAt = Date;

  @UpdateDateColumn()
  updatedAt = Date;
}
