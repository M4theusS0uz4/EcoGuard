import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { EcosService } from './ecos.service';
import { CreateEcoDto } from './dto/create-eco.dto';
import { UpdateEcoDto } from './dto/update-eco.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth-guard';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { Roles } from 'src/auth/roles/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('ecos')
export class EcosController {
  constructor(private readonly ecoService: EcosService) {}

  @Post()
  create(@Body() createEcoDto: CreateEcoDto) {
    return this.ecoService.create(createEcoDto);
  }
  @Roles('PREFEITURA')
  @Get()
  findAll() {
    return this.ecoService.findAll();
  }
@Roles('INDUSTRY')
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ecoService.findOne(id);
  }
  @Roles('INDUSTRY')
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEcoDto: UpdateEcoDto,
  ) {
    return this.ecoService.update(id, updateEcoDto);
  }
  @Roles('INDUSTRY')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ecoService.remove(id);
  }
}
