import { Field, ID, ObjectType } from 'type-graphql';
import { Cats } from '../../cats/cats.entity';
// result
@ObjectType()
export class UserDto {
  @Field(type => ID)
  readonly id!: string;

  @Field({ nullable: true })
  readonly name?: string;

  @Field({ nullable: true })
  readonly date?: Date;
}

@ObjectType()
export class OperaUserDto {
  @Field(type => ID, { nullable: true })
  readonly id?: string;

  @Field({ nullable: true })
  readonly name?: string;

  @Field({ nullable: true })
  readonly date?: Date;
}

export class MixinCatsOfUser {
  readonly id!: string;
  name!: string;
  readonly date!: Date;
  readonly cats?: Cats;
}