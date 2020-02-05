import { Injectable } from '@nestjs/common'
import { AdminEntity } from '../entity/admin.entity'
import { AdminApiTokenRepository } from '../repository/admin-api-token.repository'

@Injectable()
export class AdminApiTokenValidatorService {
  constructor(private readonly adminApiTokenRepository: AdminApiTokenRepository) {}

  public async isValidApiToken(admin: AdminEntity, accessToken: string, refreshToken: string): Promise<boolean> {
    return (
      (await this.adminApiTokenRepository.count({
        where: { adminId: admin.id, accessToken: accessToken, refreshToken: refreshToken },
      })) == 1
    )
  }
}
