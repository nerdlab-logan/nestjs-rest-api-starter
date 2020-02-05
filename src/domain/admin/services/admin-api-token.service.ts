import { Injectable } from '@nestjs/common'
import { EntityManager } from 'typeorm'
import { JwtTokenService } from '../../auth/services/jwt-token.service'
import { AdminEntity } from '../entity/admin.entity'
import { AdminApiTokenEntity } from '../entity/admin-api-token.entity'

@Injectable()
export class AdminApiTokenService {
  constructor(private readonly userEntityManager: EntityManager, private readonly jwtTokenService: JwtTokenService) {}

  public async createApiToken(
    admin: AdminEntity,
    accessToken: string,
    refreshToken: string,
    entityManager: EntityManager = this.userEntityManager,
  ): Promise<AdminApiTokenEntity> {
    const accessTokenPayload = await this.jwtTokenService.verifyAccessToken(accessToken)
    const refreshTokenPayload = await this.jwtTokenService.verifyRefreshToken(refreshToken)

    const newApiToken = new AdminApiTokenEntity()
    newApiToken.admin = admin
    newApiToken.accessToken = accessToken
    newApiToken.accessTokenExpiredDatetime = new Date(accessTokenPayload.exp * 1000)
    newApiToken.refreshToken = refreshToken
    newApiToken.refreshTokenExpiredDatetime = new Date(refreshTokenPayload.exp * 1000)

    return await entityManager.save(newApiToken)
  }
}
