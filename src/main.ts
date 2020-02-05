import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { AllExceptionsFilter } from './global/fillters/all-exception.filter'
import { Logger, ValidationPipe } from '@nestjs/common'
import { SwaggerConfig } from './config/swagger/swagger.config'

const port = process.env.PORT || 3030

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const { httpAdapter } = app.get(HttpAdapterHost)
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter))

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      validationError: { target: false },
    }),
  )

  new SwaggerConfig(app).init()

  await app.listen(port)
  Logger.log(`Server running on http://localhost:${port}`)
}

bootstrap()
