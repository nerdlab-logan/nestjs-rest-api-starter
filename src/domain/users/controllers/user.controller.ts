import { Controller, Get } from '@nestjs/common'
import { UserService } from '../services/user.service'
import { UserRO } from '../ro/user.ro'
import { ResponseObject } from '../../../global/utils/response.util'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { TokenAuth } from '../../../global/decorators/token-user.decorator'
import { TokenAuthModel } from '../../auth/model/token-auth.model'
import { Auth } from '../../../global/decorators/auth.decorator'

@ApiTags('user')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse({ description: '등록된 유저 목록', type: [UserRO] })
  @Get()
  public async getAllUser(): Promise<ResponseObject<UserRO[]>> {
    const userList = await this.userService.findAllUser()
    return new ResponseObject<UserRO[]>().OK(userList.map(user => user.toResponseObject()))
  }

  @Auth(AuthRole.USER)
  @Get('profile')
  public async getProfile(@TokenAuth() tokenAuth: TokenAuthModel) {
    return tokenAuth
  }
}
