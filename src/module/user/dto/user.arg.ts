import { Length, IsOptional, IsArray, IsNotEmpty } from 'class-validator';
import { ArgsType, Field, ID } from 'type-graphql';
// arguments
@ArgsType()
export class UserArg {
  @IsOptional()
  @Field(type => ID, { nullable: true })
  readonly id?: string;

  @IsOptional()
  @Length(3, 10, {
    message: '字符长度应该在$constraint1-$constraint2之间'
  })
  @Field({ nullable: true })
  readonly name?: string;
}


@ArgsType()
export class CreateUserArg {
  @Length(2, 10, {
    message: '字符长度应该在$constraint1-$constraint2之间'
  })
  @Field()
  readonly name!: string;

  @Field(type => [ String ])
  @IsArray()
  @IsNotEmpty()
  readonly cats!: string[];
}

@ArgsType()
export class UpdateUserArg {
  @Field()
  readonly id!: string;

  @Length(2, 10, {
    message: '字符长度应该在$constraint1-$constraint2之间'
  })
  @Field()
  readonly name!: string;
}

@ArgsType()
export class DeleteUserArg {
  @Field(type => ID, { nullable: true })
  readonly id!: string;
}