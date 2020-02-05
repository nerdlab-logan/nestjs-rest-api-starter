import { Injectable, Logger } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as JWT from 'jsonwebtoken'
import { JwtPayloadModel } from '../model/jwt-payload.model'
import { ConfigService } from '@nestjs/config'
import { BusinessException } from '../../../global/exceptions/business.exception'
import * as CT from 'class-transformer'
import { AccountAbstractEntity } from '../../../global/entity/abstracts/account.abstract.entity'

@Injectable()
export class JwtTokenService {
  private readonly issuer: string
  private readonly audience: string
  private readonly accessSecretKey: string
  private readonly refreshSecretKey: string
  private readonly refreshExpiresIn: string // zeit/ms

  constructor(private readonly jwtService: JwtService, private readonly configService: ConfigService) {
    this.issuer = this.configService.get('jwt.issuer')
    this.audience = this.configService.get('jwt.audience')
    this.accessSecretKey = this.configService.get('jwt.secret')
    this.refreshSecretKey = this.configService.get('jwt.refresh.secret')
    this.refreshExpiresIn = this.configService.get('jwt.refresh.expiresIn')
  }

  /**
   * access Token 생성
   * @param account - 계정 정보
   */
  public async createAccessToken(account: AccountAbstractEntity, role: AuthRole): Promise<string> {
    const payload: JwtPayloadModel = {
      iss: this.issuer, // 발급자
      aud: this.audience, // 발급처
      id: account.id, // 유저 ID(PK)
      email: account.email, // 유저 Email
      role: role,
      tokenType: ApiTokenType.ACCESS,
    }

    try {
      return await this.jwtService.signAsync(payload)
    } catch (err) {
      Logger.error(err.message)
      new BusinessException('토큰 생성에 실패 하였습니다.')
    }
  }

  /**
   * access token 유효성 검사
   * @param token - access token
   */
  public async verifyAccessToken(token: string): Promise<JwtPayloadModel> {
    const verifyOptions = {
      issuer: this.issuer,
      audience: this.audience,
      tokenType: ApiTokenType.ACCESS,
    }

    return new Promise((resolve, reject) =>
      JWT.verify(token, this.accessSecretKey, verifyOptions, (err, decoded) => {
        if (err) {
          Logger.error(`${err.name} = ${err.message}`)
          reject(new BusinessException('유효한 토큰이 아닙니다.'))
        } else {
          resolve(CT.plainToClass(JwtPayloadModel, decoded))
        }
      }),
    )
  }

  /**
   * refresh token 생성
   * @param account - 계정 정보
   */
  public async createRefreshToken(account: AccountAbstractEntity, role: AuthRole): Promise<string> {
    const payload: JwtPayloadModel = {
      iss: this.issuer, // 발급자
      aud: this.audience, // 발급처
      id: account.id, // 계정 ID(PK)
      email: account.email, // 계정 Email
      role: role,
      tokenType: ApiTokenType.REFRESH,
    }

    const signOptions = {
      expiresIn: this.refreshExpiresIn,
    }

    return new Promise((resolve, reject) =>
      JWT.sign(payload, this.refreshSecretKey, signOptions, (err, encoded) => {
        if (err) {
          Logger.error(err.message)
          reject(new BusinessException('토큰 생성에 실패 하였습니다.'))
        } else {
          resolve(encoded)
        }
      }),
    )
  }

  /**
   * refresh token 유효성 검사
   * @param token - refresh token
   */
  public async verifyRefreshToken(token: string): Promise<JwtPayloadModel> {
    const verifyOptions = {
      issuer: this.issuer,
      audience: this.audience,
      tokenType: ApiTokenType.REFRESH,
    }

    return new Promise((resolve, reject) =>
      JWT.verify(token, this.refreshSecretKey, verifyOptions, (err, decoded) => {
        if (err) {
          Logger.error(`${err.name} = ${err.message}`)
          reject(new BusinessException('유효한 토큰이 아닙니다.'))
        } else {
          resolve(CT.plainToClass(JwtPayloadModel, decoded))
        }
      }),
    )
  }
}
