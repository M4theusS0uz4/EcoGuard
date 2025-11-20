import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma_NST/prisma.service';
import { CreateMeasurementDto } from './dto/create-measurement.dto';

@Injectable()
export class MeasurementsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateMeasurementDto) {
    return this.prisma.measurement.create({ data });
  }

  async findByEco(ecoId: number) {
    return this.prisma.measurement.findMany({
      where: { ecoId },
      orderBy: { createdAt: 'desc' },
      take: 20, 
    });
  }
}
