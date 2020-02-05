import { Injectable } from '@nestjs/common'
import { UserRepository } from '../repository/user.repository'
import { UserEntity } from '../entity/user.entity'
import { CreateUserDTO } from '../dto/create.user.dto'
import { UserValidatorService } from './user-validator.service'
import { BusinessException } from '../../../global/exceptions/business.exception'
import { EntityManager } from 'typeorm'

@Injectable()
export class UserService {
  constructor(
    private readonly userEntityManager: EntityManager,
    private readonly userValidatorService: UserValidatorService,
    private readonly userRepository: UserRepository,
  ) {}

  public async findAllUser(): Promise<UserEntity[]> {
    return await this.userRepository.find()
  }

  public async findUserByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { email: email } })
  }

  public async createUser(
    createUserDTO: CreateUserDTO,
    entityManager: EntityManager = this.userEntityManager,
  ): Promise<UserEntity> {
    const { email, password, name, nickName } = createUserDTO

    if (await this.userValidatorService.isEmailExist(email)) {
      throw new BusinessException('이미 등록된 이메일입니다.')
    }

    if (await this.userValidatorService.isNickNameExist(nickName)) {
      throw new BusinessException('사용중인 닉네임 입니다.')
    }

    const newUser = new UserEntity()
    newUser.email = email
    newUser.password = password
    newUser.name = name
    newUser.nickName = nickName

    return await entityManager.save(newUser)
  }

  public async updateSignInAt(
    user: UserEntity,
    signInAt: Date,
    entityManager: EntityManager = this.userEntityManager,
  ): Promise<UserEntity> {
    user.signInAt = signInAt

    return await entityManager.save(user)
  }
}
