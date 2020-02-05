import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from '../auth/auth.module'
import { AdminRepository } from './repository/admin.repository'
import { AdminService } from './services/admin.service'
import { AdminValidatorService } from './services/admin-validator.service'
import { AdminApiTokenService } from './services/admin-api-token.service'
import { AdminApiTokenValidatorService } from './services/admin-api-token-validator.service'
import { AdminApiTokenRepository } from './repository/admin-api-token.repository'
import { AdminController } from './controllers/admin.controller'

const services = [AdminService, AdminApiTokenService]
const validators = [AdminValidatorService, AdminApiTokenValidatorService]

@Module({
  imports: [TypeOrmModule.forFeature([AdminRepository, AdminApiTokenRepository]), forwardRef(() => AuthModule)],
  controllers: [AdminController],
  providers: [...services, ...validators],
  exports: [...services, ...validators],
})
export class AdminModule {}
