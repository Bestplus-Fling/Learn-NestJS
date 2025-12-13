import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthCredentialDto } from 'src/auth/dto/auth-credential.dto';
import { UserRepository } from 'src/auth/user.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(request: AuthCredentialDto): Promise<void> {
    return this.userRepository.createUser(request);
  }

  async signIn({
    username,
    password,
  }: AuthCredentialDto): Promise<{ accessToken: string }> {
    const user = await this.userRepository.findOne({ where: { username } });

    if (user && (await bcrypt.compare(password, user.password))) {
      // create jwt token( Secret + Payload)
      const payload = { username };
      const accessToken = await this.jwtService.signAsync(payload);

      return { accessToken };
    } else {
      throw new UnauthorizedException('login failed');
    }
  }
}
