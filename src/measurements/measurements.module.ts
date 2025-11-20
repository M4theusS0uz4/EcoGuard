import { Module } from '@nestjs/common';
import { MeasurementsController } from './measurements.controller';
import { MeasurementsService } from './measurements.service';
import { PrismaService } from 'src/prisma_NST/prisma.service';

@Module({
  controllers: [MeasurementsController],
  providers: [MeasurementsService, PrismaService],
})
export class MeasurementsModule {}
