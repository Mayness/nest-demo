import { Length } from 'class-validator';
import { ArgsType, Field, ID } from 'type-graphql';

@ArgsType()
export class UserArg {
  @Field(type => ID)
  id: number;

  @Field({ nullable: true })
  @Length(3, 10, {
    message: '字符长度应该在$constraint1-$constraint2之间'
  })
  name?: string;
}
