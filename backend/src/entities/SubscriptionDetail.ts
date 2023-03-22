import { ObjectType, Field } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  BaseEntity,
} from 'typeorm';

@ObjectType()
@Entity()
export class SubscriptionDetail extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: false })
  endpoint!: string;

  @Column()
  auth!: string;

  @Column()
  p256dh!: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
