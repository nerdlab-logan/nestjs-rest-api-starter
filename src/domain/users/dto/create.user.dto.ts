import { IsEmail, IsNotEmpty, Length } from 'class-validator'

export class CreateUserDTO {
  @IsEmail()
  readonly email: string

  @IsNotEmpty()
  readonly password: string

  @IsNotEmpty()
  @Length(0, 64)
  readonly name: string

  @IsNotEmpty()
  @Length(0, 60)
  readonly nickName: string

  constructor(email: string, password: string, name: string, nickName: string) {
    this.email = email
    this.password = password
    this.name = name
    this.nickName = nickName
  }
}
