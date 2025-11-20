import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateMeasurementDto {
  @IsNotEmpty()
  @IsNumber()
  ecoId: number;

  @IsNotEmpty()
  @IsNumber()
  ph: number;

  @IsNotEmpty()
  @IsNumber()
  turbidity: number;

  @IsNotEmpty()
  @IsNumber()
  temperature: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
