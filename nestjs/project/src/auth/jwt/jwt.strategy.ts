import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { payload } from './jwt.payload';
import { CatsRepository } from 'src/cats/cats.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly catsRepository: CatsRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // 만료 기간을 지정
      secretOrKey: process.env.JWT_SECRET!, // 환경변수로 지정 예정
    });
  }
  // 인증
  async validate(payload: payload) {
    const cat = await this.catsRepository.findCatByIdWithoutPassword(
      payload.sub,
    );

    if (cat) {
      return cat; // request.user 내부에 cat이 들어감
    } else {
      throw new UnauthorizedException('접근 오류');
    }
  }
}
