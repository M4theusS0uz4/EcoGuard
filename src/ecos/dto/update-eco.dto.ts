import { PartialType } from '@nestjs/mapped-types';
import { CreateEcoDto } from './create-eco.dto';

export class UpdateEcoDto extends PartialType(CreateEcoDto) {}
