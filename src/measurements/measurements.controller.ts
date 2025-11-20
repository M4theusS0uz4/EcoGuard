import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MeasurementsService } from './measurements.service';
import { CreateMeasurementDto } from './dto/create-measurement.dto';

@Controller('measurements')
export class MeasurementsController {
  constructor(private readonly measurementsService: MeasurementsService) {}

  // ESP envia medições da boia (Eco)
  @Post()
  create(@Body() dto: CreateMeasurementDto) {
    return this.measurementsService.create(dto);
  }

  // Front busca as últimas medições da Eco
  @Get(':ecoId')
  findByEco(@Param('ecoId') ecoId: string) {
    return this.measurementsService.findByEco(Number(ecoId));
  }
}
