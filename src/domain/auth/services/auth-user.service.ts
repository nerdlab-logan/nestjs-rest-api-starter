import { Injectable } from '@nestjs/common'
import { UserService } from '../../users/services/user.service'
import { UserEntity } from '../../users/entity/user.entity'
import { SignInDTO } from '../dto/sign-in.dto'
import { CreateUserDTO } from '../../users/dto/create.user.dto'
import { BusinessException } from '../../../global/exceptions/business.exception'
import { JwtTokenService } from './jwt-token.service'
import { ApiTokenRo } from '../ro/api-token.ro'
import { CreateAccessTokenDTO } from '../dto/create-access-token.dto'
import { JwtPayloadModel } from '../model/jwt-payload.model'
import { UserApiTokenEntity } from '../../users/entity/user-api-token.entity'
import { UserApiTokenValidatorService } from '../../users/services/user-api-token-validator.service'
import { EntityManager } from 'typeorm'
import { UserApiTokenService } from '../../users/services/user-api-token.service'

@Injectable()
export class AuthUserService {
  constructor(
    private readonly authEntityManager: EntityManager,
    private readonly jwtTokenService: JwtTokenService,
    private readonly userService: UserService,
    private readonly userApiTokenService: UserApiTokenService,
    private readonly userApiTokenValidatorService: UserApiTokenValidatorService,
  ) {}

  public async validateUser(signInDTO: SignInDTO): Promise<UserEntity> {
    const user: UserEntity = await this.userService.findUserByEmail(signInDTO.email)
    if (user && (await user.comparePassword(signInDTO.password))) {
      return user
    }
    return null
  }

  public async signIn(signInDTO: SignInDTO): Promise<ApiTokenRo> {
    const user: UserEntity = await this.validateUser(signInDTO)
    if (!user) {
      throw new BusinessException('아이디 또는 패스워드가 일치 하지 않습니다.')
    }

    return this.authEntityManager.transaction(async entityManager => {
      const resultData = await this.createApiTokenByUser(user, entityManager)
      await this.userService.updateSignInAt(user, new Date(), entityManager)
      return resultData
    })
  }

  public async register(createUserDTO: CreateUserDTO): Promise<UserEntity> {
    return await this.userService.createUser(createUserDTO)
  }

  public async createApiTokenByUser(
    user: UserEntity,
    entityManager: EntityManager = this.authEntityManager,
  ): Promise<ApiTokenRo> {
    const accessToken = await this.jwtTokenService.createAccessToken(user, AuthRole.USER)
    const refreshToken = await this.jwtTokenService.createRefreshToken(user, AuthRole.USER)

    const userApiTokenEntity: UserApiTokenEntity = await this.userApiTokenService.createApiToken(
      user,
      accessToken,
      refreshToken,
      entityManager,
    )

    return new ApiTokenRo(userApiTokenEntity.accessToken, userApiTokenEntity.refreshToken)
  }

  public async createApiTokenByRefreshToken(tokenInfo: CreateAccessTokenDTO): Promise<ApiTokenRo> {
    const tokenPayload: JwtPayloadModel = await this.jwtTokenService.verifyRefreshToken(tokenInfo.refreshToken)
    const user = await this.userService.findUserByEmail(tokenPayload.email)

    if (
      !(await this.userApiTokenValidatorService.isValidApiToken(user, tokenInfo.accessToken, tokenInfo.refreshToken))
    ) {
      throw new BusinessException('유효하지 않은 토큰 정보 입니다.')
    }

    return await this.createApiTokenByUser(user, this.authEntityManager)
  }
}
