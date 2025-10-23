import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma_NST/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { EcosModule } from './ecos/ecos.module';
import { MeasurementsModule } from './measurements/measurements.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    EcosModule,
    MeasurementsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
