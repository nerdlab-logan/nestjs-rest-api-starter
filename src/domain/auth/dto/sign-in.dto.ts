import { IsEmail, IsString } from 'class-validator'

export class SignInDTO {
  @IsEmail()
  readonly email: string

  @IsString()
  readonly password: string

  constructor(email: string, password: string) {
    this.email = email
    this.password = password
  }
}
