import { Injectable } from '@nestjs/common'
import { CreateAdminDTO } from '../dto/create.admin.dto'
import { BusinessException } from '../../../global/exceptions/business.exception'
import { EntityManager } from 'typeorm'
import { AdminRepository } from '../repository/admin.repository'
import { AdminEntity } from '../entity/admin.entity'
import { AdminValidatorService } from './admin-validator.service'

@Injectable()
export class AdminService {
  constructor(
    private readonly adminEntityManager: EntityManager,
    private readonly adminValidatorService: AdminValidatorService,
    private readonly adminRepository: AdminRepository,
  ) {}

  public async findAllAdmin(): Promise<AdminEntity[]> {
    return await this.adminRepository.find()
  }

  public async findAdminByEmail(email: string): Promise<AdminEntity> {
    return await this.adminRepository.findOne({ where: { email: email } })
  }

  public async createAdmin(
    createAdminDto: CreateAdminDTO,
    entityManager: EntityManager = this.adminEntityManager,
  ): Promise<AdminEntity> {
    const { email, password, name } = createAdminDto

    if (await this.adminValidatorService.isEmailExist(email)) {
      throw new BusinessException('이미 등록된 이메일입니다.')
    }

    const newAdmin = new AdminEntity()
    newAdmin.email = email
    newAdmin.password = password
    newAdmin.name = name

    return await entityManager.save(newAdmin)
  }

  public async updateSignInAt(
    admin: AdminEntity,
    signInAt: Date,
    entityManager: EntityManager = this.adminEntityManager,
  ): Promise<AdminEntity> {
    admin.signInAt = signInAt

    return await entityManager.save(admin)
  }
}
