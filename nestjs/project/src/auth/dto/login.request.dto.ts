import { PickType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Cat } from 'src/cats/cats.schema';

export class LoginRequestDto extends PickType(Cat, [
  'email',
  'password',
] as const) {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
