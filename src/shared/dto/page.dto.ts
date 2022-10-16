import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class PageQueryDto {
  @IsInt()
  @Min(1)
  currentPage: number = 1;

  @IsInt()
  @Min(1)
  perPage: number = 10;
}

export class PageMetaDto {
  @ApiProperty()
  total: number;

  @ApiProperty()
  lastPage: number;

  @ApiProperty()
  currentPage: number;

  @ApiProperty()
  perPage: number;

  @ApiProperty()
  from?: number;

  @ApiProperty()
  to?: number;
}

export class PaginatedResponseDto<TData> {
  @ApiProperty()
  results: TData[];

  @ApiProperty()
  pagination: PageMetaDto;
}
