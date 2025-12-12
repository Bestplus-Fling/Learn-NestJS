import { Injectable } from '@nestjs/common';
import { AuthCredentialDto } from 'src/auth/dto/auth-credential.dto';
import { UserRepository } from 'src/auth/user.repository';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async signUp(request: AuthCredentialDto): Promise<void> {
    return this.userRepository.createUser(request);
  }
}
