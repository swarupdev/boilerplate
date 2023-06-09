import { ObjectType, Field } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  BaseEntity,
} from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  // @Field()
  // @Column({ unique: true })
  // username!: string;

  @Field()
  @Column()
  fullName!: string;

  @Field()
  @Column({ unique: false })
  email!: string;

  @Column({ nullable: true })
  password!: string;

  @Field()
  @Column({ nullable: true })
  googleId?: string;

  @Field()
  @Column({ nullable: true })
  facebookId?: string;

  @Field()
  @Column({ nullable: true })
  picture: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
