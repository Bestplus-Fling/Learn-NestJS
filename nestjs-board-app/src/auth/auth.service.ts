import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthCredentialDto } from 'src/auth/dto/auth-credential.dto';
import { UserRepository } from 'src/auth/user.repository';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async signUp(request: AuthCredentialDto): Promise<void> {
    return this.userRepository.createUser(request);
  }

  async signIn({ username, password }: AuthCredentialDto): Promise<string> {
    const user = await this.userRepository.findOne({ where: { username } });

    if (user && (await bcrypt.compare(password, user.password))) {
      return 'login success';
    } else {
      throw new UnauthorizedException('login failed');
    }
  }
}
