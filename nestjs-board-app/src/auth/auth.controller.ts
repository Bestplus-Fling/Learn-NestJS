import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { AuthCredentialDto } from 'src/auth/dto/auth-credential.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) request: AuthCredentialDto): Promise<void> {
    return this.authService.signUp(request);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) req: AuthCredentialDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(req);
  }
}
