import { Module } from '@nestjs/common';
import { EcosService } from './ecos.service';
import { EcosController } from './ecos.controller';
import { PrismaService } from 'src/prisma_NST/prisma.service';

@Module({
  providers: [EcosService, PrismaService],
  controllers: [EcosController],
})
export class EcosModule {}
