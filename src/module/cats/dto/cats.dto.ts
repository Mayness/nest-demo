import { Field, ID, ObjectType } from 'type-graphql';
import { UserDto } from '@module/user/dto/user.dto'
@ObjectType()
export class CatsDto {
  @Field(type => ID, { nullable: true })
  readonly id?: string;

  @Field({ nullable: true })
  readonly name?: string;

  @Field({ nullable: true })
  readonly date?: Date;

  @Field(type => UserDto, { nullable: true })
  owner?: UserDto;
}