import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from './database.module'
import { UserModule } from './domain/users/user.module'
import { AuthModule } from './domain/auth/auth.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `./src/config/env/.env.${!process.env.NODE_ENV ? 'dev' : process.env.NODE_ENV}`,
    }),
    DatabaseModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
