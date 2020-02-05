import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { SignInDTO } from '../dto/sign-in.dto'
import { ApiTokenRo } from '../ro/api-token.ro'
import { UserRO } from '../../users/ro/user.ro'
import { ResponseObject } from '../../../global/utils/response.util'
import { CreateAccessTokenDTO } from '../dto/create-access-token.dto'
import { CreateAdminDTO } from '../../admin/dto/create.admin.dto'
import { AdminRO } from '../../admin/ro/admin.ro'
import { AuthAdminService } from '../services/auth-admin.service'

@ApiTags('auth-admin')
@Controller('auth/admin')
export class AuthAdminController {
  constructor(private readonly authAdminService: AuthAdminService) {}

  @ApiOkResponse({ description: '성공시 token을 발급함', type: ApiTokenRo })
  @Post('sign-in')
  public async signIn(@Body() signInDTO: SignInDTO): Promise<ApiTokenRo> {
    return await this.authAdminService.signIn(signInDTO)
  }

  @ApiOkResponse({ description: '관리자 생성 후 결과 값', type: UserRO })
  @ApiBody({ type: CreateAdminDTO, description: '관리자 생성시 필요한 값' })
  @Post('register')
  @HttpCode(200)
  public async register(@Body() createAdminDTO: CreateAdminDTO): Promise<ResponseObject<AdminRO>> {
    const adminEntity = await this.authAdminService.register(createAdminDTO)
    return new ResponseObject<AdminRO>().OK(adminEntity.toResponseObject())
  }

  @ApiOkResponse({ description: '새로 발급된 api 토큰 정보', type: Object })
  @ApiBody({ type: CreateAccessTokenDTO, description: '기존 토큰 정보' })
  @Post('api-token')
  @HttpCode(200)
  public async getAccessToken(@Body() createAccessTokenDTO: CreateAccessTokenDTO): Promise<ResponseObject<ApiTokenRo>> {
    return new ResponseObject<ApiTokenRo>().OK(
      await this.authAdminService.createApiTokenByRefreshToken(createAccessTokenDTO),
    )
  }
}
