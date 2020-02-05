import { Test } from '@nestjs/testing'
import { UserService } from '../user.service'
import { UserValidatorService } from '../user-validator.service'
import { CreateUserDTO } from '../../dto/create.user.dto'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserRepository } from '../../repository/user.repository'
import { UserApiTokenRepository } from '../../repository/user-api-token.repository'
import { DatabaseModule } from '../../../../database.module'
import { TestModule } from '../../../../test.module'
import { BusinessException } from '../../../../global/exceptions/business.exception'
import { Connection, EntityManager, QueryRunner } from 'typeorm'

class UserValidatorServiceMock {
  private readonly mockEmails: string[] = ['aaa@nerdlab.xyz', 'bbb@nerdlab.xyz']
  private readonly mockNickName: string[] = ['철수', '영희']

  isEmailExist(email: string) {
    return this.mockEmails.includes(email)
  }

  isNickNameExist(nickName: string) {
    return this.mockNickName.includes(nickName)
  }
}

describe('User Service Test', () => {
  let userService: UserService
  let connection: Connection

  const UserValidatorServiceProvider = {
    provide: UserValidatorService,
    useClass: UserValidatorServiceMock,
  }

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TestModule, DatabaseModule, TypeOrmModule.forFeature([UserRepository, UserApiTokenRepository])],
      providers: [UserService, UserValidatorServiceProvider],
    }).compile()

    userService = moduleRef.get<UserService>(UserService)
    connection = moduleRef.get<Connection>(Connection)
  })

  describe('유저 생성 중복 처리 테스트', () => {
    it('이메일이 존재하는 경우 에러를 반환한다.', async () => {
      const createUserDTO = new CreateUserDTO('aaa@nerdlab.xyz', '1234', 'aaa', 'aa')
      await expect(userService.createUser(createUserDTO)).rejects.toThrowError(
        new BusinessException('이미 등록된 이메일입니다.'),
      )
    })

    it('별명이 존재하는 경우 에러를 반환한다.', async () => {
      const createUserDTO = new CreateUserDTO('new@nerdlab.xyz', '1234', 'aaa', '철수')
      await expect(userService.createUser(createUserDTO)).rejects.toThrowError(
        new BusinessException('사용중인 닉네임 입니다.'),
      )
    })
  })

  describe('유저 생성 테스트', () => {
    let queryRunner: QueryRunner
    let entityManager: EntityManager
    beforeAll(() => {
      queryRunner = connection.createQueryRunner()
    })

    beforeEach(async () => {
      await queryRunner.connect()
      await queryRunner.startTransaction()
      entityManager = queryRunner.manager
    })

    afterEach(async () => await queryRunner.rollbackTransaction())

    it('유저 생성', async () => {
      const createUserDTO = new CreateUserDTO('test@nerdlab.xyz', '1234', 'test', 'test')
      const newUser = await userService.createUser(createUserDTO, entityManager)

      expect(newUser).toHaveProperty('id')
      expect(newUser.id).not.toBeNull()
      expect(newUser.email).toBe(createUserDTO.email)
      expect(newUser.name).toBe(createUserDTO.name)
    })
  })
})
