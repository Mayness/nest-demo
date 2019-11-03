import { Field, ID, ArgsType } from 'type-graphql';

@ArgsType()
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