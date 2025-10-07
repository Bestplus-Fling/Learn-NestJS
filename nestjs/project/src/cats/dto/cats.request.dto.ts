import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CatRequestDto {
  @ApiProperty({
    example: 'test@example.com',
    description: 'email',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '1q2w3e!!',
    description: 'password',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'testuser',
    description: 'name',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
