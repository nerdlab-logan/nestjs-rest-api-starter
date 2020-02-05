import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { AuthUserService } from '../services/auth-user.service'
import { ConfigService } from '@nestjs/config'
import { TokenAuthModel } from '../model/token-auth.model'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthUserService, private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwt.secret'),
      issuer: configService.get('jwt.issuer'),
      audience: configService.get('jwt.audience'),
      signOptions: {
        expiresIn: configService.get('jwt.expiresIn'),
      },
    })
  }

  async validate(payload: any): Promise<TokenAuthModel> {
    const tokenUser: TokenAuthModel = {
      id: payload.id,
      email: payload.email,
      role: payload.role,
    }
    return tokenUser
  }
}
