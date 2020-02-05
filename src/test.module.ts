import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import applicationConfig from './config/configurations/application.config'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `./src/config/env/.env.${!process.env.NODE_ENV ? 'dev' : process.env.NODE_ENV}`,
      load: [applicationConfig],
    }),
  ],
})
export class TestModule {}
