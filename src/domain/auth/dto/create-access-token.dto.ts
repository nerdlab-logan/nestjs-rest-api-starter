import { IsString } from 'class-validator'

export class CreateAccessTokenDTO {
  @IsString()
  readonly accessToken: string

  @IsString()
  readonly refreshToken: string

  constructor(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken
    this.refreshToken = refreshToken
  }
}
