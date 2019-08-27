import { Length, IsEmail } from 'class-validator';

export class postDto {
  @Length(3, 10, {
    message: '字符长度应该在$constraint1-$constraint2之间'
  })
  readonly a: string;

  @IsEmail()
  readonly c: string;
}