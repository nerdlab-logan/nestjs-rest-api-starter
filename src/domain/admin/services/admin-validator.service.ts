import { Injectable } from '@nestjs/common'
import { AdminRepository } from '../repository/admin.repository'

@Injectable()
export class AdminValidatorService {
  constructor(private readonly adminRepository: AdminRepository) {}

  public async isEmailExist(email: string): Promise<boolean> {
    return (await this.adminRepository.count({ where: { email: email } })) > 0
  }
}
