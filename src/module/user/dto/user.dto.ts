import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class UserDto {
  @Field(type => ID)
  id: number

  @Field()
  name: string;
}