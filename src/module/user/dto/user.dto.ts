import { Field, ID, ObjectType } from 'type-graphql';
// result
@ObjectType()
export class UserDto {
  @Field(type => ID)
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  date?: Date;
}

@ObjectType()
export class OperaUserDto {
  @Field(type => ID, { nullable: true })
  id?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  date?: Date;
}