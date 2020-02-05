import { createParamDecorator } from '@nestjs/common'
import { TokenAuthModel } from '../../domain/auth/model/token-auth.model'

export const TokenAuth = createParamDecorator(
  (data, req): TokenAuthModel => {
    return data ? req.user && req.user[data] : req.user
  },
)
