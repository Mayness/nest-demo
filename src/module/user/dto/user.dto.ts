import { Field, ID, ObjectType } from 'type-graphql';
import { CatsDto } from '@module/cats/dto/cats.dto';
import { Cats } from '@module/cats/cats.entity';

// graphql结果
@ObjectType()
export class UserDto {
  @Field(type => ID)
  readonly id!: string;

  @Field({ nullable: true })
  readonly name?: string;

  @Field({ nullable: true })
  readonly date?: Date;

  @Field(type => [ CatsDto ], { nullable: true })
  readonly cats?: CatsDto[];
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
  readonly cats?: Cats[];
}