import { IsEmail, IsNotEmpty, Length } from 'class-validator'

export class CreateAdminDTO {
  @IsEmail()
  readonly email: string

  @IsNotEmpty()
  readonly password: string

  @IsNotEmpty()
  @Length(0, 64)
  readonly name: string
}
