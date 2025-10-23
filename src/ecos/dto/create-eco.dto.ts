import { IsString, IsOptional, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEcoDto {
  @IsString({ message: 'O nome deve ser uma string.' })
  name: string;

  @IsString({ message: 'A localização deve ser uma string.' })
  location: string;

  @IsString({ message: 'A cidade deve ser uma string.' })
  city: string;

  @IsOptional()
  @IsInt({ message: 'O ID do usuário deve ser um número inteiro.' })
  @Type(() => Number)
  userId?: number;
}
