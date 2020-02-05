import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { OpenAPIObject } from '@nestjs/swagger/dist/interfaces'
import { UserModule } from '../../domain/users/user.module'
import { INestApplication } from '@nestjs/common'
import { AuthModule } from '../../domain/auth/auth.module'
import { AdminModule } from '../../domain/admin/admin.module'

export const authSwaggerDocument = (app: INestApplication): OpenAPIObject => {
  const document = new DocumentBuilder()
    .setTitle('auth example')
    .setDescription('The auth API description')
    .setVersion('1.0')
    .addTag('auth-user')
    .addTag('auth-admin')
    .build()

  return SwaggerModule.createDocument(app, document, {
    include: [AuthModule],
  })
}

export const userSwaggerDocument = (app: INestApplication): OpenAPIObject => {
  const document = new DocumentBuilder()
    .setTitle('user example')
    .setDescription('The user API description')
    .setVersion('1.0')
    .addTag('user')
    .addBearerAuth()
    .build()

  return SwaggerModule.createDocument(app, document, {
    include: [UserModule],
  })
}

export const adminSwaggerDocument = (app: INestApplication): OpenAPIObject => {
  const document = new DocumentBuilder()
    .setTitle('admin example')
    .setDescription('The admin API description')
    .setVersion('1.0')
    .addTag('admin')
    .addBearerAuth()
    .build()

  return SwaggerModule.createDocument(app, document, {
    include: [AdminModule],
  })
}
