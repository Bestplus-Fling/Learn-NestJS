import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/^[a-zA-Z0-9]8$/, {
    message: 'password only accepts english and number',
  }) // 영어랑 숫자만 가능하게 유효성 검사
  password: string;
}
