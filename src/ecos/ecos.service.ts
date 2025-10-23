import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma_NST/prisma.service';
import { CreateEcoDto } from './dto/create-eco.dto';
import { UpdateEcoDto } from './dto/update-eco.dto';

@Injectable()
export class EcosService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateEcoDto) {
    return this.prisma.eco.create({ data });
  }

  async findAll() {
    return this.prisma.eco.findMany({
      include: { user: true, measurements: true },
    });
  }

  async findOne(id: number) {
    const eco = await this.prisma.eco.findUnique({
      where: { id },
      include: { user: true, measurements: true },
    });

    if (!eco) throw new NotFoundException('Eco não encontrado');
    return eco;
  }

  async update(id: number, data: UpdateEcoDto) {
    const exists = await this.prisma.eco.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Eco não encontrado');

    return this.prisma.eco.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    const exists = await this.prisma.eco.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Eco não encontrado');

    return this.prisma.eco.delete({ where: { id } });
  }
}
