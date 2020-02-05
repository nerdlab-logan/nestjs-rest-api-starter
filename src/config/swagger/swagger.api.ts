import { SwaggerModule } from '@nestjs/swagger'
import { adminSwaggerDocument, authSwaggerDocument, userSwaggerDocument } from './swagger.document'
import { INestApplication } from '@nestjs/common'

const PATH_PREFIX = 'api/docs'

export const userSwaggerApiSetup = (app: INestApplication) => {
  SwaggerModule.setup(`${PATH_PREFIX}/user`, app, userSwaggerDocument(app))
}

export const adminSwaggerApiSetup = (app: INestApplication) => {
  SwaggerModule.setup(`${PATH_PREFIX}/admin`, app, adminSwaggerDocument(app))
}

export const authSwaggerApiSetup = (app: INestApplication) => {
  SwaggerModule.setup(`${PATH_PREFIX}/auth`, app, authSwaggerDocument(app))
}
