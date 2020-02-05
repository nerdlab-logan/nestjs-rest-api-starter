export class JwtPayloadModel {
  id: number
  email: string
  iss: string
  aud: string
  iat?: number
  exp?: number
  role: AuthRole
  tokenType: ApiTokenType
}
