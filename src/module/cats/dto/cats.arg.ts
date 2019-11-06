import { Length, IsEmail } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Field, ObjectType } from 'type-graphql';
export class GetArg {
  // @ApiModelProperty({
  //   required: true,
  // })
  // @Length(3, 10, {
  //   message: '字符长度应该在$constraint1-$constraint2之间'
  // })
  @ApiModelProperty()
  readonly a!: string;
}

export class PostArg {
  @ApiModelProperty()
  @Length(3, 10, {
    message: '字符长度应该在$constraint1-$constraint2之间'
  })
  readonly a!: string;

  @ApiModelProperty()
  @IsEmail()
  readonly b!: string;
}


@ObjectType()
export class CatsArg {
  @ApiModelProperty()
  @Field({ nullable: true })
  readonly id?: string;

  @ApiModelProperty()
  @Field({ nullable: true })
  readonly name?: string;

  @ApiModelProperty()
  @Field({ nullable: true })
  readonly date?: Date;
}
