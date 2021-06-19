import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    nullable: false,
    unique: true,
  })
  username: string;

  @Column({
    nullable: false,
    unique: true,
  })
  email!: string;

  @Column({ nullable: false })
  password!: string;

  @Column({ nullable: true, type: "simple-array", default: "" })
  rooms: string[];

  @CreateDateColumn()
  createdAt = Date;

  @UpdateDateColumn()
  updatedAt = Date;
}
