import { UserRepository } from '../repository/user.repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UserValidatorService {
  constructor(private readonly userRepository: UserRepository) {}

  public async isEmailExist(email: string): Promise<boolean> {
    return (await this.userRepository.count({ where: { email: email } })) > 0
  }

  public async isNickNameExist(nickName: string): Promise<boolean> {
    return (await this.userRepository.count({ where: { nickName: nickName } })) > 0
  }
}
