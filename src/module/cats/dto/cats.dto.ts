import { Length, IsEmail } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class GetDto {
  // @ApiModelProperty({
  //   required: true,
  // })
  // @Length(3, 10, {
  //   message: '字符长度应该在$constraint1-$constraint2之间'
  // })
  readonly a!: string;
}

export class PostDto {
  @ApiModelProperty()
  @Length(3, 10, {
    message: '字符长度应该在$constraint1-$constraint2之间'
  })
  readonly a!: string;

  @ApiModelProperty()
  @IsEmail()
  readonly b!: string;
}
