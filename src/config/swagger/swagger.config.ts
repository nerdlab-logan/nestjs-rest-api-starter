import { INestApplication } from '@nestjs/common'
import { adminSwaggerApiSetup, authSwaggerApiSetup, userSwaggerApiSetup } from './swagger.api'

export class SwaggerConfig {
  private readonly app: INestApplication

  constructor(app: INestApplication) {
    this.app = app
  }

  public init() {
    userSwaggerApiSetup(this.app)
    authSwaggerApiSetup(this.app)
    adminSwaggerApiSetup(this.app)
  }
}
