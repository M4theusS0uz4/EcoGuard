import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'src/prisma_NST/prisma.service';
import { UsersService } from 'src/users/users.service';
import { JwtStrategy } from './jwt/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule], // 1. Importa o módulo de configuração
      useFactory: async (configService: ConfigService) => ({
        // 2. Usa uma factory assíncrona
        // 3. Obtém o segredo do ambiente usando ConfigService
        secret:
          configService.get<string>('JWT_SECRET') || 'ecoguard-secret-fallback',
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, UsersService, JwtStrategy],
})
export class AuthModule {}
