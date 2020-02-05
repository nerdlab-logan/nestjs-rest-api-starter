import { forwardRef, Module } from '@nestjs/common'
import { AuthUserService } from './services/auth-user.service'
import { UserModule } from '../users/user.module'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { AuthUserController } from './controllers/auth-user.controller'
import { ConfigModule, ConfigService } from '@nestjs/config'
import jwtConfig from '../../config/configurations/jwt.config'
import { JwtStrategy } from './strategy/jwt.strategy'
import { JwtTokenService } from './services/jwt-token.service'
import { AuthAdminController } from './controllers/auth-admin.controller'
import { AuthAdminService } from './services/auth-admin.service'
import { AdminModule } from '../admin/admin.module'

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => AdminModule),
    PassportModule,
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(jwtConfig)],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('jwt.secret'),
          signOptions: {
            expiresIn: configService.get('jwt.expiresIn'),
          },
        }
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthUserController, AuthAdminController],
  providers: [AuthUserService, AuthAdminService, JwtTokenService, JwtStrategy],
  exports: [AuthUserService, AuthAdminService, JwtTokenService],
})
export class AuthModule {}
