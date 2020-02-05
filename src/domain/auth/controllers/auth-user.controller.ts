import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { AuthUserService } from '../services/auth-user.service'
import { SignInDTO } from '../dto/sign-in.dto'
import { ApiTokenRo } from '../ro/api-token.ro'
import { UserRO } from '../../users/ro/user.ro'
import { CreateUserDTO } from '../../users/dto/create.user.dto'
import { ResponseObject } from '../../../global/utils/response.util'
import { CreateAccessTokenDTO } from '../dto/create-access-token.dto'

@ApiTags('auth-user')
@Controller('auth/user')
export class AuthUserController {
  constructor(private readonly authUserService: AuthUserService) {}

  @ApiOkResponse({ description: '성공시 token을 발급함', type: ApiTokenRo })
  @Post('sign-in')
  public async signIn(@Body() signInDTO: SignInDTO): Promise<ApiTokenRo> {
    return await this.authUserService.signIn(signInDTO)
  }

  @ApiOkResponse({ description: '유저 생성 후 결과 값', type: UserRO })
  @ApiBody({ type: CreateUserDTO, description: '유저 생성시 필요한 값' })
  @Post('register')
  @HttpCode(200)
  public async register(@Body() createUserDTO: CreateUserDTO): Promise<ResponseObject<UserRO>> {
    const userEntityPromise = await this.authUserService.register(createUserDTO)
    return new ResponseObject<UserRO>().OK(userEntityPromise.toResponseObject())
  }

  @ApiOkResponse({ description: '새로 발급된 api 토큰 정보', type: Object })
  @ApiBody({ type: CreateAccessTokenDTO, description: '기존 토큰 정보' })
  @Post('api-token')
  @HttpCode(200)
  public async getAccessToken(@Body() createAccessTokenDTO: CreateAccessTokenDTO): Promise<ResponseObject<ApiTokenRo>> {
    return new ResponseObject<ApiTokenRo>().OK(
      await this.authUserService.createApiTokenByRefreshToken(createAccessTokenDTO),
    )
  }
}
