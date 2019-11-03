import { Field, ID, ArgsType } from 'type-graphql';

@ArgsType()
export class CatsArg {
  @Field(type => ID)
  readonly id!: string;

  @Field({ nullable: true })
  readonly name?: string;

  @Field({ nullable: true })
  readonly date?: Date;

  // @Field(type => UserArg, { nullable: true })
  // owner?: UserArg;
}
