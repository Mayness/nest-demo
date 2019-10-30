import { Field, ID, ObjectType } from 'type-graphql';
// import { UserArg } from '../../user/dto/user.arg'

@ObjectType()
export class CatsArg {
  @Field(type => ID)
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  date?: Date;

  // @Field(type => UserArg, { nullable: true })
  // owner?: UserArg;
}
