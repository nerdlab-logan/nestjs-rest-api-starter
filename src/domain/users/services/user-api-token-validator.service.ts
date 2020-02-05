import { Injectable } from '@nestjs/common'
import { UserApiTokenRepository } from '../repository/user-api-token.repository'
import { UserEntity } from '../entity/user.entity'

@Injectable()
export class UserApiTokenValidatorService {
  constructor(private readonly userApiTokenRepository: UserApiTokenRepository) {}

  public async isValidApiToken(user: UserEntity, accessToken: string, refreshToken: string): Promise<boolean> {
    return (
      (await this.userApiTokenRepository.count({
        where: { userId: user.id, accessToken: accessToken, refreshToken: refreshToken },
      })) == 1
    )
  }
}
