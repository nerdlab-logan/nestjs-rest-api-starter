import { Injectable } from '@nestjs/common'
import { SignInDTO } from '../dto/sign-in.dto'
import { BusinessException } from '../../../global/exceptions/business.exception'
import { JwtTokenService } from './jwt-token.service'
import { ApiTokenRo } from '../ro/api-token.ro'
import { CreateAccessTokenDTO } from '../dto/create-access-token.dto'
import { JwtPayloadModel } from '../model/jwt-payload.model'
import { EntityManager } from 'typeorm'
import { AdminService } from '../../admin/services/admin.service'
import { AdminEntity } from '../../admin/entity/admin.entity'
import { CreateAdminDTO } from '../../admin/dto/create.admin.dto'
import { AdminApiTokenService } from '../../admin/services/admin-api-token.service'
import { AdminApiTokenValidatorService } from '../../admin/services/admin-api-token-validator.service'
import { AdminApiTokenEntity } from '../../admin/entity/admin-api-token.entity'

@Injectable()
export class AuthAdminService {
  constructor(
    private readonly authEntityManager: EntityManager,
    private readonly jwtTokenService: JwtTokenService,
    private readonly adminService: AdminService,
    private readonly adminApiTokenService: AdminApiTokenService,
    private readonly adminApiTokenValidatorService: AdminApiTokenValidatorService,
  ) {}

  public async validateAdmin(signInDTO: SignInDTO): Promise<AdminEntity> {
    const admin: AdminEntity = await this.adminService.findAdminByEmail(signInDTO.email)
    if (admin && (await admin.comparePassword(signInDTO.password))) {
      return admin
    }
    return null
  }

  public async signIn(signInDTO: SignInDTO): Promise<ApiTokenRo> {
    const admin: AdminEntity = await this.validateAdmin(signInDTO)
    if (!admin) {
      throw new BusinessException('아이디 또는 패스워드가 일치 하지 않습니다.')
    }

    return this.authEntityManager.transaction(async entityManager => {
      const resultData = await this.createApiTokenByAdmin(admin, entityManager)
      await this.adminService.updateSignInAt(admin, new Date(), entityManager)
      return resultData
    })
  }

  public async register(createAdminDTO: CreateAdminDTO): Promise<AdminEntity> {
    return await this.adminService.createAdmin(createAdminDTO)
  }

  public async createApiTokenByAdmin(
    admin: AdminEntity,
    entityManager: EntityManager = this.authEntityManager,
  ): Promise<ApiTokenRo> {
    const accessToken = await this.jwtTokenService.createAccessToken(admin, AuthRole.ADMIN)
    const refreshToken = await this.jwtTokenService.createRefreshToken(admin, AuthRole.ADMIN)

    const adminApiTokenEntity: AdminApiTokenEntity = await this.adminApiTokenService.createApiToken(
      admin,
      accessToken,
      refreshToken,
      entityManager,
    )

    return new ApiTokenRo(adminApiTokenEntity.accessToken, adminApiTokenEntity.refreshToken)
  }

  public async createApiTokenByRefreshToken(tokenInfo: CreateAccessTokenDTO): Promise<ApiTokenRo> {
    const tokenPayload: JwtPayloadModel = await this.jwtTokenService.verifyRefreshToken(tokenInfo.refreshToken)
    const admin = await this.adminService.findAdminByEmail(tokenPayload.email)

    if (
      !(await this.adminApiTokenValidatorService.isValidApiToken(admin, tokenInfo.accessToken, tokenInfo.refreshToken))
    ) {
      throw new BusinessException('유효하지 않은 토큰 정보 입니다.')
    }

    return await this.createApiTokenByAdmin(admin, this.authEntityManager)
  }
}
