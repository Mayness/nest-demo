import { Length, IsOptional, IsArray, IsNotEmpty } from 'class-validator';
import { ArgsType, Field, ID } from 'type-graphql';
import { CatsArg } from '@module/cats/dto/cats.arg';
@ArgsType()
export class UserArg {
  @IsOptional()
  @Field(type => ID, { nullable: true })
  id?: string;

  @IsOptional()
  @Length(3, 10, {
    message: '字符长度应该在$constraint1-$constraint2之间'
  })
  @Field({ nullable: true })
  name?: string;
}


@ArgsType()
export class CreateUserArg {
  @Length(2, 10, {
    message: '字符长度应该在$constraint1-$constraint2之间'
  })
  @Field()
  name: string;

  @Field(type => [ String ])
  @IsArray()
  @IsNotEmpty()
  cats: string[];
}

@ArgsType()
export class UpdateUserArg {
  @Field()
  id: string;

  @Length(2, 10, {
    message: '字符长度应该在$constraint1-$constraint2之间'
  })
  @Field()
  name: string;
}

@ArgsType()
export class DeleteUserArg {
  @Field(type => ID, { nullable: true })
  id: string;
}