import { Controller, Get } from '@nestjs/common'
import { AdminRO } from '../ro/admin.ro'
import { ResponseObject } from '../../../global/utils/response.util'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { TokenAuth } from '../../../global/decorators/token-user.decorator'
import { TokenAuthModel } from '../../auth/model/token-auth.model'
import { AdminService } from '../services/admin.service'
import { Auth } from '../../../global/decorators/auth.decorator'

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOkResponse({ description: '등록된 관리자 목록', type: [AdminRO] })
  @Get()
  public async getAllUser(): Promise<ResponseObject<AdminRO[]>> {
    const adminList = await this.adminService.findAllAdmin()
    return new ResponseObject<AdminRO[]>().OK(adminList.map(admin => admin.toResponseObject()))
  }

  @Auth(AuthRole.ADMIN)
  @Get('profile')
  public async getProfile(@TokenAuth() tokenAuth: TokenAuthModel) {
    return tokenAuth
  }
}
