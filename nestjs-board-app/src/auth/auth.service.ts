import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/auth/user.repository';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}
}
