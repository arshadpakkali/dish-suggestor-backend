import { ApiProperty } from '@nestjs/swagger';
import { IsInt, ValidateNested, IsOptional, Min } from 'class-validator';
import { PageQueryDto } from 'src/shared/dto/page.dto';

export class DishDto {
  name: string;
  ingredients: string[];
  diet: string;
  prep_time: number;
  cook_time: number;
  course: string;
  flavor_profile: string | number;
  state: string | number;
  region: string | number;
}

export class DishesQueryDto {
  @IsOptional()
  @ValidateNested()
  page?: PageQueryDto;
}
