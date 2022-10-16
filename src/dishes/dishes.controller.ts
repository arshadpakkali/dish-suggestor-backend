import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { PaginatedResponseDto } from 'src/shared/dto/page.dto';
import { DishesService } from './dishes.service';
import { CreateDishDto } from './dto/create-dish.dto';
import { DishDto, DishesQueryDto } from './dto/dish.dto';

@Controller('dishes')
@ApiTags('dishes')
export class DishesController {
  constructor(private readonly dishesService: DishesService) {}

  @Get()
  @ApiOkResponse({
    schema: {
      oneOf: [
        { type: 'array', items: { $ref: getSchemaPath(DishDto) } },
        {
          allOf: [
            { $ref: getSchemaPath(PaginatedResponseDto) },
            {
              properties: {
                results: {
                  type: 'array',
                  items: { $ref: getSchemaPath(DishDto) },
                },
              },
            },
          ],
        },
      ],
    },
  })
  @ApiExtraModels(PaginatedResponseDto)
  findAll(
    @Query() query: DishesQueryDto,
  ): DishDto[] | PaginatedResponseDto<DishDto> {
    return this.dishesService.findAll(query);
  }

  @Get('query')
  findbyIngredients(@Query('ingredient') ingredients: string[]): DishDto[] {
    return this.dishesService.findByIngredients(ingredients);
  }

  @Get('fuzzy')
  fuzzyFind(@Query('search') query: string) {
    return this.dishesService.fuzzySearch(query);
  }

  @Get(':name')
  findOneByName(@Param('name') name: string): DishDto {
    return this.dishesService.findByName(name);
  }

  @Post()
  createDish(@Body() _body: CreateDishDto) {
    return;
  }
}
