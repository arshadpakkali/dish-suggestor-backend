import { Injectable, NotFoundException } from '@nestjs/common';
import _ from 'lodash';
import Fuse from 'fuse.js';
import { DishDto, DishesQueryDto } from './dto/dish.dto';

import dishes from './entities/dish.entity';
import { PageQueryDto, PaginatedResponseDto } from 'src/shared/dto/page.dto';

@Injectable()
export class DishesService {
  private dishesFuzzy: Fuse<DishDto>;

  constructor() {
    this.dishesFuzzy = new Fuse(dishes, {
      includeScore: true,
      shouldSort: true,
      keys: ['name', 'ingredients', 'state', 'region'],
    });
  }

  findAll(query: DishesQueryDto): PaginatedResponseDto<DishDto> | DishDto[] {
    const { page } = query;
    if (!page) {
      return dishes;
    }
    return DishesService.paginate(dishes, query.page);
  }

  findByName(id: string) {
    const dish = dishes.find((x) => x.name === id);
    if (!dish) {
      throw new NotFoundException(`${id} Not found`);
    }
    return dish;
  }

  findByIngredients(ingredientsQuery: string[]) {
    return dishes.filter((dish) =>
      ingredientsQuery.every((q) => dish.ingredients.find((i) => i === q)),
    );
  }

  fuzzySearch(query: string) {
    return this.dishesFuzzy.search(query).map((x) => x.item);
  }

  static paginate<T>(
    data: T[],
    pageOpts: PageQueryDto,
  ): PaginatedResponseDto<T> {
    const from = (pageOpts.currentPage - 1) * pageOpts.perPage;

    const endQuery = from + pageOpts.perPage;

    const to = endQuery > data.length ? data.length : endQuery;

    return {
      results: data.slice(from, to),
      pagination: {
        from,
        to,
        perPage: pageOpts.perPage,
        currentPage: pageOpts.currentPage,
        total: data.length,
        lastPage: Math.ceil(data.length / pageOpts.perPage),
      },
    };
  }
}
