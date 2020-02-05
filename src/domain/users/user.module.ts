import { forwardRef, Module } from '@nestjs/common'
import { UserController } from './controllers/user.controller'
import { UserService } from './services/user.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserRepository } from './repository/user.repository'
import { UserValidatorService } from './services/user-validator.service'
import { UserApiTokenRepository } from './repository/user-api-token.repository'
import { AuthModule } from '../auth/auth.module'
import { UserApiTokenValidatorService } from './services/user-api-token-validator.service'
import { UserApiTokenService } from './services/user-api-token.service'

const services = [UserService, UserApiTokenService]
const validators = [UserValidatorService, UserApiTokenValidatorService]

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, UserApiTokenRepository]), forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [...services, ...validators],
  exports: [...services, ...validators],
})
export class UserModule {}
